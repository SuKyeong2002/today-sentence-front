import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '@/context/ThemeContext';
import {useTranslation} from 'react-i18next';

type RootStackParamList = {
  CategoryBookSearch: {category: string; page: number};
};

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategoryBookSearch'
>;

interface Category {
  category: string;
}

const CategoryContent: React.FC<{
  title: string;
  subtitle: string;
  onPress: () => void;
}> = ({title, subtitle, onPress}) => {
  const {isDarkMode, theme} = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <RegistrationTagContainer isDarkMode={isDarkMode}>
        <CategoryImage
          source={
            isDarkMode
              ? require('@/assets/image/dark_categorylist.png')
              : require('@/assets/image/categoryList.png')
          }
          resizeMode="contain"
        />
        <TitleWrapper>
          <TitleText isDarkMode={isDarkMode}>{title}</TitleText>
          <SubTitleText isDarkMode={isDarkMode}>{subtitle}</SubTitleText>
        </TitleWrapper>
      </RegistrationTagContainer>
    </TouchableOpacity>
  );
};

export default function CategoryList() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchedCategories: Category[] = [
      {category: 'POEM_NOVEL_ESSAY'},
      {category: 'ECONOMY_MANAGEMENT'},
      {category: 'HISTORY_SOCIETY'},
      {category: 'PHILOSOPHY_PSYCHOLOGY'},
      {category: 'SELF_DEVELOPMENT'},
      {category: 'ARTS_PHYSICAL'},
      {category: 'KID_YOUTH'},
      {category: 'TRAVEL_CULTURE'},
      {category: 'ETC'},
    ];
    setCategories(fetchedCategories);
  }, []);

  const categoryMap: {[key: string]: string} = {
    POEM_NOVEL_ESSAY: t('시/소설/에세이'),
    ECONOMY_MANAGEMENT: t('경제/경영'),
    HISTORY_SOCIETY: t('역사/사회'),
    PHILOSOPHY_PSYCHOLOGY: t('철학/심리학'),
    SELF_DEVELOPMENT: t('자기계발'),
    ARTS_PHYSICAL: t('예체능'),
    KID_YOUTH: t('아동/청소년'),
    TRAVEL_CULTURE: t('여행/문화'),
    ETC: t('기타'),
  };

  const categoryDescriptions: {[key: string]: string} = {
    POEM_NOVEL_ESSAY: t('감성을 자극하는 문학 작품'),
    ECONOMY_MANAGEMENT: t('비즈니스 성공과 재테크의 모든 것'),
    HISTORY_SOCIETY: t('과거를 통해 배우는 현재와 미래'),
    PHILOSOPHY_PSYCHOLOGY: t('인간과 삶을 깊이 이해하는 학문'),
    SELF_DEVELOPMENT: t('더 나은 나를 위한 성장의 길'),
    ARTS_PHYSICAL: t('예술과 스포츠, 창의력과 열정'),
    KID_YOUTH: t('성장하는 아이들을 위한 조언'),
    TRAVEL_CULTURE: t('세계를 경험하고 문화를 이해하는 시간'),
    ETC: t('다양한 관심사를 위한 특별한 도서'),
  };

  const navigateToPage = (category: string) => {
    const pageNumber = 1;
    navigation.navigate('CategoryBookSearch', {category, page: pageNumber});
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      {categories.map((item, index) => (
        <CategoryContent
          key={index}
          title={categoryMap[item.category] || t('알 수 없음')}
          subtitle={categoryDescriptions[item.category] || t('설명 없음')}
          onPress={() => navigateToPage(item.category)}
        />
      ))}
    </ScrollView>
  );
}

// 스타일
const getFontWeight = (fontFamily: string) => {
  switch (fontFamily) {
    case 'Pretendard-Regular':
      return '700';
    case 'BookendBataanRegular':
    case 'OnggeulipKimkonghae':
    case 'HakgyoansimGeurimilgiTTFR':
    case 'OnggeulipWicelist':
    case 'KyoboHandwriting2020pdy':
      return '600';
    default:
      return 'normal';
  }
};

const RegistrationTagContainer = styled(View)<{isDarkMode: boolean}>`
  width: 90%;
  height: auto;
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  margin: 0px 20px 10px 20px;
  flex-direction: row;
  border-radius: 10px;
  background-color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const CategoryImage = styled(Image)`
  width: 64px;
  height: 64px;
`;

const TitleWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  flex: 1 0 0;
`;

const TitleText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  font-weight: ${({theme}) => getFontWeight(theme.fontFamily)};
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const SubTitleText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.dark};
  font-family: ${({theme}) => theme.fontFamily};
`;
