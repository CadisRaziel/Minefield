//aqui sera criado 3 funções (logica do jogo)(aqui sera usado para integrar o MineField para criar o tabuleiro)
//1º Board(Tabuleiro),
//2º Espalhar as minas dentro do tabuleiro,
//3º pega a 1º e 2º function para criar um tabuleiro que tem as minas dentro !


//1º
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}
//((_, o underline é para ignorar o 1 parametro
//row e column é o indifice que vai percorrer a função map


//2º
const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0
    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}

//3º
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

//é importante ter essa função de clonar o tabuleiro
//pois sempre quando a gente for mexer no estado de um componente usando react
//a gente não mexe diretamente na referencia do objeto mas sim vai gerando novos objetos que é a evolução do estado
//nosso estado representa o board(tabuleiro com nossos objetos)
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

//criando os vizinhos(para saber quantas minas tem ao redor de determinado bloco)
const getNeighbors = (board, row, column) => {
    const neighbros = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validRow && validColumn) {
                neighbros.push(board[r][c])
            }
        })
    })
    return neighbros
}

//verifica se os vizinhos é seguro ou não
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

//abrir um campo ao clicar ou presionar
const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) { //ele só faz essa logica se não tiver aberto (se tiver fechado)
        field.opened = true //se tiver aberto ele faz a logica abaixo
        if (field.mined) { //se tiver minado seta o exploded para verdadeiro
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) { //se os vizinhos for seguro \/
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column)) //vai chamando de forma recursiva os outros campos ao redor
        } else {// caso os vizinhos nao seja seguro
            const neighbors = getNeighbors(board, row, column) 
            field.nearMines = neighbors.filter(n => n.mined).length //pega os vizinhos e calcula a quantidade de minas ao redor
        }
    }
}

//para ver se tem alguma mina explodida e mostrar para o usuario que perdeu o jogo
const fields = board => [].concat(...board)

//saber se tem algum campo explidido
const hasExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0 //filtro para retornar apenas os campos que tem o atributo exploded = true

//usuario só ganha o jogo se nao tiver nenhum campo pendente
const pendding = field => (field.mined && !field.flagged) //se o campo esta minado e o campo não esta marcado com a bandeira = significa que ainda esta pendente
    || (!field.mined && !field.opened) // ou se o campo não esta minado e o campo não esta aberto = significa que esta pendente tambem
     
//função para descobrir se ele ganhou ou não o jogo
const wonGame = board => fields(board).filter(pendding).length === 0 //se o tamanho do array gerado for igual a 0 = significa que não existe campos pendente ou seja todos campos foram resolvidos e que o usuario ganhou o jogo

//mostrar as minas que eventualmente existe no jogo
//quando o usuario clica na mina e perde o jogo a gente vai pedir para todas as minas serem exibidas !!
const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true) //aqui ele vai abrir todos os campos com mina !!


//marcar um determinado campo com a bandeira
const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

//vai calcular quantas bandeiras(flags) ja foram marcadas dentro do tabuleiro(board)
//fields(board) = pega todos os campos do tabuleiro
const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length


export { createMinedBoard, cloneBoard, openField, hasExplosion, wonGame, showMines, invertFlag, flagsUsed }