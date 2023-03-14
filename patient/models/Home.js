import React from "react"
import { StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Home = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => navigation.navigate('AddTask')}>
                    <Foundation name="clipboard-pencil" size={25} style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Add Feedback" onPress={() => { }}>
                    <MaterialCommunityIcons name="message-plus-outline" size={25} style={styles.actionButtonIcon}  />
                </ActionButton.Item>
            </ActionButton>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainText: {
        fontSize: 30, justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 25,
        height: 22,
        marginLeft:3,
        color: 'white',
    },

})
export default Home