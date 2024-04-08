import { View, Text,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'

const Home = () => {
//global state
const [state] =useContext(AuthContext)
    return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state,null,4)}</Text>
      <FooterMenu/>
    </View>
  )
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        marginTop:40,
        justifyContent:"space-between"
    }
})

export default Home