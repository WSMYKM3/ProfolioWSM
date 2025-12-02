'use client';

import { motion } from 'framer-motion';

interface SoftwareIconProps {
  name: string;
  size?: number;
}

// SVG icons for common software tools
const iconPaths: Record<string, string> = {
  Unity: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z M 12 4.5 L 19.5 8.5 L 19.5 15.5 L 12 19.5 L 4.5 15.5 L 4.5 8.5 Z',
  Unreal: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Blender: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  TouchDesigner: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  'After Effects': 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  'Premiere Pro': 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Photoshop: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Illustrator: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Figma: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  'Cinema 4D': 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Lightroom: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  'DaVinci Resolve': 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  'Capture One': 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Notion: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
  Markdown: 'M 12 2 L 2 7 L 2 17 L 12 22 L 22 17 L 22 7 Z',
};

export default function SoftwareIcon({ name, size = 32 }: SoftwareIconProps) {
  const path = iconPaths[name] || iconPaths.Unity; // Default fallback

  return (
    <motion.div
      className="software-icon"
      whileHover={{ scale: 1.1, filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      title={name}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
      <span className="software-icon-label">{name}</span>
    </motion.div>
  );
}

