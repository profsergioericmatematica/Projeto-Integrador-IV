// js/game.js

// DADOS DO JOGO
const gameData = {
    theme: null,
    currentQuestion: 0,
    isQuestionAnswered: false,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 20, // Fixo: 20 questões
    questions: [],
    userAnswers: [],
    currentStreak: 0,
    maxStreak: 0,
    startTime: null,
    questionTimes: [],
    powerUps: {
        hint: { count: 3, used: 0 },
        skip: { count: 2, used: 0 },
        time: { count: 2, used: 0 },
        double: { count: 3, used: 0 }
    },
    xp: 0,
    level: 1,
    xpToNextLevel: 100,
    achievements: [],
    settings: {
        sound: true
    },
    timer: null,
    timeLeft: 60, // Fixo: 60 segundos
    doublePointsActive: false,
    questionStartTime: null
};

// FUNÇÕES DO JOGO
function startGame() {
    if (!gameData.theme) {
        alert('Escolha um tema primeiro!');
        return;
    }

    // Resetar dados do jogo
    resetGameData();
    
    // Configurar com base nas settings fixas
    gameData.totalQuestions = 20; // Fixo
    gameData.timeLeft = 60; // Fixo
    
    // Selecionar questões
    selectQuestions();
    
    // Atualizar interface
    updateGameStatus();
    showQuestion();
    updatePowerUpDisplay();
    
    // Mostrar tela de questões
    showScreen('question-screen');
    
    // Iniciar timer (sempre 60 segundos)
    document.getElementById('timer-container').style.display = 'block';
    startTimer();
    
    // Registrar início do jogo
    gameData.startTime = Date.now();
    
    console.log("Jogo iniciado!");
}

function selectQuestions() {
    const allQuestions = questions[gameData.theme];
    
    // Embaralhar todas as questões
    let shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    
    // Pegar as primeiras 20 questões
    gameData.questions = shuffledQuestions.slice(0, 20);
    
    // Se não houver questões suficientes, repetir algumas
    if (gameData.questions.length < 20) {
        const needed = 20 - gameData.questions.length;
        const extraQuestions = shuffledQuestions.slice(0, needed);
        gameData.questions = gameData.questions.concat(extraQuestions);
    }
}

// Variável global para armazenar a escolha temporária
let selectedOptionIndex = null;

function confirmAnswer() {
    if (selectedOptionIndex === null) return; // Segurança

    // Chama a correção oficial
    checkAnswer(selectedOptionIndex);

    // Transforma o botão em "Próxima Questão"
    const actionBtn = document.getElementById('next-btn');
    actionBtn.textContent = "Próxima Questão ➔";
    actionBtn.onclick = nextQuestion; // Muda o evento do clique
}

function showQuestion() {
    const q = gameData.questions[gameData.currentQuestion];
    
    // === RESETAR ESTADO ===
    gameData.isQuestionAnswered = false;
    updatePowerUpDisplay();

    // === ACESSIBILIDADE: Anunciar nova questão ===
    setTimeout(() => {
        announceToScreenReader(`Questão ${gameData.currentQuestion + 1}. Dificuldade ${q.difficulty === 'easy' ? 'Fácil' : q.difficulty === 'medium' ? 'Médio' : 'Difícil'}.`);
    }, 500);
    
    // === CONFIGURAÇÃO DO BOTÃO ===
    selectedOptionIndex = null; 
    const actionBtn = document.getElementById('next-btn');
    actionBtn.textContent = "Confirmar Resposta"; 
    actionBtn.onclick = confirmAnswer; 
    actionBtn.disabled = true; 

    // Atualizar número e texto
    document.getElementById('question-number').textContent = gameData.currentQuestion + 1;
    document.getElementById('question-text').innerHTML = q.question;
    
    // Dificuldade
    const diffEl = document.getElementById('question-difficulty');
    diffEl.textContent = q.difficulty === 'easy' ? 'Fácil' : 
                         q.difficulty === 'medium' ? 'Médio' : 'Difícil';
    diffEl.className = 'question-difficulty'; 
    diffEl.classList.add(`difficulty-${q.difficulty}`);
    
    // === GERAÇÃO DAS OPÇÕES ===
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    ['A', 'B', 'C', 'D'].forEach((letter, index) => {
        const option = document.createElement('button');
        option.className = 'option';
        
        // ARIA Label para acessibilidade
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = q.options[index];
        const cleanText = tempDiv.textContent || tempDiv.innerText || "";
        option.setAttribute('aria-label', `Opção ${letter}: ${cleanText}`);
        
        option.innerHTML = `
            <div class="option-letter">${letter}</div>
            <div style="flex: 1; text-align: left;">${q.options[index]}</div>
        `;
        
        option.addEventListener('click', () => selectOption(option, index));
        optionsContainer.appendChild(option);
    });
    
    // Resetar feedback
    document.getElementById('correct-feedback').style.display = 'none';
    document.getElementById('incorrect-feedback').style.display = 'none';
    
    // Timer
    gameData.timeLeft = 60;
    updateTimerDisplay();
    gameData.questionStartTime = Date.now();
    
    // === MATHJAX - AGORA COM TIMEOUT PARA GARANTIR QUE O DOM ESTÁ PRONTO ===
    setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            // Garante que tanto a pergunta quanto as opções sejam processadas
            const elementsToTypeset = [
                document.getElementById('question-text'),
                document.getElementById('options-container')
            ];
            
            MathJax.typesetPromise(elementsToTypeset)
                .then(() => {
                    console.log('LaTeX renderizado com sucesso!');
                })
                .catch((err) => {
                    console.log('Erro MathJax:', err);
                    // Tentativa alternativa se a primeira falhar
                    setTimeout(() => {
                        if (window.MathJax && window.MathJax.typeset) {
                            MathJax.typeset(elementsToTypeset);
                        }
                    }, 500);
                });
        }
    }, 100); // 100ms é suficiente para o DOM atualizar
}

function selectOption(optionElement, index) {
    // Se o botão já virou "Próxima Questão", não deixa mudar a resposta (já foi corrigido)
    const actionBtn = document.getElementById('next-btn');
    if (actionBtn.textContent.includes("Próxima")) return;

    // Remove seleção visual das outras
    document.querySelectorAll('.option').forEach(o => {
        o.classList.remove('selected');
    });
    
    // Adiciona na atual
    optionElement.classList.add('selected');
    
    // Salva o índice na memória
    selectedOptionIndex = index;
    
    // Libera o botão para confirmar
    actionBtn.disabled = false;
    
    // Opcional: Feedback sonoro leve de "clique" (se tiver áudio de UI)
    // playSound('click'); 
}

function checkAnswer(selectedIndex) {
    clearInterval(gameData.timer);

    // === BLOQUEAR POWER-UPS ===
    gameData.isQuestionAnswered = true; // Marca como respondida
    
    document.querySelectorAll('.power-up').forEach(btn => btn.disabled = true); // Desabilita visualmente todos
    updatePowerUpDisplay();
    // ==========================

    const q = gameData.questions[gameData.currentQuestion];
    const isCorrect = selectedIndex === q.correct;
    const options = document.querySelectorAll('.option');
    
    options.forEach(o => o.style.pointerEvents = 'none');

    const responseTime = (Date.now() - gameData.questionStartTime) / 1000;
    gameData.questionTimes.push(responseTime);
    
    options[q.correct].classList.add('correct');
    
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        
        let points = q.points;
        let bonusText = [];
        
        gameData.currentStreak++;
        if (gameData.currentStreak > gameData.maxStreak) gameData.maxStreak = gameData.currentStreak;
        
        if (gameData.currentStreak >= 3) {
            const streakBonus = Math.floor(gameData.currentStreak / 3) * 5;
            points += streakBonus;
            bonusText.push(`Streak +${streakBonus}`);
            if (gameData.currentStreak >= 5) showStreakIndicator();
        }
        
        if (responseTime < 10) {
            points += 5;
            bonusText.push(`Rápido +5`);
        }
        
        if (gameData.doublePointsActive) {
            points *= 2;
            bonusText.push(`✨ Dobro!`);
            gameData.doublePointsActive = false; // RESETA DEPOIS DE USAR
        }
        
        gameData.score += points;
        gameData.correctAnswers++;
        addXP(points);
        
        document.getElementById('correct-feedback').style.display = 'block';
        document.getElementById('points-earned').textContent = points;
        document.getElementById('bonus-info').textContent = bonusText.length > 0 ? `Bônus: ${bonusText.join(', ')}` : '';
        
        // === ACESSIBILIDADE: Anunciar acerto ===
        announceToScreenReader(`Resposta Correta! Você ganhou ${points} pontos.`);
        
        if (typeof playSound === "function") playSound('correct');
        createFireworksEffect(); // Usa a nova função de canvas
        checkAchievements();
        
    } else {
        options[selectedIndex].classList.add('incorrect');
        gameData.currentStreak = 0;
        
        document.getElementById('incorrect-feedback').style.display = 'block';
        document.getElementById('correct-answer').innerHTML = q.options[q.correct];
        document.getElementById('explanation').innerHTML = q.explanation;
        
        // === ACESSIBILIDADE: Anunciar erro ===
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = q.options[q.correct];
        const cleanAnswer = tempDiv.textContent || "";
        announceToScreenReader(`Resposta Incorreta. A resposta correta era: ${cleanAnswer}`);
        
        if (typeof playSound === "function") playSound('incorrect');
        
        // === ATUALIZAR MathJax ===
        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise([
                    document.getElementById('correct-answer'),
                    document.getElementById('explanation')
                ]).catch(err => console.log('Erro ao processar MathJax:', err));
            }
        }, 100);
    }
    
    gameData.userAnswers.push({
        question: q.question,
        userAnswer: selectedIndex,
        correctAnswer: q.correct,
        isCorrect: isCorrect,
        time: responseTime,
        points: isCorrect ? q.points : 0
    });
    
    updateGameStatus();
}

function nextQuestion() {
    gameData.currentQuestion++;
    
    if (gameData.currentQuestion < gameData.totalQuestions) {
        showQuestion();
        startTimer();
    } else {
        finishGame();
    }
}

function finishGame() {
    // Parar timer
    clearInterval(gameData.timer);
    
    // Calcular estatísticas finais
    const accuracy = (gameData.correctAnswers / gameData.totalQuestions) * 100;
    const avgTime = gameData.questionTimes.length > 0 ? 
        (gameData.questionTimes.reduce((a, b) => a + b) / gameData.questionTimes.length).toFixed(1) : 0;
    
    // Atualizar resultados
    document.getElementById('final-score').textContent = `${accuracy.toFixed(1)}%`;
    document.getElementById('final-correct').textContent = gameData.correctAnswers;
    document.getElementById('accuracy').textContent = `${accuracy.toFixed(1)}% de precisão`;
    document.getElementById('final-points').textContent = gameData.score;
    document.getElementById('avg-time').textContent = `${avgTime}s`;
    document.getElementById('max-streak').textContent = gameData.maxStreak;
    
    // Troféu baseado na pontuação
    let trophy = '🏆';
    if (accuracy >= 90) trophy = '👑';
    else if (accuracy >= 70) trophy = '🥇';
    else if (accuracy >= 50) trophy = '🥈';
    else trophy = '🎖️';
    document.getElementById('trophy').textContent = trophy;
    
    // Criar resumo
    createAnswersSummary();
    
    // Criar gráfico
    createPerformanceChart();
    
    // Verificar se desbloqueou novas conquistas
    checkGameAchievements();
    
    // Salvar recordes
    saveRecords();
    
    // Mostrar tela de resultados
    showScreen('results-screen');
    
    // Tocar som de vitória e fogos de artifício se boa pontuação
    if (accuracy >= 70) {
        playSound('achievement');
        // Fogos de artifício para celebrar uma boa pontuação
        setTimeout(() => createFireworksEffect(), 500);
    }
}

// POWER-UPS
function usePowerUp(power) {
    // === PROTEÇÃO NOVA ===
    if (gameData.isQuestionAnswered) {
        showNotification("⏸️ Questão já respondida!", "warning");
        return;
    }
    // =====================

    if (gameData.timeLeft <= 0) {
        showNotification("⌛ Tempo esgotado!", "warning");
        return;
    }

    if (gameData.powerUps[power].count <= 0) {
        // Feedback visual sutil
        const btn = document.querySelector(`.power-up[data-power="${power}"]`);
        if (btn) {
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 500);
        }
        return;
    }

    switch(power) {
        case 'hint':
            showHint();
            break;
        case 'skip':
            skipQuestion();
            break;
        case 'time':
            addTime(10);
            break;
        case 'double':
            activateDoublePoints();
            break;
    }
    
    gameData.powerUps[power].count--;
    gameData.powerUps[power].used++;
    updatePowerUpDisplay();
    playSound('powerup');
}

function showHint() {
    const q = gameData.questions[gameData.currentQuestion];
    
    // Criar tooltip temporário
    const hintTooltip = document.createElement('div');
    hintTooltip.className = 'hint-tooltip';
    hintTooltip.innerHTML = `
        <div style="padding: 10px; background: rgba(0,0,0,0.9); border-radius: 10px; 
                    border: 2px solid #ff9800; color: white; max-width: 300px;">
            <strong>💡 Dica:</strong> ${q.hint}
        </div>
    `;
    
    hintTooltip.style.position = 'fixed';
    hintTooltip.style.top = '50%';
    hintTooltip.style.left = '50%';
    hintTooltip.style.transform = 'translate(-50%, -50%)';
    hintTooltip.style.zIndex = '10000';
    
    document.body.appendChild(hintTooltip);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        hintTooltip.style.opacity = '0';
        setTimeout(() => hintTooltip.remove(), 300);
    }, 5000);
}

function skipQuestion() {
    clearInterval(gameData.timer);
    gameData.doublePointsActive = false;
    // Registrar como errada
    gameData.userAnswers.push({
        question: gameData.questions[gameData.currentQuestion].question,
        userAnswer: -1,
        correctAnswer: gameData.questions[gameData.currentQuestion].correct,
        isCorrect: false,
        time: (Date.now() - gameData.questionStartTime) / 1000,
        points: 0,
        skipped: true
    });
    
    gameData.currentStreak = 0;
    nextQuestion();
}

function addTime(seconds) {
    gameData.timeLeft += seconds;
    updateTimerDisplay();
    
    // Efeito visual
    const timerText = document.getElementById('timer-text');
    timerText.style.color = '#4caf50';
    setTimeout(() => {
        timerText.style.color = '#ffeb3b';
    }, 1000);
}

function activateDoublePoints() {
    gameData.doublePointsActive = true;
    
    // Efeito visual
    const indicator = document.createElement('div');
    indicator.textContent = '✨ Pontos em Dobro Ativo!';
    indicator.style.position = 'fixed';
    indicator.style.top = '50%';
    indicator.style.left = '50%';
    indicator.style.transform = 'translate(-50%, -50%)';
    indicator.style.background = 'linear-gradient(90deg, #ff9800, #ff5722)';
    indicator.style.color = 'white';
    indicator.style.padding = '15px 30px';
    indicator.style.borderRadius = '30px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '10000';
    indicator.style.animation = 'fadeIn 0.5s';
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => indicator.remove(), 500);
    }, 2000);
}

// TIMER
function startTimer() {
    clearInterval(gameData.timer);
    updateTimerDisplay();
    
    gameData.timer = setInterval(() => {
        gameData.timeLeft--;
        updateTimerDisplay();
        
        if (gameData.timeLeft <= 0) {
            clearInterval(gameData.timer);
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerText = document.getElementById('timer-text');
    const timerProgress = document.getElementById('timer-progress');
    
    // Exibir o tempo real
    timerText.textContent = gameData.timeLeft;
    
    const circumference = 283;
    const maxTime = 60;
    
    // Para cálculo visual, limitar a 60s máximo
    let displayTime = Math.min(gameData.timeLeft, maxTime);
    const offset = circumference - (displayTime / maxTime) * circumference;
    
    timerProgress.style.strokeDashoffset = offset;
    
    // Mudar cor conforme o tempo
    if (gameData.timeLeft < 10) {
        timerProgress.style.stroke = '#f44336';
        timerText.style.color = '#f44336';
    } else if (gameData.timeLeft < 20) {
        timerProgress.style.stroke = '#ff9800';
        timerText.style.color = '#ff9800';
    } else {
        timerProgress.style.stroke = '#4caf50';
        timerText.style.color = '#ffeb3b';
    }
}

function timeUp() {
    gameData.doublePointsActive = false; 
    // Desabilitar opções
    document.querySelectorAll('.option').forEach(o => {
        o.style.pointerEvents = 'none';
    });
    
    // Mostrar feedback de tempo esgotado
    alert('⏰ Tempo esgotado!');
    
    // Registrar como resposta errada
    const q = gameData.questions[gameData.currentQuestion];
    const options = document.querySelectorAll('.option');
    options[q.correct].classList.add('correct');
    
    // Mostrar feedback incorreto
    document.getElementById('incorrect-feedback').style.display = 'block';
    document.getElementById('correct-answer').innerHTML = q.options[q.correct];
    document.getElementById('explanation').innerHTML = "Tempo esgotado! " + q.explanation;
    
    // === ATUALIZAR MathJax ===
    setTimeout(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([
                document.getElementById('correct-answer'),
                document.getElementById('explanation')
            ]).catch(err => console.log('Erro ao processar MathJax:', err));
        }
    }, 100); 
    
    gameData.userAnswers.push({
        question: q.question,
        userAnswer: -1,
        correctAnswer: q.correct,
        isCorrect: false,
        time: 60,
        points: 0,
        timeout: true
    });
    
    gameData.currentStreak = 0;
    document.getElementById('next-btn').disabled = false;
}

// SISTEMA DE XP E NÍVEIS
function addXP(points) {
    gameData.xp += points;
    
    // Verificar se subiu de nível
    while (gameData.xp >= gameData.xpToNextLevel) {
        gameData.xp -= gameData.xpToNextLevel;
        gameData.level++;
        gameData.xpToNextLevel = Math.floor(gameData.xpToNextLevel * 1.2); // Aumenta 20% a cada nível
        
        // Efeitos de level up
        levelUpEffects();
    }
    
    updateLevelDisplay();
    saveGameData();
}

function levelUpEffects() {
    // Tocar som
    playSound('level-up');
    
    // Efeito visual
    const levelUp = document.createElement('div');
    levelUp.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                   background: rgba(0,0,0,0.9); color: white; padding: 30px; border-radius: 20px; 
                   text-align: center; border: 3px solid #ffeb3b;
                   z-index: 2000;">
            <div style="font-size: 50px; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #ffeb3b; margin-bottom: 10px;">Nível Up!</h2>
            <h3 style="font-size: 40px; color: #4caf50;">Nível ${gameData.level}</h3>
            <p style="margin-top: 20px;">Novos power-ups desbloqueados!</p>
        </div>
    `;
    document.body.appendChild(levelUp); // Adiciona o elemento na tela

    // Fogos de artifício para celebrar level up
    setTimeout(() => createFireworksEffect(), 300);
    
    setTimeout(() => {
        levelUp.style.opacity = '0';
        levelUp.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => levelUp.remove(), 500);
    }, 3000);
    
    // Desbloquear power-ups adicionais
    // PREMIAÇÃO: Dá +1 de cada item a cada 3 níveis
    if (gameData.level % 3 === 0) {
        gameData.powerUps.hint.count++;
        gameData.powerUps.skip.count++;
        gameData.powerUps.time.count++;
        gameData.powerUps.double.count++;
        
        // Salva imediatamente para não perder o prêmio se fechar o navegador
        saveGameData(); 
        updatePowerUpDisplay();
        alert("🎁 Bônus de Nível: Você ganhou +1 de todos os Power-ups!");
    }
}

// INTERFACE
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

function updateGameStatus() {
    document.getElementById('score').textContent = gameData.score;
    document.getElementById('question-counter').textContent = 
        `${gameData.currentQuestion + 1}/${gameData.totalQuestions}`;
    
    // Verifica se o elemento streak existe antes de atualizar
    const streakEl = document.getElementById('streak');
    if (streakEl) {
        streakEl.textContent = `Streak: ${gameData.currentStreak}`;
    }

    document.getElementById('current-theme').textContent = 
        gameData.theme === 'probabilidade' ? 'Probabilidade' : 'Estatística';
    
    updateLevelDisplay();
}

function updateLevelDisplay() {
    document.getElementById('level').textContent = gameData.level;
    document.getElementById('xp').textContent = `${gameData.xp}/${gameData.xpToNextLevel} XP`;
    
    const percentage = (gameData.xp / gameData.xpToNextLevel) * 100;
    document.getElementById('level-fill').style.width = `${percentage}%`;
    document.getElementById('level-percentage').textContent = `${Math.floor(percentage)}%`;
}

function updatePowerUpDisplay() {
    // Atualiza os contadores na tela inicial e no jogo
    ['hint', 'skip', 'time', 'double'].forEach(type => {
        // Tenta atualizar contador da tela inicial (se existir)
        const homeCount = document.getElementById(`${type}-count`);
        if (homeCount) homeCount.textContent = gameData.powerUps[type].count;
        
        // Tenta atualizar contador do jogo (se existir)
        const gameCount = document.getElementById(`game-${type}-count`);
        if (gameCount) gameCount.textContent = gameData.powerUps[type].count;
    });

    // Lógica para habilitar/desabilitar visualmente (ADICIONAR/REMOVER CLASSE .disabled)
    document.querySelectorAll('.power-up').forEach(powerUp => {
        const power = powerUp.dataset.power;
        
        // O power-up deve ficar desabilitado se:
        // 1. O estoque for 0 OU
        // 2. A pergunta já tiver sido respondida (bloqueio pós-confirmação)
        const shouldDisable = (gameData.powerUps[power].count <= 0) || gameData.isQuestionAnswered;

        if (shouldDisable) {
            powerUp.classList.add('disabled'); // Aplica o estilo sombreado
            // Mantém o atributo disabled para acessibilidade se for button
            if (powerUp.tagName === 'BUTTON') powerUp.disabled = true; 
        } else {
            powerUp.classList.remove('disabled'); // Remove o sombreado (volta a cor)
            if (powerUp.tagName === 'BUTTON') powerUp.disabled = false;
        }
    });
}

function updateThemeDisplay() {
    // Atualizar progresso dos temas
    const themeProgress = JSON.parse(localStorage.getItem('themeProgress') || '{}');
    
    document.getElementById('probabilidade-progress').textContent = 
        `${themeProgress.probabilidade?.completed || 0}%`;
    document.getElementById('probabilidade-record').textContent = 
        themeProgress.probabilidade?.record || 0;
    
    document.getElementById('estatistica-progress').textContent = 
        `${themeProgress.estatistica?.completed || 0}%`;
    document.getElementById('estatistica-record').textContent = 
        themeProgress.estatistica?.record || 0;
}

function showStreakIndicator() {
    const indicator = document.getElementById('streak-indicator');
    document.getElementById('current-streak').textContent = gameData.currentStreak;
    indicator.style.display = 'block';
    
    setTimeout(() => {
        indicator.style.display = 'none';
    }, 3000);
}

function createAnswersSummary() {
    const summary = document.getElementById('answers-summary');
    summary.innerHTML = '';
    
    gameData.userAnswers.forEach((answer, index) => {
        const q = gameData.questions[index];
        const item = document.createElement('div');
        item.style.marginBottom = '15px';
        item.style.padding = '15px';
        item.style.background = answer.isCorrect ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)';
        item.style.borderRadius = '10px';
        item.style.borderLeft = `4px solid ${answer.isCorrect ? '#4caf50' : '#f44336'}`;
        
        let status = answer.isCorrect ? '✅' : '❌';
        if (answer.skipped) status = '⏭️';
        if (answer.timeout) status = '⏰';
        
        item.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">
                ${status} Questão ${index + 1}: ${answer.question}
            </div>
            <div style="font-size: 14px; color: ${answer.isCorrect ? '#4caf50' : '#f44336'};">
                ${answer.isCorrect ? 
                    `Acertou! +${answer.points} pontos (${answer.time.toFixed(1)}s)` : 
                    `Resposta correta: ${q.options[answer.correctAnswer]}`
                }
                ${answer.skipped ? ' (Pulada)' : ''}
                ${answer.timeout ? ' (Tempo esgotado)' : ''}
            </div>
        `;
        
        summary.appendChild(item);

        setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
                MathJax.typesetPromise([item]).catch(err => {
                    console.log('Erro MathJax no resumo:', err);
                });
            }
        }, 100);
    });
}

function createPerformanceChart() {
    // Verifica se já existe um gráfico no canvas e o destrói antes de criar um novo
    const existingChart = Chart.getChart("performance-chart");
    if (existingChart) {
        existingChart.destroy();
    }

    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // Dados para o gráfico
    const questionNumbers = Array.from({length: gameData.userAnswers.length}, (_, i) => i + 1);
    const correctness = gameData.userAnswers.map(a => a.isCorrect ? 1 : 0);
    const responseTimes = gameData.userAnswers.map(a => a.time);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: questionNumbers,
            datasets: [
                {
                    label: 'Acertos (1=sim, 0=não)',
                    data: correctness,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Tempo de resposta (s)',
                    data: responseTimes,
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#bbdefb'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#bbdefb'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#bbdefb'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#bbdefb'
                    }
                }
            }
        }
    });
}

// LOCAL STORAGE
function saveGameData() {
    const data = {
        xp: gameData.xp,
        level: gameData.level,
        xpToNextLevel: gameData.xpToNextLevel,
        achievements: gameData.achievements,
        settings: gameData.settings,
        powerUps: gameData.powerUps
    };
    localStorage.setItem('mathGameData', JSON.stringify(data));
}

function loadGameData() {
    try {
        const data = JSON.parse(localStorage.getItem('mathGameData'));
        if (data) {
            // Carrega dados persistentes
            gameData.xp = data.xp || 0;
            gameData.level = data.level || 1;
            gameData.xpToNextLevel = data.xpToNextLevel || 100;
            gameData.achievements = data.achievements || [];
            gameData.settings = data.settings || { sound: true };
            
            // IMPORTANTE: Carrega o estoque de power-ups salvo
            if (data.powerUps) {
                gameData.powerUps = data.powerUps;
            }

            // Atualizar status das conquistas
            achievements.forEach(ach => {
                ach.unlocked = gameData.achievements.includes(ach.id);
            });
        }
    } catch (e) {
        console.error("Erro ao carregar save:", e);
    }

    // Configurar som na UI
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle && gameData.settings) {
        soundToggle.value = gameData.settings.sound.toString();
        localStorage.setItem('soundEnabled', gameData.settings.sound);
    }

    // === ATUALIZAÇÃO VISUAL IMEDIATA ===
    updateAchievementsDisplay();
    updateThemeDisplay();
    updateLevelDisplay();
    updatePowerUpDisplay(); // <--- Essa linha corrige o número na tela inicial
}

function saveRecords() {
    const accuracy = (gameData.correctAnswers / gameData.totalQuestions) * 100;
    const themeProgress = JSON.parse(localStorage.getItem('themeProgress') || '{}');
    
    if (!themeProgress[gameData.theme]) {
        themeProgress[gameData.theme] = { completed: 0, record: 0 };
    }
    
    // Atualizar porcentagem de conclusão
    themeProgress[gameData.theme].completed = Math.max(
        themeProgress[gameData.theme].completed,
        Math.floor(accuracy)
    );
    
    // Atualizar recorde de pontuação
    if (gameData.score > (themeProgress[gameData.theme].record || 0)) {
        themeProgress[gameData.theme].record = gameData.score;
    }
    
    localStorage.setItem('themeProgress', JSON.stringify(themeProgress));
    updateThemeDisplay();
}

function resetGameData() {
    // 1. Resetar APENAS dados da partida momentânea (Pontos, Streak, Tempo)
    gameData.currentQuestion = 0;
    gameData.score = 0;
    gameData.correctAnswers = 0;
    gameData.userAnswers = [];
    gameData.currentStreak = 0;
    gameData.maxStreak = 0;
    gameData.questionTimes = [];
    gameData.doublePointsActive = false;
    gameData.questionStartTime = null;
    gameData.timeLeft = 60; // Reinicia o tempo base

    // 2. Lógica de Estoque de Power-ups (CORREÇÃO)
    // Se os power-ups NÃO existirem ou estiverem vazios (Primeira vez jogando), cria o pacote inicial.
    // Se já existirem (carregados do save), NÃO MEXE NELES.
    if (!gameData.powerUps || !gameData.powerUps.hint) {
        gameData.powerUps = {
            hint: { count: 3, used: 0 },
            skip: { count: 2, used: 0 },
            time: { count: 2, used: 0 },
            double: { count: 3, used: 0 }
        };
    }
}

function restartGame() {
    resetGameData();
    showScreen('start-screen');
}

function showStats() {
    alert('📊 Estatísticas:\n' +
          `Nível: ${gameData.level}\n` +
          `XP: ${gameData.xp}/${gameData.xpToNextLevel}\n` +
          `Conquistas: ${gameData.achievements.length}/${achievements.length}\n` +
          `Jogos completados: ${localStorage.getItem('gamesPlayed') || 0}`);
}

function shareResults() {
    const accuracy = (gameData.correctAnswers / gameData.totalQuestions) * 100;
    const text = `🎮 Acabei de jogar Matemática do 9º Ano!\n` +
                `Pontuação: ${gameData.score} pontos\n` +
                `Acertos: ${gameData.correctAnswers}/${gameData.totalQuestions} (${accuracy.toFixed(1)}%)\n` +
                `Nível: ${gameData.level}\n` +
                `#Matematica #Educacao #JogoEducativo`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Meu Resultado - LIAM - Laboratório Interativo de Alfabetização Matemática',
            text: text,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(text);
        alert('📋 Resultado copiado para a área de transferência!');
    }
}

function downloadStatistics() {
    // Coletar dados da partida
    const accuracy = (gameData.correctAnswers / gameData.totalQuestions) * 100;
    const avgTime = gameData.questionTimes.length > 0 ? 
        (gameData.questionTimes.reduce((a, b) => a + b) / gameData.questionTimes.length).toFixed(1) : 0;
    
    // Formatar data e hora
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR');
    
    // Criar conteúdo do arquivo
    const statsContent = `
==========================================
ESTATÍSTICAS DA PARTIDA - LIAM - Laboratório Interativo de Alfabetização Matemática
==========================================

📅 Data: ${dateStr}
⏰ Hora: ${timeStr}

🎮 INFORMAÇÕES DA PARTIDA
========================
• Tema: ${gameData.theme === 'probabilidade' ? 'Probabilidade' : 'Estatística'}
• Número de questões: ${gameData.totalQuestions}
• Tempo por questão: 60 segundos

📊 RESULTADOS
=============
• Pontuação total: ${gameData.score} pontos
• Acertos: ${gameData.correctAnswers}/${gameData.totalQuestions}
• Precisão: ${accuracy.toFixed(1)}%
• Streak máxima: ${gameData.maxStreak} acertos consecutivos
• Tempo médio por questão: ${avgTime}s

⚡ DESEMPENHO
=============
• Nível atual: ${gameData.level}
• XP ganho na partida: ${gameData.score} XP
• Total de XP: ${gameData.xp}/${gameData.xpToNextLevel}

✨ POWER-UPS UTILIZADOS
=======================
• Dicas usadas: ${gameData.powerUps.hint.used}
• Questões puladas: ${gameData.powerUps.skip.used}
• Tempo extra usado: ${gameData.powerUps.time.used}
• Pontos em dobro ativados: ${gameData.powerUps.double.used}

🏆 DETALHES DAS QUESTÕES
========================
${gameData.userAnswers.map((answer, index) => {
    const q = gameData.questions[index];
    let status = answer.isCorrect ? '✅ CORRETO' : '❌ ERRADO';
    if (answer.skipped) status = '⏭️ PULADA';
    if (answer.timeout) status = '⏰ TEMPO ESGOTADO';
    
    return `Questão ${index + 1}: ${status}
   Pergunta: ${answer.question}
   ${answer.isCorrect ? 
        `Pontos: ${answer.points} | Tempo: ${answer.time.toFixed(1)}s` : 
        `Resposta correta: ${q.options[answer.correctAnswer]}`
   }
   ----------------------------------------`;
}).join('\n')}

📈 RECOMENDAÇÕES
================
${accuracy >= 90 ? 
    'Excelente desempenho! Continue assim!' :
accuracy >= 70 ?
    'Bom trabalho! Pratique um pouco mais para alcançar a perfeição.' :
accuracy >= 50 ?
    'Resultado razoável. Recomendamos revisar os conceitos básicos.' :
    'Há espaço para melhoria. Sugerimos estudar os conteúdos novamente.'}

==========================================
Jogo desenvolvido para o 9º Ano do Ensino Fundamental
==========================================
    `.trim();

    // Criar arquivo para download
    const blob = new Blob([statsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `estatisticas-matematica-${dateStr.replace(/\//g, '-')}-${timeStr.replace(/:/g, '-')}.txt`;
    
    // Adicionar ao documento, clicar e remover
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Liberar o objeto URL
    URL.revokeObjectURL(url);
    
    // Feedback visual
    const originalText = document.getElementById('download-stats-btn').innerHTML;
    document.getElementById('download-stats-btn').innerHTML = '✅ Baixado!';
    document.getElementById('download-stats-btn').disabled = true;
    
    setTimeout(() => {
        document.getElementById('download-stats-btn').innerHTML = originalText;
        document.getElementById('download-stats-btn').disabled = false;
    }, 2000);
}

// Exporta as funções principais
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        gameData,
        startGame,
        showQuestion,
        checkAnswer,
        nextQuestion,
        finishGame,
        usePowerUp,
        showHint,
        skipQuestion,
        addTime,
        activateDoublePoints,
        startTimer,
        updateTimerDisplay,
        timeUp,
        addXP,
        levelUpEffects,
        showScreen,
        updateGameStatus,
        updateLevelDisplay,
        updatePowerUpDisplay,
        updateThemeDisplay,
        showStreakIndicator,
        createAnswersSummary,
        createPerformanceChart,
        saveGameData,
        loadGameData,
        saveRecords,
        resetGameData,
        restartGame,
        showStats,
        shareResults,
        downloadStatistics
    };
}