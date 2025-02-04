import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//import HomeScreen from './HomeScreen';
import RecordScreen from '../screens/main/RecordPage';
//import SearchScreen from './SearchScreen';
//import ChatScreen from './ChatScreen';
//import MyScreen from './MyScreen';

const Tab = createBottomTabNavigator();

export default function Footer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = require('../assets/image/home.png');
                                break;
                            case 'Record':
                                iconName = require('../assets/image/record.png');
                                break;
                            case 'Search':
                                iconName = require('../assets/image/search.png');
                                break;
                            case 'Chat':
                                iconName = require('../assets/image/messages.png');
                                break;
                            case 'My':
                                iconName = require('../assets/image/user.png');
                                break;
                        }

                        return <Image source={iconName} style={styles.logoImage} />;
                    },
                    tabBarLabel: ({ focused }) => {
                        let label;

                        switch (route.name) {
                            case 'Home':
                                label = 'Home';
                                break;
                            case 'Record':
                                label = 'Record';
                                break;
                            case 'Search':
                                label = 'Search';
                                break;
                            case 'Chat':
                                label = 'Chat';
                                break;
                            case 'My':
                                label = 'My';
                                break;
                        }

                        return <Text style={styles.label}>{label}</Text>;
                    },
                })}
            >
                {/*<Tab.Screen name="Home" component={HomeScreen} />*/}
                <Tab.Screen name="Record" component={RecordScreen} />
                {/*<Tab.Screen name="Search" component={SearchScreen} />*/}
                {/*<Tab.Screen name="Chat" component={ChatScreen} />*/}
                {/*<Tab.Screen name="My" component={MyScreen} />*/}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: "gray",
        marginTop: 2,
    },
    logoImage: {
        width: 24,
        height: 24,
    },
});
