import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../models/Home";
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from "react-native";
import Calendar from "../models/Calendar";
import CareGiver from "../models/CareGiver";
import Options from "../models/Options";
import Menu from "../models/Menu";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Foundation } from '@expo/vector-icons';
import AddTask from '../models/AddTask';

const Tab = createBottomTabNavigator();

const CustomTabBarbutton = ({ children, onPress }) => (

    <TouchableOpacity
        onPress={onPress}
    >
        <View style={{
            top: -30,
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: '#5669FF'

        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#5669FF',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ],
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <View>
                                <FontAwesome5 name="home" size={24} color={color} style={{ alignSelf: 'center' }} />
                                <Text style={[styles.txt, color = { color }]}>Home</Text>

                            </View>
                        );
                    } else if (route.name === 'Calendar') {
                        return (
                            <View>
                                <FontAwesome5 name="calendar-alt" size={24} color={color} style={{ alignSelf: 'center' }} />
                                <Text style={[styles.txt, color = { color }]}>Calendar</Text>

                            </View>
                        );
                    }
                    else if (route.name === 'CareGiver') {
                        return (

                            <View>
                                <Foundation name="torsos-all-female" size={24} color={color} style={{ alignSelf: 'center' }} />
                                <Text style={[styles.txt, color = { color }]}>Caregiver</Text>

                            </View>

                        );
                    } else if (route.name === 'Options') {
                        return (
                            <View >
                                <FontAwesome5 name="indent" size={24} color={color} style={{ alignSelf: 'center' }} />
                                <Text style={[styles.txt, color = { color }]}>Options</Text>

                            </View>
                        );
                    }
                },
            })}

        >


            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="CareGiver" component={CareGiver} />
            <Tab.Screen name="Calendar" component={Calendar} />
            <Tab.Screen name="Options" component={Options} />
            <Tab.Screen name="AddTask" component={AddTask} options={{ tabBarButton: () => null }} />

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
    },
    txt:
    {


    }

});

export default Tabs;