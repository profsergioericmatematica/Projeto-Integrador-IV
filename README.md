# Projeto-Integrador-IV

# 🎮 Jogo de Matemática - 9º Ano

## 📖 Sobre o Projeto

O **Jogo de Matemática - 9º Ano** é uma aplicação web educativa desenvolvida como parte do **Projeto Integrador IV** do curso de Licenciatura em Matemática da **UNIVESP** (Universidade Virtual do Estado de São Paulo).

O objetivo da aplicação é auxiliar alunos do **9º Ano do Ensino Fundamental (Anos Finais)** a consolidarem conhecimentos em **Probabilidade e Estatística** através de uma abordagem gamificada, moderna e interativa. O sistema inclui ferramentas de apoio ao cálculo e métricas detalhadas de desempenho.

---

## 🚀 Funcionalidades Principais

O sistema foi projetado para engajar adolescentes através de elementos visuais modernos e mecânicas de jogos:

### 🏆 Gamificação e Engajamento
* **Sistema de XP e Níveis:** Os alunos ganham experiência a cada acerto e sobem de nível, desbloqueando novos recursos.
* **Sequência de Acertos (Streak):** Bonificação visual e pontuação extra para respostas corretas consecutivas.
* **Conquistas:** Badges desbloqueáveis (ex: "Demônio da Velocidade", "Mestre da Sequência").
* **Power-ups Estratégicos:**
    * 💡 **Dica:** Mostra uma explicação auxiliar.
    * ⏭️ **Pular:** Permite avançar sem perder a sequência.
    * ⏱️ **Tempo Extra:** Adiciona segundos ao cronômetro.
    * ✨ **Dobro:** Pontuação em dobro na próxima jogada.

### 🧮 Ferramentas Integradas
* **Calculadora Científica:** Uma calculadora completa embutida na interface (drag-and-drop), permitindo que o aluno realize cálculos complexos (raízes, potências, porcentagem, Pi) sem sair do jogo.

### 📊 Análise de Desempenho
* **Gráficos Interativos:** Utiliza a biblioteca `Chart.js` para plotar a evolução do aluno (Acertos vs. Tempo de Resposta).
* **Feedback Imediato:** Explicações detalhadas para erros e acertos.
* **Relatórios Exportáveis:** Gera um arquivo `.txt` detalhado com todas as estatísticas da partida para download.

---

## 📚 Conteúdos Abordados

O jogo foca nas unidades temáticas essenciais para o 9º ano, conforme a BNCC:

1.  **📊 Probabilidade:**
    * Eventos dependentes e independentes.
    * Cálculo de chances (frações e porcentagens).
    * Espaço amostral (dados, moedas, urnas).
2.  **📈 Estatística:**
    * Medidas de tendência central (Média, Mediana, Moda).
    * Interpretação de gráficos e tabelas.
    * Amplitude e Desvio Padrão.

---

## 🛠️ Tecnologias Utilizadas

O projeto é uma **Single Page Application (SPA)** leve e performática:

* **HTML5:** Estrutura semântica.
* **CSS3:** Design responsivo com tema "Dark/Neon", animações de fogos de artifício (CSS puro + JS) e layout Flexbox/Grid.
* **JavaScript (Vanilla):**
    * Lógica completa do jogo e gerenciamento de estado.
    * Manipulação de áudio (Web Audio API e Fallbacks).
    * Persistência local (`localStorage`) para salvar progresso e XP.
* **Bibliotecas Externas:**
    * [Chart.js](https://www.chartjs.org/): Para visualização de dados.
    * [Font Awesome](https://fontawesome.com/): Para ícones da interface.

---

## 💻 Como Executar

Este é um projeto estático, não requer instalação de servidor backend (Node, PHP, etc).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  **Abra o projeto:**
    Navegue até a pasta e abra o arquivo `index.html` em seu navegador de preferência (Chrome, Firefox, Edge).
3.  **Áudio:**
    Na primeira execução, clique em qualquer lugar da tela ou no botão "Testar Som" para habilitar a reprodução de efeitos sonoros pelo navegador.

---

## 👥 Autores

Trabalho desenvolvido pelos alunos de Licenciatura em Matemática da UNIVESP:

* **Antonio Antunes Junior**
* **Giovani Machado de Lima**
* **Priscilla Santiago Zamorra**
* **Rodrigo Aires de Medeiros Correa**
* **Sergio Eric Reis de Oliveira**
* **Vitor Correa Uberti**

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** - sinta-se livre para usar, modificar e distribuir para fins educacionais.

---
*Desenvolvido com 💙 para o ensino da matemática.*
