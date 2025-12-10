'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

// Mapping of tool names to SVG file paths
const iconImages: Record<string, string> = {
  Unity: '/icons/unity.svg',
  Unreal: '/icons/unrealengine.svg',
  'Unreal Engine': '/icons/unrealengine.svg',
  Blender: '/icons/blender.svg',
  GitHub: '/icons/github.svg',
  Github: '/icons/github.svg',
  // Add more mappings as needed
  // Default fallback icons can be added here
};

export default function SoftwareIcon({ name, size = 32 }: SoftwareIconProps) {
  const baseName = getBaseToolName(name);
  const iconSrc = iconImages[baseName] || iconImages[name] || '/icons/unity.svg'; // Default fallback

  return (
    <motion.div
      className="software-icon"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      title={name}
    >
      <Image
        src={iconSrc}
        alt={name}
        width={size}
        height={size}
        style={{
          objectFit: 'contain',
          opacity: 0.9
        }}
      />
      <span className="software-icon-label">{name}</span>
    </motion.div>
  );
}

