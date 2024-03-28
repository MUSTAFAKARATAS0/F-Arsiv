import { View, Text,StyleSheet, TextInput } from 'react-native'
import React,{useState} from 'react'
import InputBox from '../../components/Forms/InputBox';

const Register = () => {
  return (
    <View style ={styles.container}>
      <Text style ={styles.pageTitle}>Register</Text>
      <View style={{marginHorizontal:20}}>
      <InputBox inputTitle={"MAİL"} keyboardType ="email-address" autoComplete="email"/>
      <InputBox inputTitle={"PASSWORD"} secureTextEntry={true} autoComplete="password" />
      </View>
    </View>
  );
};

const styles =StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"#e1d5c9"
    },

    pageTitle:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        color :'#1e2225',    
        marginBottom:20,
    },

    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        }
    
})

export default Register