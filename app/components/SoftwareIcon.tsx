'use client';

import { motion } from 'framer-motion';

interface SoftwareIconProps {
  name: string;
  size?: number;
}

// Helper function to extract base tool name (handles names like "Unity6- XR develop" -> "Unity")
const getBaseToolName = (name: string): string => {
  // Remove version numbers and descriptions after dash
  const baseName = name.split('-')[0].trim();
  // Remove version numbers (e.g., "Unity6" -> "Unity")
  return baseName.replace(/\d+$/, '').trim();
};

// Helper function to normalize tool name for matching
const normalizeToolName = (name: string): string => {
  return name.toLowerCase().trim();
};

// Helper function to add basePath for GitHub Pages
function getIconSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const basePath = process.env.NODE_ENV === 'production' ? '/ProfolioWSM' : '';
  return src.startsWith('/') ? `${basePath}${src}` : `${basePath}/${src}`;
}

// Mapping of tool names to SVG file paths (normalized lowercase for matching)
const iconImages: Record<string, string> = {
  'unity': '/icons/unity.svg',
  'unreal': '/icons/unrealengine.svg',
  'unreal engine': '/icons/unrealengine.svg',
  'blender': '/icons/blender.svg',
  'touchdesigner': '/icons/touchdesigner.svg',
  'touch designer': '/icons/touchdesigner.svg',
  'github': '/icons/github.svg',
  'python': '/icons/python.svg',
  'motion builder': '/icons/motion builder.svg',
  'motionbuilder': '/icons/motion builder.svg',
  'adobe premiere': '/icons/adobe-premiere.svg',
  'premiere pro': '/icons/adobe-premiere.svg',
  'premiere': '/icons/adobe-premiere.svg',
  'optitrack': '/icons/optiTrack.svg',
  'optitrack motion capture': '/icons/optiTrack.svg',
  'optitrack motion': '/icons/optiTrack.svg',
  // Keep original case for backward compatibility
  Unity: '/icons/unity.svg',
  Unreal: '/icons/unrealengine.svg',
  'Unreal Engine': '/icons/unrealengine.svg',
  Blender: '/icons/blender.svg',
  TouchDesigner: '/icons/touchdesigner.svg',
  Touchdesigner: '/icons/touchdesigner.svg',
  GitHub: '/icons/github.svg',
  Github: '/icons/github.svg',
  Python: '/icons/python.svg',
  'Motion Builder': '/icons/motion builder.svg',
  'MotionBuilder': '/icons/motion builder.svg',
  'Adobe Premiere': '/icons/adobe-premiere.svg',
  'Premiere Pro': '/icons/adobe-premiere.svg',
  'Optitrack': '/icons/optiTrack.svg',
  'Optitrack Motion Capture': '/icons/optiTrack.svg',
  'Optitrack Motion': '/icons/optiTrack.svg',
};

export default function SoftwareIcon({ name, size = 32 }: SoftwareIconProps) {
  const baseName = getBaseToolName(name);
  const normalizedBaseName = normalizeToolName(baseName);
  const normalizedName = normalizeToolName(name);
  
  // Try to find icon by normalized base name first, then by full normalized name
  const iconPath = iconImages[normalizedBaseName] || iconImages[normalizedName] || iconImages[baseName] || iconImages[name] || '/icons/unity.svg'; // Default fallback
  const iconSrc = getIconSrc(iconPath);

  // Check if this is Optitrack icon (wide SVG that needs special scaling)
  const isOptitrack = iconPath.includes('optiTrack.svg');
  
  // For Optitrack, use a larger width to accommodate the wide aspect ratio
  const iconWidth = isOptitrack ? `${size * 1.8}px` : `${size}px`;
  const iconHeight = `${size}px`;

  return (
    <motion.div
      className="software-icon"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      title={name}
    >
      <img
        src={iconSrc}
        alt={name}
        width={size}
        height={size}
        style={{
          width: iconWidth,
          height: iconHeight,
          maxWidth: iconWidth,
          maxHeight: iconHeight,
          objectFit: 'contain',
          opacity: 0.9,
          display: 'block'
        }}
      />
      <span className="software-icon-label">{name}</span>
    </motion.div>
  );
}

