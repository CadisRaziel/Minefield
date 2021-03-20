import React from 'react'
import {View, StyleSheet} from 'react-native'
import Field from './Field'

//aqui vai ser um componente para renderizar(mostrar) as colunas e linhas do nosso jogo
//no field esta todos os itens necessarios para criar o tabuleiro !!


export default props => {
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => { //field é o return do creatboard(do funclogica) e aqui vamos transformalo em jsx
            return <Field {...field} key={c}
            onOpen={() => props.onOpenField(r, c)} 
            onSelect={e => props.onSelectField(r, c)}/>
        })
        return <View key={r}
        style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}
//papel do map na function acima = transformar um array de objetos(os fields) em um array do mesmo tamanho só que ao invez de objetos vai ter elementos JSX
//key={c} = sempre que eu retorno um array de elementos JSX eu sou obrigado a por o key se não ele fica me dando uma advertencia
//agora no columns eu tenho um array jsx (armazeou o field)


const styles = StyleSheet.create({
    container: {  
        //flexDirection: 'row' = esse flexdirection estava dando problema, ele tem que ser passado como ali no 1 return     
        backgroundColor: '#EEE',
    }
})