import React from 'react'
import { View, StyleSheet,Text, TouchableWithoutFeedback } from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'

//TouchableWithoutFeedback = quando for tocado o feedback vai ser dado para o jogo

//mined = se esta minado ou não
//opened = esta aberto ou não ( valor booleano )
//nearMines = quantas minas tem ao redor dessa mina (valor inteiro)
//exploded = para saber se esta ou nao explodida
export default props => {
    const { mined, opened, nearMines, exploded, flagged } = props

    const styleField = [styles.field]
    if (opened) styleField.push(styles.opened)
    if (exploded) styleField.push(styles.exploded)
    if (flagged) styleField.push(styles.flagged)
    if (!opened && !exploded) styleField.push(styles.regular)

    //calculo de quantas minas estão presentes dentro da propriedade
    let color = null
    if (nearMines > 0) {
        if (nearMines == 1) color = '#2A28D7'
        if (nearMines == 2) color = '#2B520F'
        if (nearMines > 2 && nearMines < 6) color = '#FF0000'
        if (nearMines >= 6) color = '#B22222'
    }


    return (
        //props.onOpen = esperar receber uma função apartir dos props
        //onLongPress = quando apertar e segurar vai aparecer a bandeira
        //e quando aparecer e apertar e segurar novamente vai desaparecer as bandeiras
        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>
        <View style={styleField}>{!mined && opened && nearMines > 0 ? 
            <Text style={[styles.label, {color: color}]}>
                {nearMines}</Text> : false } 
                {mined && opened ? <Mine /> : false}    
                {flagged && !opened ? <Flag /> : false}         
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: { //cores dos blocos do campo
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red'
    }
})

//{flagged && !opened > <Flag /> : false} = se estiver marcado com bandeira(flagged) e(&&) não estiver aberto(!opened),
// significa que a flag vai aparecer, caso contrario(:) não renderiza nada(false)