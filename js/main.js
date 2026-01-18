// js/main.js

// ================ INICIALIZAÇÃO ================
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado, inicializando...");
    
    // Carregar dados salvos
    loadGameData();
    
    // Configurar seleção de temas
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            gameData.theme = card.dataset.theme;
            updateThemeDisplay();
            console.log("Tema selecionado:", gameData.theme);
        });
    });
    
    // Configurar botões
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    document.getElementById('change-theme-btn').addEventListener('click', () => {
        showScreen('start-screen');
    });
    
    // Configurar conquistas
    document.getElementById('achievement-btn').addEventListener('click', toggleAchievements);
    
    // Configurar calculadora
    initCalculator();
    
    // Configurar controle de som
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        const isEnabled = e.target.value === 'true';
        
        // Atualiza o gameData
        gameData.settings.sound = isEnabled;
        
        // Atualiza o localStorage
        localStorage.setItem('soundEnabled', isEnabled.toString());
        
        // Feedback
        if (isEnabled) {
            audioEnabled = true; 
            playSound('powerup');
        }
        
        saveGameData();
    });

    // CÓDIGO DO RESET
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Tocar um som de alerta
            if (typeof playSound === "function") playSound('incorrect');

            // Pergunta de segurança
            const confirmReset = confirm(
                "⚠️ PERIGO: ATENÇÃO! ⚠️\n\n" +
                "Você está prestes a APAGAR TODO O SEU PROGRESSO.\n" +
                "Isto inclui:\n" +
                "- O seu Nível e XP\n" +
                "- Todas as Conquistas/Troféus\n" +
                "- Estatísticas de acertos\n\n" +
                "Tem a certeza absoluta que quer começar do zero?"
            );
            
            if (confirmReset) {
                // 1. Apagar chaves específicas do localStorage
                localStorage.removeItem('mathGameData');   // Dados do jogo
                localStorage.removeItem('themeProgress');  // Progresso dos temas
                localStorage.removeItem('gamesPlayed');    // Contador de jogos
                
                // 2. Feedback visual
                alert("🗑️ Memória limpa com sucesso!\nO jogo será reiniciado agora.");
                
                // 3. Recarregar a página
                window.location.reload();
            }
        });
    }
    
    // Configurar botão de download de estatísticas
    document.getElementById('download-stats-btn')?.addEventListener('click', downloadStatistics);
    
    // Selecionar tema padrão
    document.querySelector('[data-theme="probabilidade"]').click();
    
    console.log("🎮 Jogo inicializado com sucesso!");
    
    // Inicializar áudios
    initAudio();

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('achievements-modal').classList.contains('active')) {
            closeAchievements();
        }
    });

    // --- CÓDIGO PARA A REVISÃO TEÓRICA ---

    // 1. Configurar o botão principal "Revisão Teórica"
    const theoryBtn = document.getElementById('theory-btn');
    if (theoryBtn) {
        theoryBtn.addEventListener('click', openTheoryModal);
    }

    // 2. Configurar os botões de escolha (Probabilidade vs Estatística) dentro do modal
    document.querySelectorAll('.theme-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theoryType = btn.dataset.theory; // Pega 'probabilidade' ou 'estatistica'
            closeTheoryModal(); // Fecha o menu de escolha
            openTheoryContentModal(theoryType); // Abre o conteúdo
        });
    });
});

// ================ FUNÇÕES DOS MODAIS DE TEORIA ================

function openTheoryModal() {
    const modal = document.getElementById('theory-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede a rolagem da página de fundo
    }
}

function closeTheoryModal() {
    const modal = document.getElementById('theory-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Libera a rolagem
    }
}

function openTheoryContentModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTheoryContentModal(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchTheoryContent(targetTheme) {
    // Fecha qualquer modal aberto
    closeTheoryContentModal('probabilidade');
    closeTheoryContentModal('estatistica');
    
    // Abre o novo após um breve delay para transição visual
    setTimeout(() => {
        openTheoryContentModal(targetTheme);
    }, 300);
}

// ================ FUNÇÕES DO MODAL DE TUTORIAL ================

function openTutorialModal() {
    const modal = document.getElementById('tutorial-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTutorialModal() {
    const modal = document.getElementById('tutorial-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('tutorial-modal').classList.contains('active')) {
            closeTutorialModal();
        }
    }
});

// Habilitar áudio no primeiro clique do usuário
document.addEventListener('click', function enableAudio() {
    audioEnabled = true;
    // Remover o listener após o primeiro clique
    document.removeEventListener('click', enableAudio);
});

// Contar jogos jogados
let gamesPlayed = parseInt(localStorage.getItem('gamesPlayed') || '0');
localStorage.setItem('gamesPlayed', (gamesPlayed + 1).toString());

console.log('🎮 Jogo de Matemática carregado com sucesso!');