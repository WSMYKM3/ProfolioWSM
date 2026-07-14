import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const workbookPath = path.resolve('TranslateSheet/translateSheet.xlsx');
const outputPath = path.resolve('app/lib/i18n/translations.ts');

function readZipEntry(entryPath) {
  return execFileSync('unzip', ['-p', workbookPath, entryPath], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
}

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}

function getSharedStrings(xml) {
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(([, item]) => {
    const textParts = [...item.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(([, text]) => decodeXml(text));
    return textParts.join('');
  });
}

function getColumn(cellRef) {
  return cellRef.replace(/\d+/g, '');
}

function getRows(sheetXml, sharedStrings) {
  return [...sheetXml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map(([, rowXml]) => {
    const row = {};
    for (const [, attrs, value] of rowXml.matchAll(/<c\s+([^>]*)>(?:[\s\S]*?<v>([\s\S]*?)<\/v>)?[\s\S]*?<\/c>/g)) {
      const ref = attrs.match(/\br="([^"]+)"/)?.[1];
      if (!ref) continue;
      const col = getColumn(ref);
      const type = attrs.match(/\bt="([^"]+)"/)?.[1];
      row[col] = type === 's' ? sharedStrings[Number(value)] ?? '' : decodeXml(value ?? '');
    }
    return row;
  });
}

const sharedStrings = getSharedStrings(readZipEntry('xl/sharedStrings.xml'));
const rows = getRows(readZipEntry('xl/worksheets/sheet1.xml'), sharedStrings);

const translations = {};
for (const row of rows.slice(1)) {
  const english = row.A?.trim();
  const generatedChinese = row.B?.trim();
  const editedChinese = row.C?.trim();
  const chinese = editedChinese || generatedChinese;

  if (!english || !chinese || english === 'English') continue;
  translations[english] = chinese;
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(
  outputPath,
  [
    '/* This file is generated from TranslateSheet/translateSheet.xlsx. */',
    '/* Third-column edits are preferred over generated Chinese translations. */',
    '',
    `export const zhTranslations = ${JSON.stringify(translations, null, 2)} as const;`,
    '',
    'export type TranslationSource = keyof typeof zhTranslations;',
    '',
  ].join('\n'),
  'utf8',
);

console.log(`Generated ${Object.keys(translations).length} translations at ${outputPath}`);
