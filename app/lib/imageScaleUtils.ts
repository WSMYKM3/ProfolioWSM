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
  // Stage2 rotater and CodeRotate images - scale down to prevent over-enlargement
  if (imageSrc.includes('/DatnieStage2/rotater.png') || imageSrc.includes('/DatnieStage2/CodeRotate.png')) {
    return 1.0; // Smaller scale for these images
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
  // Post3 IandAI images - use moderate scale to avoid over-enlargement
  if (imageSrc.includes('/IandAI/')) {
    // PNG files are usually larger, use smaller scale
    if (imageSrc.includes('.png')) {
      return 1.0; // No scale for PNG images
    }
    // GIF files - use moderate scale
    return 1.2;
  }
  // TheToolbox images - scale down to prevent over-enlargement
  if (imageSrc.includes('/TheToolbox/aiStructure.png')) {
    return 0.9; // Smaller scale for this image
  }
  // Default scale for other images/gifs
  return 2;
}

