// js/questions.js

// BANCO DE QUESTÕES (20 Probabilidade + 20 Estatística)


const questions = {
    probabilidade: [
        // --- Nível Básico (Intuição) ---
        {
            question: "Se você jogar uma moeda comum para o alto, qual a chance de cair 'Cara'?",
            options: ["100% (Certeza)", "25%", "50% (Metade)", "0% (Impossível)"],
            correct: 2,
            hint: "A moeda só tem dois lados iguais: cara e coroa.",
            explanation: "Como são apenas 2 possibilidades iguais, a chance é 1 em 2, ou seja, metade (50%).",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Em um dado comum de 6 lados, qual a chance de sair o número 7?",
            options: ["0% (Impossível)", "100%", "50%", "10%"],
            correct: 0,
            hint: "Olhe para um dado comum. Qual é o maior número que aparece nele?",
            explanation: "O dado só vai até o número 6. Sair o número 7 é impossível, por isso a chance é 0%.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Uma urna tem 10 bolas: 9 brancas e 1 vermelha. Se você pegar uma sem olhar, o que é mais provável?",
            options: ["Pegar a vermelha", "As chances são iguais", "Nenhuma das anteriores", "Pegar a branca"],
            correct: 3,
            hint: "Pense em qual cor tem em maior quantidade dentro da urna.",
            explanation: "Como há muito mais bolas brancas (9) do que vermelhas (1), a chance de pegar uma branca é muito maior.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Qual a probabilidade de tirar um número PAR ao jogar um dado?",
            options: ["\\(\\frac{1}{6}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{3}\\)", "\\(\\frac{5}{6}\\)"],
            correct: 1,
            hint: "Os números pares no dado são 2, 4 e 6. Isso representa metade dos números.",
            explanation: "São 3 números pares (2, 4, 6) em um total de 6 números. \\(\\frac{3}{6}\\) simplificando é igual a \\(\\frac{1}{2}\\) (metade).",
            difficulty: "easy",
            points: 10
        },
        {
            question: "O sorteio de uma rifa tem 100 números. Se você comprou 1 número, qual sua chance de ganhar?",
            options: ["50 em 100", "1 em 10", "1 em 100", "100 em 1"],
            correct: 2,
            hint: "Você tem apenas um bilhete contra o total de bilhetes da rifa.",
            explanation: "Sua chance é de 1 bilhete favorável (o seu) dividido pelo total de 100 bilhetes: \\(\\frac{1}{100}\\).",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Se a previsão do tempo diz que há 100% de chance de chuva, isso significa que:",
            options: ["Com certeza vai chover", "Talvez chova", "É impossível chover", "Vai chover pouco"],
            correct: 0,
            hint: "100% representa o total, a certeza completa.",
            explanation: "Na probabilidade, 100% (ou 1) representa um 'evento certo', ou seja, temos certeza absoluta que vai acontecer.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Escolhendo ao acaso uma letra da palavra 'ESCOLA', qual a chance de ser a letra 'A'?",
            options: ["\\(\\frac{1}{5}\\)", "\\(\\frac{2}{6}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{6}\\)"],
            correct: 3,
            hint: "Conte quantas letras tem a palavra ESCOLA no total e quantas são a letra 'A'.",
            explanation: "A palavra E-S-C-O-L-A tem 6 letras no total. Apenas uma delas é 'A'. Logo, a chance é \\(\\frac{1}{6}\\).",
            difficulty: "easy",
            points: 10
        },
        // --- Nível Médio (Cálculos Simples) ---
        {
            question: "Em uma caixa há 3 bolas Azuis e 2 Vermelhas. Qual a chance de pegar uma Azul?",
            options: ["\\(\\frac{3}{5}\\)", "\\(\\frac{2}{5}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{3}{2}\\)"],
            correct: 0,
            hint: "Primeiro, some todas as bolas para saber o total na caixa.",
            explanation: "Total de bolas = 3 azuis + 2 vermelhas = 5. Como queremos as azuis (3), a chance é \\(\\frac{3}{5}\\).",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Qual a probabilidade de escolher um dia da semana que comece com a letra 'S'?",
            options: ["\\(\\frac{1}{7}\\)", "\\(\\frac{3}{7}\\)", "\\(\\frac{2}{7}\\)", "\\(\\frac{5}{7}\\)"],
            correct: 1,
            hint: "Os dias são: Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado. Quantos começam com S?",
            explanation: "Os dias com S são: Segunda, Sexta e Sábado (3 dias). O total de dias é 7. Probabilidade = \\(\\frac{3}{7}\\).",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Se você jogar dois dados e somar os números, qual soma é IMPOSSÍVEL de acontecer?",
            options: ["12", "7", "2", "1"],
            correct: 3,
            hint: "O menor número em cada dado é 1. Qual a menor soma possível?",
            explanation: "O mínimo que se pode tirar é 1 em cada dado, somando 1+1=2. Portanto, obter soma 1 é impossível.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Uma prova tem 4 questões de múltipla escolha (A, B, C, D). Se chutar uma, qual a chance de acertar?",
            options: ["50%", "10%", "25%", "75%"],
            correct: 2,
            hint: "Existe apenas uma opção correta entre as quatro possíveis.",
            explanation: "1 chance em 4 é igual a \\(\\frac{1}{4}\\). Em porcentagem: 100% dividido por 4 é igual a 25%.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Em um baralho comum, qual naipe tem mais cartas?",
            options: ["Copas", "Todos têm a mesma quantidade", "Espadas", "Ouros"],
            correct: 1,
            hint: "Um baralho padrão é dividido igualmente entre os símbolos.",
            explanation: "Um baralho é dividido igualmente em 4 naipes. A probabilidade de tirar qualquer naipe é a mesma.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Se a chance de chover é 30%, qual é a chance de NÃO chover?",
            options: ["70%", "30%", "50%", "100%"],
            correct: 0,
            hint: "A soma das chances de acontecer (chuva) e não acontecer (sol) deve ser 100%.",
            explanation: "O total é 100%. Se tirarmos os 30% de chuva, sobra 70% para não chover (100 - 30 = 70).",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Lançando uma moeda 2 vezes, qual a chance de sair 'Cara' nas duas vezes?",
            options: ["\\(\\frac{1}{2}\\)", "\\(\\frac{1}{3}\\)", "\\(\\frac{1}{8}\\)", "\\(\\frac{1}{4}\\)"],
            correct: 3,
            hint: "As opções são: Cara-Cara, Cara-Coroa, Coroa-Cara, Coroa-Coroa.",
            explanation: "Há 4 combinações possíveis. Apenas uma serve (Cara-Cara). Logo, \\(\\frac{1}{4}\\).",
            difficulty: "medium",
            points: 15
        },
        // --- Nível Difícil (Raciocínio Lógico) ---
        {
            question: "Uma caixa tem 5 bolas: 1 Amarela, 1 Azul, 1 Verde, 1 Branca, 1 Preta. Qual a chance de NÃO pegar a preta?",
            options: ["\\(\\frac{1}{5}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{3}{5}\\)"],
            correct: 2,
            hint: "Quantas bolas sobram se excluirmos a bola preta?",
            explanation: "Existem 4 bolas que não são pretas num total de 5. Probabilidade = \\(\\frac{4}{5}\\).",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Se eu tenho 3 camisas e 2 calças, de quantas formas diferentes posso me vestir?",
            options: ["6", "5", "3", "2"],
            correct: 0,
            hint: "Para cada uma das 3 camisas, você pode usar 2 calças diferentes. Tente multiplicar.",
            explanation: "Pelo princípio multiplicativo: 3 camisas × 2 calças = 6 combinações diferentes de roupa.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Em um jogo, você ganha se tirar um número maior que 4 no dado. Qual sua chance?",
            options: ["\\(\\frac{1}{6}\\)", "\\(\\frac{2}{6}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{4}{6}\\)"],
            correct: 1,
            hint: "Quais números no dado são maiores que 4?",
            explanation: "Os números maiores que 4 são o 5 e o 6. São 2 números favoráveis em 6 possíveis (\\(\\frac{2}{6}\\) ou \\(\\frac{1}{3}\\)).",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Qual a chance de tirar um número PRIMO em um dado (2, 3, 5)?",
            options: ["20%", "30%", "50%", "60%"],
            correct: 2,
            hint: "Conte quantos números primos existem até 6 (o 2, o 3 e o 5).",
            explanation: "Os primos no dado são 2, 3 e 5. São 3 números em 6 totais. \\(\\frac{3}{6}\\) é igual a metade, ou 50%.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Se você retirar uma carta de um baralho de 52 cartas, é mais provável sair:",
            options: ["Um Rei", "Um Ás vermelho", "O 7 de Ouros", "Uma carta de Copas"],
            correct: 3,
            hint: "Pense na quantidade de cada tipo. Existem 4 Reis, 2 Áses vermelhos, 1 sete de ouros e 13 cartas de Copas.",
            explanation: "Existem 13 cartas de Copas, o que é maior quantidade que Reis (4), Áses vermelhos (2) ou 7 de Ouros (1).",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Em um sorteio entre 10 meninos e 15 meninas, qual a chance de o vencedor ser menino?",
            options: ["\\(\\frac{10}{25}\\)", "\\(\\frac{10}{15}\\)", "\\(\\frac{15}{25}\\)", "\\(\\frac{1}{2}\\)"],
            correct: 0,
            hint: "Lembre-se de somar meninos e meninas para achar o total de alunos.",
            explanation: "Total de alunos = 10 + 15 = 25. Meninos = 10. Probabilidade = \\(\\frac{10}{25}\\) (meninos sobre o total).",
            difficulty: "hard",
            points: 20
        }
    ],
    estatistica: [
        // --- Nível Básico (Leitura e Conceitos) ---
        {
            question: "O que é uma 'Pesquisa Censitária' (Censo)?",
            options: ["Entrevistar algumas pessoas", "Adivinhar os dados", "Entrevistar TODA a população", "Fazer um sorteio"],
            correct: 2,
            hint: "Lembre-se do Censo do IBGE, que tenta contar todos os brasileiros.",
            explanation: "Censo é quando coletamos dados de 100% dos indivíduos de um grupo ou população, sem deixar ninguém de fora.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Para descobrir qual o sabor de sorvete favorito da turma, qual a melhor pergunta?",
            options: ["Qual seu sabor favorito?", "Você gosta de sorvete?", "Você gosta de chocolate?", "Quanto custa o sorvete?"],
            correct: 0,
            hint: "A pergunta deve permitir várias respostas diferentes sobre sabores.",
            explanation: "Perguntar 'Qual seu sabor favorito?' permite coletar os dados variados (morango, chocolate, creme...) para fazer a estatística.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Em um gráfico de barras, o que a altura da barra geralmente representa?",
            options: ["A beleza do gráfico", "A largura dos dados", "A cor dos dados", "A quantidade ou frequência"],
            correct: 3,
            hint: "Quanto mais alta a barra, mais gente escolheu aquela opção.",
            explanation: "A altura (ou comprimento) da barra indica a frequência ou quantidade daquela categoria (quantos votos ela teve).",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Se 5 alunos tiraram nota 10, dizemos que a FREQUÊNCIA da nota 10 é:",
            options: ["10", "5", "50", "1"],
            correct: 1,
            hint: "Frequência é a quantidade de vezes que algo aconteceu.",
            explanation: "Frequência absoluta é o número de vezes que o dado aparece. Se 5 alunos tiraram 10, a frequência é 5.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "Qual gráfico usa 'fatias' para representar as partes de um todo?",
            options: ["Gráfico de Pizza (Setores)", "Gráfico de Linhas", "Gráfico de Barras", "Histograma"],
            correct: 0,
            hint: "Tem o formato de uma comida redonda dividida.",
            explanation: "O gráfico de setores é popularmente conhecido como gráfico de pizza porque suas fatias representam partes do total.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "João tirou notas 5, 5 e 5. Qual é a média dele?",
            options: ["15", "3", "5", "10"],
            correct: 2,
            hint: "Se todas as notas são iguais, a média é esse mesmo valor.",
            explanation: "A média de valores iguais é o próprio valor. (5+5+5) dividido por 3 é igual a 5.",
            difficulty: "easy",
            points: 10
        },
        {
            question: "O que é 'Amostra' em uma pesquisa?",
            options: ["Toda a população", "O resultado final", "O gráfico", "Uma parte pequena escolhida para representar o todo"],
            correct: 3,
            hint: "É como quando você prova um pedacinho do bolo para ver se está bom, sem comer o bolo inteiro.",
            explanation: "Amostra é um pequeno grupo selecionado da população para a pesquisa, pois muitas vezes é impossível perguntar a todos.",
            difficulty: "easy",
            points: 10
        },
        // --- Nível Médio (Moda, Média, Mediana) ---
        {
            question: "Observe os números: 2, 5, 8, 5, 9. Qual é a MODA?",
            options: ["5", "2", "8", "9"],
            correct: 0,
            hint: "Moda é o que está 'na moda', ou seja, o que aparece mais vezes.",
            explanation: "O número 5 aparece duas vezes, os outros apenas uma. Logo, 5 é a moda.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Qual a Média de idade entre dois irmãos de 10 e 12 anos?",
            options: ["10", "12", "22", "11"],
            correct: 3,
            hint: "Qual número está exatamente no meio de 10 e 12?",
            explanation: "Soma-se as idades (10+12=22) e divide pela quantidade de pessoas (2). A média é 11.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Em uma corrida, os tempos foram: 10s, 12s, 15s. O tempo MÉDIO foi:",
            options: ["12s", "13s", "12,3s", "37s"],
            correct: 2,
            hint: "Some 10+12+15 e divida o resultado por 3.",
            explanation: "10+12+15 = 37. Dividindo 37 por 3, obtemos aproximadamente 12,33 segundos.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Para saber qual a fruta preferida da turma para o lanche, que medida usamos?",
            options: ["Média", "Moda", "Mediana", "Amplitude"],
            correct: 1,
            hint: "Queremos saber a fruta que teve MAIS votos.",
            explanation: "A Moda indica o valor mais frequente (o vencedor). Não dá para calcular a 'Média' de maçãs e bananas.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Qual a Mediana dos números: 1, 3, 5, 7, 9?",
            options: ["5", "1", "9", "7"],
            correct: 0,
            hint: "Coloque em ordem (já estão) e pegue o número que está bem no meio.",
            explanation: "Os números já estão ordenados. O termo central é o 5.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "A Amplitude dos dados 10, 20, 50 é:",
            options: ["50", "10", "40", "30"],
            correct: 2,
            hint: "É a diferença (distância) entre o maior valor e o menor valor.",
            explanation: "Amplitude = Maior valor (50) menos o Menor valor (10). 50 - 10 = 40.",
            difficulty: "medium",
            points: 15
        },
        {
            question: "Qual gráfico é melhor para mostrar se a temperatura subiu ou desceu durante a semana?",
            options: ["Gráfico de Pizza", "Tabela", "Pictograma", "Gráfico de Linha"],
            correct: 3,
            hint: "As linhas conectam pontos e mostram a evolução ou mudança.",
            explanation: "Gráficos de linha são ideais para mostrar evolução ou variação ao longo do tempo (como temperatura, crescimento, etc).",
            difficulty: "medium",
            points: 15
        },
        // --- Nível Difícil (Interpretação) ---
        {
            question: "Em uma lista ordenada: 2, 3, X, 8, 10. Se a mediana é 6, qual o valor de X?",
            options: ["6", "5", "7", "4"],
            correct: 0,
            hint: "A mediana é o número do meio. Olhe para a posição do X.",
            explanation: "Como são 5 números, o X está exatamente na posição do meio. Para a mediana ser 6, o X deve valer 6.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Se a média de 4 provas foi 7,0. Qual a soma total das notas?",
            options: ["21", "30", "28", "14"],
            correct: 2,
            hint: "Se ele tivesse tirado 7 em todas as 4 provas, qual seria o total?",
            explanation: "Se a média é 7 e foram 4 provas, fazemos 7 vezes 4 = 28 pontos no total.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Uma variável 'Qualitativa' representa:",
            options: ["Números e contas", "Qualidades ou categorias (ex: cor dos olhos)", "Apenas notas de prova", "A quantidade de alunos"],
            correct: 1,
            hint: "Qualitativa vem de 'Qualidade', não de quantidade (números).",
            explanation: "Variáveis qualitativas expressam características (cor, gênero, nome, escolaridade), e não números que podemos somar.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Se em um gráfico de pizza a parte do 'Futebol' ocupa metade do círculo, quantos % gostam de futebol?",
            options: ["25%", "75%", "100%", "50%"],
            correct: 3,
            hint: "O círculo inteiro vale 100%. Quanto vale a metade?",
            explanation: "Metade do círculo corresponde a metade do total, ou seja, 50%.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Em estatística, o que significa organizar os dados em 'Rol'?",
            options: ["Misturar os dados", "Colocar em ordem crescente ou decrescente", "Apagar os dados", "Somar os dados"],
            correct: 1,
            hint: "É o primeiro passo importante antes de achar a mediana.",
            explanation: "Rol é a organização dos dados brutos em uma ordem (geralmente do menor para o maior) para facilitar a análise.",
            difficulty: "hard",
            points: 20
        },
        {
            question: "Se a moda de um conjunto é 7, isso significa que:",
            options: ["A média é 7", "O maior número é 7", "O número 7 é o que mais se repete", "A mediana é 7"],
            correct: 2,
            hint: "Lembre-se da definição de Moda (o mais popular).",
            explanation: "A Moda é o valor com maior frequência absoluta, ou seja, o que mais aparece na lista.",
            difficulty: "hard",
            points: 20
        }
    ]
};
