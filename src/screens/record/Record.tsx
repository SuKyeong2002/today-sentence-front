import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";

import RecordContent from "@/components/Record/RecordContent";
import SavedContent from "@/components/Record/SavedContent";
import StatsContent from "@/components/Record/StatusContent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

const Tab = createMaterialTopTabNavigator();

// 탭 네비게이션만 담당하는 컴포넌트
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="기록" component={RecordContent} options={{ tabBarLabel: "기록" }} />
      <Tab.Screen name="저장" component={SavedContent} options={{ tabBarLabel: "저장" }} />
      <Tab.Screen name="통계" component={StatsContent} options={{ tabBarLabel: "통계" }} />
    </Tab.Navigator>
  );
}

// 메인 스크린 컴포넌트
export default function RecordScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <TabNavigator />
      </View>
      <Footer />
    </View>
  );
}