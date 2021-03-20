import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/components/screens/LevelSelection'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/FuncLogica'


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }


  //função responsavel por calcular a quantidade de minas dentro do tabuleiro
  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()), //repare que esses parametros esta nessa funciton createMineBoard
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  //resposta da função de MineField.js (onOpen={() => props.onOpenField(r, c)} />)
  onOpenFieldWinWon = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Você perdeu !', 'Tente novamente')
    }

    if (won) {
      Alert.alert('Parabens você ganhou !')
    }

    this.setState({ board, lost, won })
  }

  //responsavel por marcar as bandeiras
  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabens você ganhou !')
    }

    this.setState({ board, won })
  }

  //função quando o nivel for selecionado 
  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}> 
        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false})} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true})} />
        <View style={styles.board}>
          <MineField board={this.state.board}
            onOpenField={this.onOpenFieldWinWon}
            onSelectField={this.onSelectField} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})



  //<Text style={styles.introduction}>Tamanho da grade:{params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
  //esse comando vai demonstrar na tela o tamanho que vai ficar o campo minado ou seja "19x13"
  //com isso ele vai automaticamente calcular a tela do celular da pessoa(nao importa o tipo)
  //e vai renderizar o campo minado para ficar compativel com a tela
