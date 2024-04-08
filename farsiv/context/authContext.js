import React,{createContext,useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


//context
const AuthContext = createContext()

//provider
const AuthProvider = ({children}) =>{
    //Global State
    const [state,setState] =useState({
        user:null,
        token:"",
    })


    //default axios setting
    axios.defaults.baseURL='http://192.168.88.220:8080/api/v1'

    //inital local storage data 
    useEffect(() => {
        const loadLocalStorageData = async ()=>{
            let data = await AsyncStorage.getItem('@auth')
            let loginData =JSON.parse(data)
            setState({...state,user:loginData?.user, token: loginData?.token});
        }

        loadLocalStorageData()

    },[])
    return(
        <AuthContext.Provider value ={[state,setState] }>
            {children}
             
        </AuthContext.Provider>

    )
};

export{AuthContext,AuthProvider};