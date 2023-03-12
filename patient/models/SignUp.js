import {StyleSheet,Text,View,TextInput,TouchableOpacity} from 'react-native'

import React,{useState} from 'react'
import axios from 'axios';
import { HOST } from './network';
const SignUp =() => {
    const [name,setName]=useState("");
    const [username,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit =async ()=>{
        await axios.post(`${HOST}/api/signup`,{name,username,password})
    }
    return (
       <View style={styles.container}>
        <Text style={styles.signupText}>SignUp</Text>
        <View style={{marginHorizontal: 24}}>
            <TextInput style={styles.signupInput} value={name} onChangeText={text=>setName(text)}/>

        </View>
        <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16,color:'#8e93a1'}}>EMAIL</Text>
            <TextInput style={styles.signupInput} value={username} onChangeText={text=> setEmail(text)}/>
        </View>
        <View style={{marginHorizontal:24}}>
            <Text style={{fontSize:16,color:'#8e93a1'}}>PASSWORD</Text>
            <TextInput style={styles.signupInput} value={password} onChangeText={text=> setPassword(text)}/>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{marginHorizontal:24}}>{JSON.stringify({name,username,password})}</Text>
       </View>
          )
}
const styles=StyleSheet.create({
container:{
    flex: 1,
    justifyContent:'center'

},
signupText:{
    fontSize:30,
    textAlign:'center'
},
signupInput:{
    borderBottomWidth:0.5,
    height:48,
    borderBottomColor:"#8e93a1",
    marginBottom:30,
},
buttonStyle:{
    backgroundColor:"darkmagenta",
    height:50,
    marginBottom:20,
    justifyContent:"center",
    marginHorizontal:15,
    borderRadius:15,
},
buttonText:{
    fontSize:20,
    textAlign:"center",
    color:"#fff",
    textTransform:'uppercase'

}


})
export default SignUp