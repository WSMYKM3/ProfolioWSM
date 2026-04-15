// ---------- Config ----------
const PROJECTS = [
  { id: 'datnie',   title: 'Datnie',           image: '../../datnie.png',           href: '#datnie'   },
  { id: 'aether',   title: 'AetherTag',        image: '../../aetherTagthumb.png',   href: '#aether'   },
  { id: 'mocap',    title: 'Motion Capture',   image: '../../mocapthumbnail.png',   href: '#mocap'    },
  { id: 'iandai',   title: 'I & AI',           image: '../../iandaithumb.jpg',      href: '#iandai'   },
  { id: 'linkedin', title: 'LinkedIn Project', image: '../../linkedinthumbnail.png', href: '#linkedin' },
];

// Max bound for the assembled image (on either axis). Each project is scaled
// down proportionally so its natural aspect ratio is preserved.
const MAX_DIM = 260;
const ROWS = 3;
const COLS = 3;
const PAD_FRAC = 0.34;          // padding around each piece's bbox for tab overflow
const HIDDEN_FRAC = 0.4;         // fraction of pieces that stay hidden at home until assembly
const ROT_RANGE = 22;            // ± degrees of rotation in scatter
const CENTER_GAP_FRAC = 0.42;    // fraction of viewport width reserved (empty) in the center for other content

// ---------- DOM ----------
const stage = document.getElementById('stage');
const defs  = document.getElementById('clip-defs');
const hint  = document.getElementById('hint');

// ---------- Helpers ----------
const SVG_NS = 'http://www.w3.org/2000/svg';
const rand = (a, b) => a + Math.random() * (b - a);

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildGridLines(rows, cols, w, h) {
  const xs = [0];
  for (let c = 1; c < cols; c++) {
    xs.push((c / cols) * w + rand(-1, 1) * (w / cols) * 0.12);
  }
  xs.push(w);
  const ys = [0];
  for (let r = 1; r < rows; r++) {
    ys.push((r / rows) * h + rand(-1, 1) * (h / rows) * 0.12);
  }
  ys.push(h);
  return { xs, ys };
}

function buildEdges(rows, cols) {
  const h = [];
  for (let r = 0; r < rows - 1; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) row.push(Math.random() < 0.5 ? 1 : -1);
    h.push(row);
  }
  const v = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols - 1; c++) row.push(Math.random() < 0.5 ? 1 : -1);
    v.push(row);
  }
  return { h, v };
}

function edgePath(from, to, sign) {
  if (sign === 0) return ` L ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
  const dx = to.x - from.x, dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const tx = dx / len, ty = dy / len;
  const nx = ty * sign, ny = -tx * sign;

  const a = 0.35, b = 0.65;
  const bulge = len * 0.34;
  const push  = len * 0.18;

  const p1 = { x: from.x + tx * a * len, y: from.y + ty * a * len };
  const p2 = { x: from.x + tx * b * len, y: from.y + ty * b * len };
  const c1 = { x: p1.x - tx * push + nx * bulge, y: p1.y - ty * push + ny * bulge };
  const c2 = { x: p2.x + tx * push + nx * bulge, y: p2.y + ty * push + ny * bulge };

  return (
    ` L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}` +
    ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}` +
    ` L ${to.x.toFixed(2)} ${to.y.toFixed(2)}`
  );
}

function piecePath(r, c, rows, cols, xs, ys, edges, offX, offY) {
  const TL = { x: xs[c]     - offX, y: ys[r]     - offY };
  const TR = { x: xs[c + 1] - offX, y: ys[r]     - offY };
  const BR = { x: xs[c + 1] - offX, y: ys[r + 1] - offY };
  const BL = { x: xs[c]     - offX, y: ys[r + 1] - offY };

  const topS    = r === 0        ? 0 : -edges.h[r - 1][c];
  const rightS  = c === cols - 1 ? 0 :  edges.v[r][c];
  const bottomS = r === rows - 1 ? 0 :  edges.h[r][c];
  const leftS   = c === 0        ? 0 : -edges.v[r][c - 1];

  let d = `M ${TL.x.toFixed(2)} ${TL.y.toFixed(2)}`;
  d += edgePath(TL, TR, topS);
  d += edgePath(TR, BR, rightS);
  d += edgePath(BR, BL, bottomS);
  d += edgePath(BL, TL, leftS);
  d += ' Z';
  return d;
}

// ---------- Active-project state ----------
// Once a project is active, the state is LOCKED — hovering other fragments
// does nothing until the user clicks the × close button on the assembled image.
let activeId = null;

function setActive(id) {
  if (activeId !== null) return; // locked — must close current first
  activeId = id;
  stage.dataset.active = id;
  const proj = PROJECTS.find(p => p.id === id);
  if (proj) hint.textContent = `${proj.title}  —  click image to open`;
  stage.querySelectorAll('.project').forEach(pr => {
    pr.classList.toggle('assembled', pr.dataset.project === id);
  });
}

function clearActive() {
  if (activeId === null) return;
  activeId = null;
  delete stage.dataset.active;
  hint.textContent = 'hover a fragment';
  stage.querySelectorAll('.project.assembled').forEach(pr => pr.classList.remove('assembled'));
}

// ---------- Piece construction ----------
const allPieces = []; // { el, homeCx, homeCy, scale, radius }

function pieceRadius(pieceW, pieceH, scale = 1) {
  // Silhouette bbox accounts for tab bulges. Use max/2 (not the diagonal) so
  // cells don't get huge — slight rotation is allowed to poke into empty corners.
  const tab = 0.34;
  const silW = pieceW + 2 * pieceH * tab;
  const silH = pieceH + 2 * pieceW * tab;
  return (Math.max(silW, silH) / 2) * scale + 4;
}

function createProject(project, imgW, imgH) {
  const { xs, ys } = buildGridLines(ROWS, COLS, imgW, imgH);
  const edges = buildEdges(ROWS, COLS);

  const container = document.createElement('div');
  container.className = 'project';
  container.dataset.project = project.id;
  container.style.width = imgW + 'px';
  container.style.height = imgH + 'px';
  container.style.marginLeft = (-imgW / 2) + 'px';
  container.style.marginTop = (-imgH / 2) + 'px';
  stage.appendChild(container);

  // Close button — only visible once this project is assembled
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '\u00D7';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearActive();
  });
  container.appendChild(closeBtn);

  const cellWNom = imgW / COLS;
  const cellHNom = imgH / ROWS;
  const pad = Math.max(cellWNom, cellHNom) * PAD_FRAC;

  // Pick which piece indices stay hidden (only appear when project assembles).
  // Every other piece is scattered at full size, fully interactable.
  const total = ROWS * COLS;
  const numHidden = Math.floor(total * HIDDEN_FRAC);
  const hiddenSet = new Set(shuffle([...Array(total).keys()]).slice(0, numHidden));

  let idx = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x0 = xs[c],     y0 = ys[r];
      const x1 = xs[c + 1], y1 = ys[r + 1];
      const pieceW = x1 - x0;
      const pieceH = y1 - y0;
      const divW = pieceW + 2 * pad;
      const divH = pieceH + 2 * pad;
      const divX = x0 - pad;
      const divY = y0 - pad;

      const d = piecePath(r, c, ROWS, COLS, xs, ys, edges, divX, divY);
      const clipId = `clip-${project.id}-${r}-${c}`;
      const cp = document.createElementNS(SVG_NS, 'clipPath');
      cp.setAttribute('id', clipId);
      cp.setAttribute('clipPathUnits', 'userSpaceOnUse');
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      cp.appendChild(path);
      defs.appendChild(cp);

      const el = document.createElement('div');
      el.className = 'piece';
      el.dataset.project = project.id;
      el.dataset.piece = `${r}-${c}`;

      const isHidden = hiddenSet.has(idx);
      if (isHidden) el.classList.add('hidden-scatter');

      el.style.left = divX + 'px';
      el.style.top = divY + 'px';
      el.style.width = divW + 'px';
      el.style.height = divH + 'px';
      el.style.backgroundImage = `url("${project.image}")`;
      el.style.backgroundSize = `${imgW}px ${imgH}px`;
      el.style.backgroundPosition = `${-divX}px ${-divY}px`;
      el.style.clipPath = `url(#${clipId})`;
      el.style.webkitClipPath = `url(#${clipId})`;

      // Hover a fragment to trigger assembly. Once locked, other pieces are
      // pointer-events:none, so they can't interrupt. Hidden pieces sit at
      // home invisible until their project assembles — no hover handler needed.
      if (!isHidden) {
        el.addEventListener('mouseenter', () => setActive(project.id));
        el.addEventListener('click', () => {
          if (activeId === project.id) {
            window.location.href = project.href;
          } else {
            setActive(project.id);
          }
        });
      } else {
        // Still allow clicking a visible-at-assembly hidden piece to open the project
        el.addEventListener('click', () => {
          if (activeId === project.id) window.location.href = project.href;
        });
      }

      container.appendChild(el);

      // Only scattered (non-hidden) pieces participate in the grid layout.
      if (!isHidden) {
        allPieces.push({
          el,
          homeCx: (x0 + x1) / 2 - imgW / 2,
          homeCy: (y0 + y1) / 2 - imgH / 2,
          radius: pieceRadius(pieceW, pieceH, 1),
        });
      }

      idx++;
    }
  }
}

// ---------- Grid-based scatter on left + right strips only ----------
// The center column of the viewport is reserved for other content and stays
// empty. Pieces are distributed across a grid covering the left strip and an
// identical grid covering the right strip.
function scatterAll() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const N = allPieces.length;
  const maxRadius = Math.max(...allPieces.map(p => p.radius));

  const centerGap = vw * CENTER_GAP_FRAC;
  const stripW = (vw - centerGap) / 2;

  // Shrink everything uniformly if the two strips can't fit N cells.
  let extraScale = 1;
  let cellSize, colsPerStrip, rows;
  while (true) {
    cellSize = (maxRadius * 2 + 12) * extraScale;
    colsPerStrip = Math.max(1, Math.floor(stripW / cellSize));
    rows = Math.max(1, Math.floor(vh / cellSize));
    if (2 * colsPerStrip * rows >= N) break;
    extraScale *= 0.95;
    if (extraScale < 0.3) break;
  }

  const stripGridW = colsPerStrip * cellSize;
  const gridH = rows * cellSize;

  // Center-of-each-strip in viewport-center coords (viewport center = 0).
  const leftStripCenterX  = -vw / 2 + stripW / 2;
  const rightStripCenterX =  vw / 2 - stripW / 2;
  // Grid starts (top-left cell center-x offset = startX + cellSize/2)
  const leftGridStartX  = leftStripCenterX  - stripGridW / 2;
  const rightGridStartX = rightStripCenterX - stripGridW / 2;
  const gridStartY = -gridH / 2;

  // Build the cell list (left strip cells then right strip cells per row).
  const cells = [];
  for (let row = 0; row < rows; row++) {
    const cy = gridStartY + row * cellSize + cellSize / 2;
    for (let col = 0; col < colsPerStrip; col++) {
      cells.push({ x: leftGridStartX  + col * cellSize + cellSize / 2, y: cy });
    }
    for (let col = 0; col < colsPerStrip; col++) {
      cells.push({ x: rightGridStartX + col * cellSize + cellSize / 2, y: cy });
    }
  }

  const order = shuffle([...Array(cells.length).keys()]);

  allPieces.forEach((piece, i) => {
    const cell = cells[order[i % cells.length]];
    const effRadius = piece.radius * extraScale;
    const jRange = Math.max(0, cellSize / 2 - effRadius - 2);
    const jx = rand(-jRange, jRange);
    const jy = rand(-jRange, jRange);

    const targetX = cell.x + jx;
    const targetY = cell.y + jy;
    const sx = targetX - piece.homeCx;
    const sy = targetY - piece.homeCy;
    const sr = rand(-ROT_RANGE, ROT_RANGE);

    piece.el.style.setProperty('--sx', sx + 'px');
    piece.el.style.setProperty('--sy', sy + 'px');
    piece.el.style.setProperty('--sr', sr + 'deg');
    piece.el.style.setProperty('--scale', extraScale);
  });
}

function loadNaturalSize(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: MAX_DIM, h: MAX_DIM * 0.75 });
    img.src = src;
  });
}

function fitToMax(w, h, max) {
  const ratio = Math.min(max / w, max / h);
  return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
}

Promise.all(PROJECTS.map(p => loadNaturalSize(p.image))).then(sizes => {
  PROJECTS.forEach((project, i) => {
    const nat = sizes[i];
    const fit = fitToMax(nat.w, nat.h, MAX_DIM);
    createProject(project, fit.w, fit.h);
  });
  scatterAll();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(scatterAll, 150);
});
