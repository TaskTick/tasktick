import React from "react"
import {  Text, SafeAreaView, StyleSheet} from 'react-native'
const Home = () => {
    return (
     
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>Home</Text>
       
        </SafeAreaView>
   
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
    },
    mainText:{
        fontSize:30,justifyContent:'center',
    }

})
export default Home