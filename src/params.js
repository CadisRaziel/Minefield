import { Dimensions } from 'react-native'

//aqui é feito o calculo que no momento que o usuario baixar em seu celular(pode ser qualqeur modelo)
//esse algoritimo vai calcular as dimensoes da tela para que o jogo fique proporcional a ela !!
//e colocamos o tamnho do bloco da mina e a dificuldade


const params = {
    blockSize: 30, //tamanho do bloco da mina
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, // 0.15 = 15% da tela representa o cabeçalho e 85% será do jogo
    difficultLevel: 0.1, //nivel de dificuldade facil = 0.1 ou seja 10% do campo tera mina (percentual de quantas minas tera o tabuleiro)
    getColumnsAmount() { //metodo para calcular a quantidade de coluna disponivel baseado no tamanho do bloco, para saber as dimensoes do celular
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }

}

export default params