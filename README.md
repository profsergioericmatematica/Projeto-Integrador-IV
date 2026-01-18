# 🎮 LIAM - Laboratório Interativo de Alfabetização Matemática

> Projeto Integrador IV | Licenciatura em Matemática | UNIVESP | MIT License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![UNIVESP](https://img.shields.io/badge/UNIVESP-Projeto_Integrador_IV-red)](https://univesp.br)

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> **LIAM - Laboratório Interativo de Alfabetização Matemática** é uma aplicação web gamificada desenvolvida para estudantes do 9º Ano do Ensino Fundamental, com foco em **Probabilidade** e **Estatística**, alinhada às competências da BNCC.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte do **Projeto Integrador IV** do curso de Graduação de Licenciatura em Matemática da **UNIVESP**. O objetivo é transformar a resolução de exercícios matemáticos em uma experiência engajadora, utilizando gamificação para reduzir a ansiedade matemática e aumentar a fixação de conteúdo, tornando o aprendizado mais interativo e eficaz.

---

## ✨ Funcionalidades Principais

### 📚 Conteúdo Educacional
- **Probabilidade:** Eventos dependentes/independentes, espaço amostral, cálculo de probabilidades
- **Estatística:** Média, moda, mediana, análise de gráficos, interpretação de dados
- **Revisão Teórica:** Módulos de consulta rápida para reforçar conceitos antes de jogar

### 🎮 Sistema de Gamificação
- **Sistema de XP e Níveis:** Evolução progressiva conforme acertos
- **Streak (Sequência):** Bônus de pontuação por acertos consecutivos
- **🏆 Conquistas:** 10 medalhas desbloqueáveis (ex: "Perfeição", "Velocista", "Mestre da Sequência")
- **✨ Power-ups:**
  - 💡 Dica Extra (3 disponíveis)
  - ⏭️ Pular Questão (2 disponíveis)
  - ⏱️ Tempo Extra (+10s, 2 disponíveis)
  - ✨ Pontos em Dobro (3 disponíveis)

### 🛠️ Ferramentas Integradas
- **🧮 Calculadora:** Integrada na interface, com arrastar e minimizar
- **📊 Análise de Desempenho:** Gráficos interativos (Chart.js) e estatísticas detalhadas
- **🔔 Feedback Imediato:** Correção visual e explicativa passo a passo
- **📥 Exportação de Dados:** Download de relatório completo em .txt
- **♿ Acessibilidade:** Suporte a leitores de tela e navegação por teclado
- **🎆 Efeitos Visuais:** Fogos de artifício em Canvas para celebrações

---

## 🏗️ Nova Estrutura do Projeto

O projeto foi reorganizado em uma estrutura modular para melhor manutenção e escalabilidade:

```
Projeto-Integrador-IV/
├── index.html          # Página principal
├── LICENSE             # Licença MIT
├── README.md           # Documentação
├── css/                # Estilos separados por funcionalidade
│   ├── variables.css   # Variáveis CSS e tema
│   ├── reset.css       # Reset de estilos
│   ├── layout.css      # Layout principal
│   ├── game-status.css # Status do jogo
│   ├── themes.css      # Temas e seleção
│   ├── questions.css   # Estilos das questões
│   ├── powerups.css    # Estilos dos power-ups
│   ├── buttons.css     # Estilos dos botões
│   ├── calculator.css  # Calculadora
│   ├── achievements.css # Sistema de conquistas
│   ├── results.css     # Tela de resultados
│   ├── modals.css      # Modais e overlays
│   ├── footer.css      # Rodapé
│   ├── animations.css  # Animações
│   └── responsive.css  # Responsividade
├── js/                 # Lógica JavaScript modular
│   ├── questions.js    # Banco de questões e gerenciamento
│   ├── calculator.js   # Calculadora científica
│   ├── game.js         # Lógica principal do jogo
│   ├── achievements.js # Sistema de conquistas
│   ├── audio.js        # Sistema de áudio
│   ├── fireworks.js    # Efeitos visuais (fogos)
│   └── main.js         # Inicialização e eventos
└── assets/             # Recursos (se necessário)
```

---

## 🚀 Tecnologias Utilizadas

### Core Technologies
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização responsiva, animações, CSS Grid e Flexbox
- **JavaScript (ES6+)** - Lógica completa do jogo, modularizada

### Bibliotecas Externas (via CDN)
- **[MathJax 3](https://www.mathjax.org/)** - Renderização de fórmulas matemáticas LaTeX
- **[Chart.js](https://www.chartjs.org/)** - Gráficos de desempenho e análise
- **[Font Awesome 6](https://fontawesome.com/)** - Ícones e elementos visuais

### APIs Navegador
- **Canvas API** - Efeitos visuais de alta performance (fogos de artifício)
- **Web Audio API** - Sistema de sons e efeitos sonoros
- **LocalStorage** - Persistência de dados do jogador
- **CSS Variables** - Sistema de design consistente

---

## 📦 Como Executar o Projeto

### 🌐 Opção 1: GitHub Pages (Recomendado)
Acesse a versão online diretamente pelo link:
> **[https://profsergioericmatematica.github.io/Projeto-Integrador-IV/](https://profsergioericmatematica.github.io/Projeto-Integrador-IV/)**

### 💻 Opção 2: Execução Local
1. **Clone este repositório:**
   ```bash
   git clone https://github.com/profsergioericmatematica/Projeto-Integrador-IV.git
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd Projeto-Integrador-IV
   ```

3. **Execute de uma das formas:**
   - **Método simples:** Abra o arquivo `index.html` diretamente no navegador
   - **Com servidor local (recomendado):**
     ```bash
     # Com Python
     python -m http.server 8000
     
     # Ou com Node.js
     npx serve .
     ```
     Acesse: `http://localhost:8000`

**Nota:** Conexão com internet é necessária para carregar as bibliotecas via CDN (MathJax, Chart.js, Font Awesome).

---

## 🎮 Como Jogar

1. **Escolha o Tema:** Selecione entre Probabilidade ou Estatística
2. **Configure as Preferências:** Ajuste som e explore o tutorial
3. **Responda as Questões:** 20 questões com 60 segundos cada
4. **Use Estrategicamente:** Power-ups, calculadora e revisão teórica
5. **Acompanhe o Progresso:** Ganhe XP, suba de nível e desbloqueie conquistas
6. **Analise os Resultados:** Veja estatísticas detalhadas e gráficos de desempenho

---

## 🔧 Arquitetura Modular

### Vantagens da Nova Estrutura
- **Manutenção Facilitada:** Código dividido por responsabilidade
- **Performance Otimizada:** Carregamento seletivo de recursos
- **Escalabilidade:** Fácil adição de novos módulos
- **Colaboração:** Múltiplos desenvolvedores podem trabalhar simultaneamente

### Fluxo de Dados
```
index.html → main.js (coordenação)
          ├── game.js (estado do jogo)
          ├── questions.js (questões atuais)
          ├── calculator.js (cálculos)
          ├── achievements.js (progresso)
          ├── audio.js (feedback sonoro)
          └── fireworks.js (celebrações)
```

---

## 👥 Equipe de Desenvolvimento

**Projeto Integrador IV - Licenciatura em Matemática - UNIVESP**

| Nome | 
|------|
| **Antonio Antunes Junior** |
| **Flávio Rabelo Barros**|
| **Giovani Machado de Lima** | 
| **Mariane Mendes Coutinho** |
| **Priscilla Santiago Zamorra** |
| **Rodrigo Aires de Medeiros Correa** | 
| **Sergio Eric Reis de Oliveira** | 
| **Vitor Correa Uberti** |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para colaborar:

1. **Faça um Fork** do projeto
2. **Crie uma Branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push para a Branch** (`git push origin feature/NovaFuncionalidade`)
5. **Abra um Pull Request**

### Áreas que Precisam de Ajuda
- 📱 Melhorias de responsividade para mobile
- 🎨 Novos temas visuais
- 📚 Expansão do banco de questões
- 🌐 Tradução para outros idiomas
- 🧪 Testes automatizados

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 📚 Recursos Educacionais

### Alinhamento com a BNCC
O projeto atende às competências específicas de Matemática do 9º Ano:
- **Competência 1:** Utilizar conhecimentos matemáticos para resolver problemas
- **Competência 5:** Utilizar tecnologias digitais para aprendizagem
- **Habilidades:** EF09MA20, EF09MA21, EF09MA22, EF09MA23

### Metodologia
- **Aprendizado Baseado em Jogos (ABJ)**
- **Feedback Imediato** para reforço positivo
- **Progressão por Desafios** adaptada ao ritmo do aluno
- **Contextualização** de conceitos abstratos

---

## 📞 Contato e Suporte

- **Repositório:** [github.com/profsergioericmatematica/Projeto-Integrador-IV](https://github.com/profsergioericmatematica/Projeto-Integrador-IV)
- **UNIVESP:** [www.univesp.br](https://www.univesp.br)
- **Relatar Issues:** Use a seção de Issues do GitHub

---

<p align="center">
  Desenvolvido com 💙, 🔢 e 🎮 para a educação matemática brasileira
  <br>
  <em>"A matemática é a linguagem com a qual Deus escreveu o universo." - Galileu Galilei</em>
</p>

---

*Última atualização: Janeiro 2026*
