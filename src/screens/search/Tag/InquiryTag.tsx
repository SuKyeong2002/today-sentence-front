import { useTheme } from "@/context/ThemeContext";
import { useFamousTags } from "@/hooks/useFamousTags";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import styled from "styled-components";
import LottieView from "lottie-react-native";

type RootStackParamList = {
  BookSearch: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "BookSearch">;

export default function InquiryTag() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const { data, error } = useFamousTags();
  const { isDarkMode, theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  if (error) return <Text>{t("태그를 불러오지 못했습니다")}</Text>;
  if (!data) return <Text>{t("태그 데이터가 없습니다")}</Text>;

  const searchTags: string[] = (data.search || []).slice(0, 6);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flexContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.flexContainer}>
          <View style={styles.contentContainer}>
            {isLoading && (
              <View style={styles.loadingContainer}>
                <LottieView
                  source={require("@/assets/animation/loading_search.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            )}
            <RegistrationTagContainer isDarkMode={isDarkMode}>
              <RegistrationText isDarkMode={isDarkMode}>
                🤎 {t("인기 조회 태그")}
              </RegistrationText>
              <TagContainer>
                <TagWrapper>
                  {searchTags.map((tag: string, index: number) => (
                    <TagText key={index} onPress={() => navigation.navigate("BookSearch", { tag })}>
                      <TagTextLabel>{tag.length > 3 ? `${tag.substring(0, 3)}...` : tag}</TagTextLabel>
                    </TagText>
                  ))}
                </TagWrapper>
              </TagContainer>
            </RegistrationTagContainer>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// 스타일 정리
const getFontWeight = (fontFamily: string) => {
  switch (fontFamily) {
    case "Pretendard-Regular":
      return "700";
    case "BookendBataanRegular":
    case "OnggeulipKimkonghae":
    case "HakgyoansimGeurimilgiTTFR":
    case "OnggeulipWicelist":
    case "KyoboHandwriting2020pdy":
      return "600";
    default:
      return "normal";
  }
};

const RegistrationTagContainer = styled(View)<{ isDarkMode: boolean }>`
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 20px;
  flex-direction: column;
  background: ${({ isDarkMode, theme }) => (isDarkMode ? theme.colors.text : theme.colors.white)};
  gap: 20px;
`;

const RegistrationText = styled(Text)<{ isDarkMode: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: ${({ theme }) => getFontWeight(theme.fontFamily)};
  color: ${({ isDarkMode, theme }) => (isDarkMode ? theme.colors.white : theme.colors.text)};
  font-family: ${({ theme }) => theme.fontFamily};
`;

const TagContainer = styled(View)`
  width: 100%;
`;

const TagWrapper = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const TagText = styled(TouchableOpacity)`
  width: 30%;
  height: 40px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.background};
`;

const TagTextLabel = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: ${({ theme }) => getFontWeight(theme.fontFamily)};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily};
`;

// 일반 스타일 적용
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
