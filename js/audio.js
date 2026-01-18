// js/audio.js

let audioEnabled = false;

function initAudio() {
    console.log("Inicializando áudios...");
    
    // Tentar carregar todos os áudios
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        // Configurar volume
        audio.volume = 1.0;
        
        // Tentar carregar (sem .catch, pois load() não retorna promessa)
        try {
            audio.load();
        } catch (e) {
            console.log("Erro ao carregar áudio:", e);
        }
    });
    
    console.log("Áudios inicializados");
}

function testAudio() {
    console.log("Testando áudio...");
    audioEnabled = true;
    playSound('firework');
    alert("🔊 Teste de som realizado! Se você ouviu fogos de artifício, o som está funcionando.");
}

function playSound(type) {
    // Verificar se o som está habilitado
    if (localStorage.getItem('soundEnabled') === 'false') return;
    
    // Se o áudio ainda não foi habilitado (primeira interação), não tenta tocar
    if (!audioEnabled) {
        console.log("Áudio não habilitado ainda. Clique em 'Testar Som' primeiro.");
        return;
    }
    
    const audio = document.getElementById(`${type}-sound`);
    if (audio) {
        try {
            // Para o áudio e reinicia
            audio.pause();
            audio.currentTime = 0;
            
            // Ajustar volume específico para fogos de artifício
            if (type === 'firework') {
                audio.volume = 1.0; // Volume MÁXIMO
                audio.currentTime = 0; // Reinicia o som para dar o estalo imediato
            } else {
                // Se não for fogo, toca um pouco mais baixo (60%) 
                // para que, quando os fogos entrarem (100%), eles pareçam muito altos
                audio.volume = 0.6; 
            }
            
            // Tenta tocar
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log(`Não foi possível tocar o som ${type}:`, error);
                    // Tentativa alternativa - usar áudio embutido
                    fallbackAudio(type);
                });
            }
        } catch (error) {
            console.log(`Erro ao tocar som ${type}:`, error);
            fallbackAudio(type);
        }
    } else {
        console.log(`Áudio não encontrado: ${type}`);
        fallbackAudio(type);
    }
}

// Fallback para áudio usando Web Audio API se os URLs externos falharem
function fallbackAudio(type) {
    console.log(`Usando fallback para: ${type}`);
    
    // Criar contexto de áudio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Gerar som baseado no tipo
    let frequency = 440; // Hz
    let duration = 0.3; // segundos
    
    switch(type) {
        case 'correct':
            frequency = 523.25; // C5
            break;
        case 'incorrect':
            frequency = 349.23; // F4
            break;
        case 'level-up':
            frequency = 659.25; // E5
            break;
        case 'achievement':
            // Acorde maior
            playChord([523.25, 659.25, 783.99], 1.0);
            return;
        case 'powerup':
            frequency = 587.33; // D5
            break;
        case 'firework':
            // Som de explosão
            playExplosionSound();
            return;
    }
    
    // Criar oscilador
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Configurar envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function playChord(frequencies, duration) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    frequencies.forEach(freq => {
        const oscillator = audioContext.createOscillator();
        oscillator.connect(gainNode);
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    });
}

function playExplosionSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    // Gerar ruído branco
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    whiteNoise.start(audioContext.currentTime);
    whiteNoise.stop(audioContext.currentTime + 1);
}

// Exporta para Node.js (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAudio,
        testAudio,
        playSound,
        fallbackAudio,
        playChord,
        playExplosionSound
    };
}