import {StyleSheet,Text,View,TextInput,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const FooterItem=({name,text})=>{
return(
<TouchableOpacity>
    <>
    <FontAwesome5Icon name={name} size={30} style={styles.fontStyle}/>
    <Text style={styles.iconText}>{text}</Text>
    </>
</TouchableOpacity>

)
}
const styles =StyleSheet.create({
    fontStyle:{marginBottom:3 , alignSelf:"center"},
    iconText:{fontSize:12, textAlign:'center', textTransform:'uppercase'}
})
export default FooterItem