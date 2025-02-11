import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Text, Image} from 'react-native';

type RootStackParamList = {
  CategorySearch: {category: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CategorySearch'>;

const categoryKeys = [
  'POEM_NOVEL_ESSAY',
  'ECONOMY_MANAGEMENT',
  'HISTORY_SOCIETY',
  'PHILOSOPHY_PSYCHOLOGY',
  'SELF_DEVELOPMENT',
  'ARTS_PHYSICAL',
  'KID_YOUTH',
  'TRAVEL_CULTURE',
  'ETC',
];

interface Category {
  category: string;
}

const CategoryContent: React.FC<{
  title: string;
  subtitle: string;
  onPress: () => void;
}> = ({title, subtitle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RegistrationTagContainer>
        <CategoryImage
          source={require('@/assets/image/categoryList.png')}
          resizeMode="contain"
        />
        <TitleWrapper>
          <TitleText>{title}</TitleText>
          <SubTitleText>{subtitle}</SubTitleText>
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
    // API 응답을 가정한 데이터 (백엔드에서 ENUM 값만 넘어옴)
    const fetchedCategories: Category[] = categoryKeys.map(category => ({
      category,
    }));
    setCategories(fetchedCategories);
  }, []);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <View>
        {categories.map((item, index) => (
          <CategoryContent
            key={index}
            title={t(`category.${item.category}`)} // i18n 사용
            subtitle={t(`categoryDesc.${item.category}`)} // 설명도 다국어 적용
            onPress={() => navigation.navigate('CategorySearch', {category: item.category})}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const RegistrationTagContainer = styled(View)`
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
  background: ${({theme}) => theme.colors.white};
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

const TitleText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

const SubTitleText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.lightGray};
`;
