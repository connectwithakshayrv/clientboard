const fs = require('fs');
const PImage = require('pureimage');

async function createFavicon(size, outPath) {
    const img = PImage.make(size, size);
    const ctx = img.getContext('2d');
    
    // Background: pure white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);
    
    // Foreground: pure black. Draw a geometric "C"
    ctx.fillStyle = '#000000';
    
    // For a clean C without font loading issues in pureimage, 
    // we draw an outer black circle, an inner white circle, and cut out the right side.
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size * 0.4;
    const innerR = size * 0.2;
    
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fill();
    
    // Cut out the right side (a bit above and below the center)
    const cutH = size * 0.3;
    ctx.fillRect(cx, cy - cutH/2, size/2, cutH);
    
    return new Promise((resolve, reject) => {
        PImage.encodePNGToStream(img, fs.createWriteStream(outPath))
            .then(resolve)
            .catch(reject);
    });
}

async function main() {
    const sizes = {
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'apple-touch-icon.png': 180,
    };
    
    const outDir = '/Users/akshayrv/Documents/AntiGravityProjects/ClientBoard/public';
    
    for (const [filename, size] of Object.entries(sizes)) {
        await createFavicon(size, `${outDir}/${filename}`);
        console.log(`Generated ${filename}`);
    }
    
    // Copy the 32x32 to favicon.ico (most browsers accept PNG data in .ico, or just rename it)
    fs.copyFileSync(`${outDir}/favicon-32x32.png`, `${outDir}/favicon.ico`);
    console.log('Copied to favicon.ico');
}

main().catch(console.error);
