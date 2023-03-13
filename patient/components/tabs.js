import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../models/Home";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Calendar from "../models/Calendar";
import CareGiver from "../models/CareGiver";
import Options from "../models/Options";
import Menu from "../models/Menu";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { Foundation } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const CustomTabBarbutton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: "center",
            alignItems: "center",
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#efb810',
                tabBarInactiveTintColor: 'black',
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            })}
        >

            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <FontAwesome5 name="home" size={24} color="black" />
                    </View>
                )
            }} />
            <Tab.Screen name="Calendar" component={Calendar} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <FontAwesome5 name="calendar-alt" size={24} color="black" />
                    </View>
                )
            }} />



            <Tab.Screen name="Menu" component={Menu}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                        <Ionicons name="add-circle-outline" size={60} color="black" />
                        </View>
                    ),tabBarButton:(props)=>(
                        <CustomTabBarbutton {...props}/>
                    )
                }}
            />





            <Tab.Screen name="CareGiver" component={CareGiver} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Foundation name="torsos-all-female" size={24} color="black" />
                    </View>
                )
            }} />
            <Tab.Screen name="Options" component={Options} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <FontAwesome5 name="indent" size={24} color="black" />
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,

        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }

});

export default Tabs;