// js/achievements.js

// CONQUISTAS
const achievements = [
    { id: 'first_game', name: 'Primeiro Jogo', description: 'Complete seu primeiro jogo', icon: '🎮', unlocked: false, xp: 50 },
    { id: 'perfect_score', name: 'Perfeição', description: 'Acertar 100% das questões', icon: '💯', unlocked: false, xp: 100 },
    { id: 'speed_demon', name: 'Demônio da Velocidade', description: 'Responder todas em menos de 30s cada', icon: '⚡', unlocked: false, xp: 75 },
    { id: 'streak_master', name: 'Mestre da Sequência', description: 'Alcançar streak de 10 acertos', icon: '🔥', unlocked: false, xp: 80 },
    { id: 'power_user', name: 'Usuário de Power-ups', description: 'Usar todos os power-ups em um jogo', icon: '✨', unlocked: false, xp: 60 },
    { id: 'calculator_pro', name: 'Profissional da Calculadora', description: 'Usar calculadora 10 vezes', icon: '🧮', unlocked: false, xp: 40 },
    { id: 'theme_master', name: 'Mestre dos Temas', description: 'Completar todos os temas', icon: '👑', unlocked: false, xp: 150 },
    { id: 'level_10', name: 'Nível 10', description: 'Alcançar o nível 10', icon: '🌟', unlocked: false, xp: 200 },
    { id: 'hint_saver', name: 'Economizador de Dicas', description: 'Completar jogo sem usar dicas', icon: '💡', unlocked: false, xp: 70 },
    { id: 'persistent', name: 'Persistente', description: 'Jogar 5 vezes', icon: '💪', unlocked: false, xp: 90 }
];

function checkAchievements() {
    const newAchievements = [];
    
    // Verificar conquistas de streak
    if (gameData.currentStreak >= 10 && !achievements.find(a => a.id === 'streak_master').unlocked) {
        unlockAchievement('streak_master');
        newAchievements.push('streak_master');
    }
    
    // Verificar conquistas de tempo
    const avgTime = gameData.questionTimes.reduce((a, b) => a + b, 0) / gameData.questionTimes.length;
    if (avgTime < 30 && gameData.questionTimes.length >= 5 && !achievements.find(a => a.id === 'speed_demon').unlocked) {
        unlockAchievement('speed_demon');
        newAchievements.push('speed_demon');
    }
    
    return newAchievements;
}

function checkGameAchievements() {
    const newAchievements = [];
    
    // Primeiro jogo
    if (!achievements.find(a => a.id === 'first_game').unlocked) {
        unlockAchievement('first_game');
        newAchievements.push('first_game');
    }
    
    // Pontuação perfeita
    if (gameData.correctAnswers === gameData.totalQuestions && !achievements.find(a => a.id === 'perfect_score').unlocked) {
        unlockAchievement('perfect_score');
        newAchievements.push('perfect_score');
    }
    
    // Usou todos os power-ups
    const totalUsed = Object.values(gameData.powerUps).reduce((sum, p) => sum + p.used, 0);
    if (totalUsed >= 4 && !achievements.find(a => a.id === 'power_user').unlocked) {
        unlockAchievement('power_user');
        newAchievements.push('power_user');
    }
    
    // Nível 10
    if (gameData.level >= 10 && !achievements.find(a => a.id === 'level_10').unlocked) {
        unlockAchievement('level_10');
        newAchievements.push('level_10');
    }
    
    // Mostrar conquistas desbloqueadas
    if (newAchievements.length > 0) {
        showUnlockedAchievements(newAchievements);
        
        // Fogos de artifício para celebrar conquistas
        setTimeout(() => createFireworksEffect(), 100);
    }
}

function unlockAchievement(id) {
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        gameData.achievements.push(id);
        addXP(achievement.xp);
        updateAchievementsDisplay();
        saveGameData();
        return true;
    }
    return false;
}

function updateAchievementsDisplay() {
    const list = document.getElementById('achievements-list');
    if (!list) return;
    list.innerHTML = '';
    
    let unlockedCount = 0;
    
    achievements.forEach(ach => {
        const item = document.createElement('div');
        item.className = `achievement-item ${ach.unlocked ? 'unlocked' : 'locked'}`;
        
        item.innerHTML = `
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-info">
                <h4>${ach.name}</h4>
                <p>${ach.description}</p>
                <p style="font-size: 10px; color: ${ach.unlocked ? '#4caf50' : '#f44336'}">
                    ${ach.unlocked ? '✅ Desbloqueado' : '🔒 Bloqueado'} • ${ach.xp} XP
                </p>
            </div>
        `;
        
        list.appendChild(item);
        if (ach.unlocked) unlockedCount++;
    });
    
    const achievementCount = document.getElementById('achievement-count');
    if (achievementCount) {
        achievementCount.textContent = unlockedCount;
    }
}

function showUnlockedAchievements(achievementIds) {
    const container = document.getElementById('new-achievements');
    const list = document.getElementById('achievements-unlocked');
    if (!container || !list) return;
    list.innerHTML = '';
    
    achievementIds.forEach(id => {
        const ach = achievements.find(a => a.id === id);
        if (ach) {
            const item = document.createElement('div');
            item.className = 'achievement-item unlocked';
            item.style.marginBottom = '10px';
            item.innerHTML = `
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-info">
                    <h4>${ach.name}</h4>
                    <p>${ach.description}</p>
                    <p style="color: #4caf50; font-size: 12px;">+${ach.xp} XP ganhos!</p>
                </div>
            `;
            list.appendChild(item);
        }
    });
    
    container.style.display = 'block';
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        container.style.display = 'none';
    }, 5000);
}

function toggleAchievements() {
    document.getElementById('achievements-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Previne scroll do body
}

function closeAchievements() {
    document.getElementById('achievements-modal').classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll do body
}

// Exporta para Node.js (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        achievements,
        checkAchievements,
        checkGameAchievements,
        unlockAchievement,
        updateAchievementsDisplay,
        showUnlockedAchievements,
        toggleAchievements,
        closeAchievements
    };
}