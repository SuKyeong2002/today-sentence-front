import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// 네비게이션 타입 설정
type RootStackParamList = {
  CategorySearch: {category: string};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CategorySearch'>;

// 백엔드 ENUM과 매칭되는 한글 카테고리 맵핑
const categoryMap: {[key: string]: string} = {
  POEM_NOVEL_ESSAY: '시/소설/에세이',
  ECONOMY_MANAGEMENT: '경제/경영',
  HISTORY_SOCIETY: '역사/사회',
  PHILOSOPHY_PSYCHOLOGY: '철학/심리학',
  SELF_DEVELOPMENT: '자기계발',
  ARTS_PHYSICAL: '예체능',
  KID_YOUTH: '아동/청소년',
  TRAVEL_CULTURE: '여행/문화',
  ETC: '기타',
};

const categoryDescriptions: {[key: string]: string} = {
  POEM_NOVEL_ESSAY: '감성을 자극하는 문학 작품',
  ECONOMY_MANAGEMENT: '비즈니스 성공과 재테크의 모든 것',
  HISTORY_SOCIETY: '과거를 통해 배우는 현재와 미래',
  PHILOSOPHY_PSYCHOLOGY: '인간과 삶을 깊이 이해하는 학문',
  SELF_DEVELOPMENT: '더 나은 나를 위한 성장의 길',
  ARTS_PHYSICAL: '예술과 스포츠, 창의력과 열정',
  KID_YOUTH: '성장하는 아이들을 위한 조언',
  TRAVEL_CULTURE: '세계를 경험하고 문화를 이해하는 시간',
  ETC: '다양한 관심사를 위한 특별한 도서',
};

interface Category {
  category: string;
}

const CategoryContent: React.FC<{title: string; subtitle: string; onPress: () => void}> = ({
  title,
  subtitle,
  onPress,
}) => {
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // API 응답을 가정한 데이터 (백엔드에서 ENUM 값만 넘어옴)
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

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <View>
        {categories.map((item, index) => (
          <CategoryContent
            key={index}
            title={categoryMap[item.category] || '알 수 없음'}
            subtitle={categoryDescriptions[item.category] || '설명 없음'}
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
  margin: 10px 20px 0px 20px;
  flex-direction: row;
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
