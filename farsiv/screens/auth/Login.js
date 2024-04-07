import { View, Text,StyleSheet, TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    const hendleSubmit= async () => {
      try {
        setLoading(true)
        if(!email || !password){
        Alert.alert('please fill all fields')
        setLoading(false)
        return
  
        }
        setLoading(false)
      const {data} =await axios.post('http://192.168.88.220:8080/api/v1/auth/login',{email,password});
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      alert(data && data.message );
      console.log('Login Data ==>', { email, password})
      } catch (error) {
        alert(error.response.data.message);
        setLoading(false)
        console.log(error)
      }
    }
  //temp funct,on to check local storage data
  const getLocalStorageData = async () =>{
    let data = await AsyncStorage.getItem ("@auth");
    console.log(("Local storage ==>",data))
  }
  getLocalStorageData();


  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{marginHorizontal: 20}}>
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
      btnTitle="Login"
       loading={loading}
       hendleSubmit={hendleSubmit}
       />
       <Text style={styles.linkText}>
        Not a User Please {" "}
        <Text style={styles.link}
        onPress={() => navigation.navigate('Register')}>
            REGISTER</Text>{" "}
            </Text>
    </View>
  );
    

}
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
        },
    linkText:{
      textAlign:"center"

    },
    link:{
      color:"red"
    }
    
})

export default Login