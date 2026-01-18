// js/fireworks.js

// Sistema de Fogos de Artifício Otimizado (Canvas)
const canvas = document.getElementById('fireworks-canvas');
let ctx = null;
let particles = [];

// Inicializa o contexto do canvas se ele existir
if (canvas) {
    ctx = canvas.getContext('2d');
    
    // Ajustar tamanho
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Loop de animação
    function animationLoop() {
        if (particles.length > 0) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= 0.01;

                ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.alpha <= 0) particles.splice(i, 1);
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(animationLoop);
    }
    animationLoop();
}

// Função principal de criar fogos (Substitui a antiga)
function createFireworksEffect() {
    if (!ctx) return; // Segurança caso o canvas não carregue
    console.log("Criando fogos (Canvas)...");
    
    // Tenta tocar som se existir
    if (typeof playSound === "function") playSound('firework');
    
    // Cria 5 explosões
    for(let i=0; i<5; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height * 0.6);
            createExplosion(x, y);
        }, i * 300);
    }
}

// Função auxiliar da explosão
function createExplosion(x, y) {
    const particleCount = 50;
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 6 + 2;
        
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            size: Math.random() * 3 + 1,
            r: r, g: g, b: b,
            alpha: 1
        });
    }
}

// Função de teste para o botão
function testFireworks() {
    createFireworksEffect();
}

// Função Auxiliar de Acessibilidade (Leitor de Tela)
function announceToScreenReader(message) {
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
        announcer.textContent = ''; // Limpa para forçar o anúncio
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }
}

// Exporta para Node.js (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createFireworksEffect,
        testFireworks,
        announceToScreenReader
    };
}