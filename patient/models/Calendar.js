import React from "react"
import {  Text, SafeAreaView, StyleSheet} from 'react-native'
import FooterList from '../components/FooterList'

const Calendar = () => {
    return (
     
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>Calendar</Text>
       

            
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
export default Calendar