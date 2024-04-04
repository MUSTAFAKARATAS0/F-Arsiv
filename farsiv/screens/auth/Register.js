import { View, Text,StyleSheet, TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';

const Register = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const hendleSubmit= () => {
    try {
      setLoading(true)
      if(!name|| !email || !password){
      Alert.alert('please fill all fields')
      setLoading(false)
      return

      }
      console.log('register Data ==>', {name, email, password})
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

return (
  <View style={styles.container}>
    <Text style={styles.pageTitle}>Register</Text>
    <View style={{marginHorizontal: 20}}>
      <InputBox inputTitle={"Name"} value={name} setValue={setName} />
      <InputBox
        inputTitle={"Email"}
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        setValue={setEmail}
      />
      <InputBox
        inputTitle={"Password"}
        secureTextEntry={true}
        autoComplete="password"
        value={password}
        setValue={setPassword}
      />
    </View>
    {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
    <SubmitButton 
    btnTitle="Register"
     loading={loading}
     hendleSubmit={hendleSubmit}
     />
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