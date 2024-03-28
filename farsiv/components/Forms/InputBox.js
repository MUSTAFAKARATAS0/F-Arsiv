import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'

const InputBox = ({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry=false
}) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
       style={styles.inputBox}
       autoCorrect={false}
       keyboardType={keyboardType}
       autoComplete={autoComplete}
       secureTextEntry={secureTextEntry}
       />
    </View>
  )
}

const styles =StyleSheet.create({
 
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        }
    
})

export default InputBox