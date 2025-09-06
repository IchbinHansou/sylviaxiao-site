/**
 * Sylvia & Tree Pixel Art Animation Controller
 * Handles sprite animation and interactions
 */

class PixelAnimationController {
    constructor() {
        this.isPlaying = false;
        this.currentFrame = 0;
        this.totalFrames = 8;
        this.frameRate = 100; // milliseconds per frame
        this.animationInterval = null;
        
        this.init();
    }
    
    init() {
        this.createSpritesheet();
        this.setupEventListeners();
    }
    
    createSpritesheet() {
        // Create canvas for spritesheet generation
        this.canvas = document.createElement('canvas');
        this.canvas.width = 512; // 8 frames × 64px
        this.canvas.height = 64;
        this.ctx = this.canvas.getContext('2d');
        
        // Enable pixelated rendering
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
    }
    
    drawSylviaFrame(frameIndex) {
        const x = frameIndex * 64;
        const ctx = this.ctx;
        
        // Clear frame
        ctx.clearRect(x, 0, 64, 64);
        
        // Draw Sylvia character based on frame
        this.drawSylviaCharacter(ctx, x, frameIndex);
    }
    
    drawSylviaCharacter(ctx, offsetX, frameIndex) {
        // Calculate watering can rotation based on frame
        const rotation = this.getWateringCanRotation(frameIndex);
        
        // Hair (black)
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(offsetX + 8, 4, 48, 20);
        ctx.fillRect(offsetX + 6, 8, 4, 16);
        ctx.fillRect(offsetX + 54, 8, 4, 16);
        
        // Face
        ctx.fillStyle = '#fdbcb4';
        ctx.fillRect(offsetX + 16, 16, 32, 24);
        
        // Glasses
        ctx.fillStyle = '#34495e';
        ctx.fillRect(offsetX + 18, 20, 8, 6);
        ctx.fillRect(offsetX + 30, 20, 8, 6);
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(offsetX + 26, 22, 4, 2);
        
        // Eyes
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(offsetX + 22, 23, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(offsetX + 34, 23, 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Mouth
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(offsetX + 28, 32, 8, 2);
        
        // Shirt (white)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(offsetX + 12, 40, 40, 16);
        ctx.fillStyle = '#bdc3c7';
        ctx.fillRect(offsetX + 12, 40, 40, 2);
        
        // Arms
        ctx.fillStyle = '#fdbcb4';
        ctx.fillRect(offsetX + 4, 44, 8, 12);
        ctx.fillRect(offsetX + 52, 44, 8, 12);
        
        // Watering can (blue) with rotation
        ctx.save();
        ctx.translate(offsetX + 59, 52);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = '#3498db';
        ctx.fillRect(-3, -4, 6, 8);
        ctx.fillStyle = '#2980b9';
        ctx.fillRect(-1, -6, 2, 4);
        ctx.restore();
        
        // Draw water drops for frames 2-7
        if (frameIndex >= 1 && frameIndex <= 6) {
            this.drawWaterDrop(ctx, offsetX, frameIndex);
        }
    }
    
    getWateringCanRotation(frameIndex) {
        const rotations = [0, 15, 30, 45, 30, 15, 0, 0];
        return rotations[frameIndex] || 0;
    }
    
    drawWaterDrop(ctx, offsetX, frameIndex) {
        const dropY = 15 + (frameIndex - 1) * 4;
        const opacity = Math.max(0, 1 - (frameIndex - 1) * 0.15);
        
        ctx.fillStyle = `rgba(52, 152, 219, ${opacity})`;
        ctx.beginPath();
        ctx.arc(offsetX + 45, dropY, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    generateSpritesheet() {
        // Generate all frames
        for (let i = 0; i < this.totalFrames; i++) {
            this.drawSylviaFrame(i);
        }
        
        // Convert to data URL
        return this.canvas.toDataURL('image/png');
    }
    
    setupEventListeners() {
        // Play/Pause button
        const playButton = document.getElementById('playAnimation');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.toggleAnimation();
            });
        }
        
        // Download button
        const downloadButton = document.getElementById('downloadSpritesheet');
        if (downloadButton) {
            downloadButton.addEventListener('click', () => {
                this.downloadSpritesheet();
            });
        }
        
        // Frame control
        const frameSlider = document.getElementById('frameSlider');
        if (frameSlider) {
            frameSlider.addEventListener('input', (e) => {
                this.setFrame(parseInt(e.target.value));
            });
        }
    }
    
    toggleAnimation() {
        if (this.isPlaying) {
            this.stopAnimation();
        } else {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        this.isPlaying = true;
        this.animationInterval = setInterval(() => {
            this.nextFrame();
        }, this.frameRate);
        
        // Update button text
        const playButton = document.getElementById('playAnimation');
        if (playButton) {
            playButton.textContent = 'Pause';
        }
    }
    
    stopAnimation() {
        this.isPlaying = false;
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        
        // Update button text
        const playButton = document.getElementById('playAnimation');
        if (playButton) {
            playButton.textContent = 'Play';
        }
    }
    
    nextFrame() {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        this.updateDisplay();
    }
    
    setFrame(frameIndex) {
        this.currentFrame = Math.max(0, Math.min(frameIndex, this.totalFrames - 1));
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update sprite display
        const spriteElement = document.getElementById('sylviaSprite');
        if (spriteElement) {
            spriteElement.style.backgroundPosition = `-${this.currentFrame * 64}px 0px`;
        }
        
        // Update frame slider
        const frameSlider = document.getElementById('frameSlider');
        if (frameSlider) {
            frameSlider.value = this.currentFrame;
        }
        
        // Update frame counter
        const frameCounter = document.getElementById('frameCounter');
        if (frameCounter) {
            frameCounter.textContent = `Frame ${this.currentFrame + 1}/${this.totalFrames}`;
        }
    }
    
    downloadSpritesheet() {
        const dataURL = this.generateSpritesheet();
        const link = document.createElement('a');
        link.download = 'sylvia-watering-spritesheet.png';
        link.href = dataURL;
        link.click();
    }
    
    // Tree character methods
    createTreeSpritesheet() {
        const treeCanvas = document.createElement('canvas');
        treeCanvas.width = 128; // 4 frames × 32px
        treeCanvas.height = 32;
        const treeCtx = treeCanvas.getContext('2d');
        
        treeCtx.imageSmoothingEnabled = false;
        
        // Generate tree frames
        for (let i = 0; i < 4; i++) {
            this.drawTreeFrame(treeCtx, i * 32, i);
        }
        
        return treeCanvas.toDataURL('image/png');
    }
    
    drawTreeFrame(ctx, offsetX, frameIndex) {
        const scale = 1 + (frameIndex * 0.05); // Slight scale increase for happy effect
        
        ctx.save();
        ctx.translate(offsetX + 16, 16);
        ctx.scale(scale, scale);
        
        // Leaf on head
        ctx.fillStyle = '#27ae60';
        ctx.beginPath();
        ctx.ellipse(0, -8, 8, 4, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Ghost body
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, 4, 12, 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#2c3e50';
        ctx.beginPath();
        ctx.arc(-4, 2, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(4, 2, 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Blush
        ctx.fillStyle = '#ff6b9d';
        ctx.beginPath();
        ctx.arc(-8, 6, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(8, 6, 2, 0, 2 * Math.PI);
        ctx.fill();
        
        // Mouth (changes for happy expression)
        ctx.fillStyle = '#2c3e50';
        if (frameIndex > 1) {
            // Happy mouth (slight curve)
            ctx.beginPath();
            ctx.arc(0, 8, 3, 0, Math.PI);
            ctx.stroke();
        } else {
            // Normal mouth
            ctx.fillRect(-2, 8, 4, 1);
        }
        
        ctx.restore();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pixelAnimation = new PixelAnimationController();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PixelAnimationController;
}
