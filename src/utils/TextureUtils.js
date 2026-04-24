/**
 * Utility to process an image and make a specific color transparent.
 */
export function makeTransparent(scene, key, newKey, chromaColor) {
    const texture = scene.textures.get(key);
    const source = texture.getSourceImage();

    const width = source.width;
    const height = source.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Draw the original image
    ctx.drawImage(source, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const r = (chromaColor >> 16) & 0xFF;
    const g = (chromaColor >> 8) & 0xFF;
    const b = chromaColor & 0xFF;

    const tolerance = 1;

    for (let i = 0; i < data.length; i += 4) {
        const dr = Math.abs(data[i] - r);
        const dg = Math.abs(data[i + 1] - g);
        const db = Math.abs(data[i + 2] - b);

        if (dr < tolerance && dg < tolerance && db < tolerance) {
            data[i + 3] = 0;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Add to Phaser textures
    scene.textures.addCanvas(newKey, canvas);
}
