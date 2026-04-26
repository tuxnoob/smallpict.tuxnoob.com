self.onmessage = async (e: MessageEvent) => {
  const { id, file, quality, maxWidth } = e.data;
  
  try {
    // Decode the image efficiently without blocking UI
    const bitmap = await createImageBitmap(file);
    
    let width = bitmap.width;
    let height = bitmap.height;
    
    // Resize if maxWidth is provided and image is larger
    if (maxWidth && width > maxWidth) {
      const ratio = maxWidth / width;
      width = maxWidth;
      height = Math.round(height * ratio);
    }
    
    // Create OffscreenCanvas
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error("Could not get 2d context from OffscreenCanvas");
    }
    
    // Draw the bitmap onto the canvas, resizing it if necessary
    ctx.drawImage(bitmap, 0, 0, width, height);
    
    // Convert to WebP blob
    const blob = await canvas.convertToBlob({
      type: 'image/webp',
      quality: quality / 100 // convert 0-100 to 0-1
    });
    
    // Clean up
    bitmap.close();
    
    // Send back the result
    self.postMessage({
      id,
      success: true,
      blob,
      width,
      height,
      originalSize: file.size,
      newSize: blob.size
    });
    
  } catch (error) {
    self.postMessage({
      id,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error processing image"
    });
  }
};
