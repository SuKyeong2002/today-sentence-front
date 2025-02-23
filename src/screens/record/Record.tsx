import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecordContent from "@/components/Record/RecordContent";  
import SavedContent from "@/components/Record/SavedContent";   
import StatsContent from "@/components/Record/StatusContent";    
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

const Tab = createMaterialTopTabNavigator();

export default function Record({ navigation }: { navigation: any }) {
  return (
    <>
      <Header/>
      <Tab.Navigator
        initialRouteName="기록"
        screenOptions={{
          tabBarActiveTintColor: '#050953',
          tabBarLabelStyle: { fontSize: 14, color: '#050953' },
          tabBarStyle: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen
          name="기록"
          component={RecordContent}
          options={{ tabBarLabel: '기록' }}
        />
        <Tab.Screen
          name="저장"
          component={SavedContent}
          options={{ tabBarLabel: '저장' }}
        />
        <Tab.Screen
          name="통계"
          component={StatsContent}
          options={{ tabBarLabel: '통계' }}
        />
      </Tab.Navigator>
      <Footer />
    </>
  );
}
