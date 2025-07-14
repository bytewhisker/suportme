// Create enhanced QR code with purple theme
function createQRCode() {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 240;
    const ctx = canvas.getContext('2d');
    // Dark gradient background
    const gradient = ctx.createLinearGradient(0, 0, 240, 240);
    gradient.addColorStop(0, '#2a0845');
    gradient.addColorStop(1, '#4a1a6b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 240, 240);
    // Purple QR pattern
    const colors = ['#b482ff', '#8c46ff', '#c896ff'];
    const size = 8;
    for (let i = 0; i < 240; i += size) {
        for (let j = 0; j < 240; j += size) {
            if (Math.random() > 0.5) {
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillRect(i, j, size-1, size-1);
            }
        }
    }
    // Enhanced corner squares with gradients
    const cornerSize = 48;
    const cornerPositions = [
        {x: 24, y: 24},
        {x: 168, y: 24},
        {x: 24, y: 168}
    ];
    cornerPositions.forEach(pos => {
        const cornerGradient = ctx.createLinearGradient(pos.x, pos.y, pos.x + cornerSize, pos.y + cornerSize);
        cornerGradient.addColorStop(0, '#b482ff');
        cornerGradient.addColorStop(1, '#8c46ff');
        ctx.fillStyle = cornerGradient;
        ctx.fillRect(pos.x, pos.y, cornerSize, cornerSize);
        ctx.fillStyle = '#2a0845';
        ctx.fillRect(pos.x + 8, pos.y + 8, cornerSize - 16, cornerSize - 16);
        ctx.fillStyle = '#b482ff';
        ctx.fillRect(pos.x + 16, pos.y + 16, cornerSize - 32, cornerSize - 32);
    });
    // Center pattern with special effect
    const centerGradient = ctx.createRadialGradient(120, 120, 0, 120, 120, 24);
    centerGradient.addColorStop(0, '#b482ff');
    centerGradient.addColorStop(1, '#8c46ff');
    ctx.fillStyle = centerGradient;
    ctx.fillRect(96, 96, 48, 48);
    ctx.fillStyle = '#2a0845';
    ctx.fillRect(104, 104, 32, 32);
    ctx.fillStyle = '#c896ff';
    ctx.fillRect(112, 112, 16, 16);
    // document.getElementById('qrImage').src = canvas.toDataURL();
}
// Create interactive floating particles
function createParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        // Random purple colors
        const colors = ['rgba(180, 130, 255, 0.8)', 'rgba(140, 70, 255, 0.8)', 'rgba(200, 150, 255, 0.8)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 16000);
    }, 200);
}
// Enhanced 3D mouse tracking
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
function updateMouseEffect() {
    const container = document.querySelector('.container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    targetX = (mouseX - centerX) / 25;
    targetY = (mouseY - centerY) / 25;
    // Smooth interpolation
    const currentX = parseFloat(container.style.getPropertyValue('--rotateY')) || 0;
    const currentY = parseFloat(container.style.getPropertyValue('--rotateX')) || 0;
    const newX = currentX + (targetX - currentX) * 0.1;
    const newY = currentY + (targetY - currentY) * 0.1;
    container.style.setProperty('--rotateY', newX);
    container.style.setProperty('--rotateX', newY);
    container.style.transform = `translateY(-8px) rotateX(${-newY}deg) rotateY(${newX}deg)`;
    requestAnimationFrame(updateMouseEffect);
}
// Enhanced QR click effect with ripples
document.getElementById('qrContainer').addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size/2 + 'px';
    ripple.style.top = e.clientY - rect.top - size/2 + 'px';
    this.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 800);
    // Pulse glow effect
    this.classList.add('pulse-glow');
    setTimeout(() => {
        this.classList.remove('pulse-glow');
    }, 2000);
});
// Logo hover effect
document.querySelector('.logo').addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.1) rotateZ(5deg)';
});
document.querySelector('.logo').addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
});
// Initialize everything
createQRCode();
createParticles();
updateMouseEffect();
// Add container glow on load
setTimeout(() => {
    document.querySelector('.container').classList.add('pulse-glow');
}, 1000); 