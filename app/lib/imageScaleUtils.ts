// Unified image scale function for all Post components
// This ensures consistent enlargement behavior across all projects

export function getImageScale(imageSrc: string): number {
  // Large images that should not be scaled up much
  if (imageSrc.includes('/brainstorm.png')) {
    return 0.9; // Even smaller scale for brainstorm.png
  }
  if (imageSrc.includes('/Datnieideation.png')) {
    return 1.0; // No scale for Datnieideation.png
  }
  // Stage2 images that are too large when scaled
  if (imageSrc.includes('/DatnieStage2/uinavigator.gif') || imageSrc.includes('/DatnieStage2/uiunity.png')) {
    return 1.0; // No scale for these large Stage2 images
  }
  // Post4 mocapgifs - large files, use smaller scale
  if (imageSrc.includes('/mocapgifs/')) {
    // PNG files are usually larger, use no scale
    if (imageSrc.includes('.png')) {
      return 1.0;
    }
    // mb1, mb2, mb3 gifs are too large when clicked, use smaller scale
    if (imageSrc.includes('mb1.gif') || imageSrc.includes('mb2.gif') || imageSrc.includes('mb3.gif')) {
      return 1.0;
    }
    // Other GIF files - use smaller scale
    return 1.2;
  }
  // Post3 process placeholders - use smaller scale
  if (imageSrc.includes('/gifs/process-placeholder')) {
    return 1.2;
  }
  // Signie large images - use smaller scale
  if (imageSrc.includes('/Signiepics/handrecord.png') || imageSrc.includes('/Signiepics/mixwords.png')) {
    return 0.8; // No scale for these large images
  }
  // Default scale for other images/gifs
  return 2;
}

