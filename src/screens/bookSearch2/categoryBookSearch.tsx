import React, {useState, useMemo, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Text, Switch} from 'react-native';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import SearchContent2 from './content/SearchContent2';
import {RouteProp} from '@react-navigation/native';
import {useCategorySearch} from '@/hooks/useCategorySearch';
import {useTheme} from '@/context/ThemeContext';
import {useTranslation} from 'react-i18next';

interface Post {
  postId: number;
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  bookPublisher: string;
  bookPublishingYear: number;
  postContent: string;
  hashtags: string;
  likesCount: number;
  commentCount: number;
  createAt: string;
}

type RootStackParamList = {
  CategoryBookSearch: {category: string};
};

interface Props {
  route: RouteProp<RootStackParamList, 'CategoryBookSearch'>;
}

export default function CategoryBookSearch({route}: Props) {
  const {category} = route.params;
  const {data, isLoading} = useCategorySearch(category);
  const [sortByLatest, setSortByLatest] = useState(false);
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();

  const posts = data?.posts;
  const interaction = data?.interaction;

  const combinedPosts = useMemo(() => {
    if (!posts || !interaction) {
      return [];
    }

    return posts.map((post, index) => ({
      ...post,
      interaction: interaction[index] || {isLiked: false, isSaved: false},
    }));
  }, [posts, interaction]);

  const sortedPosts = useMemo(() => {
    if (!combinedPosts.length) {
      return [];
    }

    return [...combinedPosts].sort((a, b) => {
      if (sortByLatest) {
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
      } else {
        return b.likesCount - a.likesCount;
      }
    });
  }, [combinedPosts, sortByLatest]);

  return (
    <Container
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <BackHeader
        searchKeyword={t('검색')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ToggleContainer>
        <Switch
          value={sortByLatest}
          onValueChange={() => setSortByLatest(prev => !prev)}
          trackColor={{
            false: '#D3D3D3',
            true: isDarkMode ? '#8A715D' : '#8A715D',
          }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
        />
        <ToggleText isDarkMode={isDarkMode}>{t('최신순')}</ToggleText>
      </ToggleContainer>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sortedPosts.length > 0 ? (
        <FlatList
          data={sortedPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <BooklistWrapper>
              <SearchContent2
                post={item}
                interaction={item.interaction}
                sortByLatest={false}
              />
            </BooklistWrapper>
          )}
        />
      ) : (
        <NoDataText>검색 결과가 없습니다.</NoDataText>
      )}
    </Container>
  );
}

// 스타일 정의
const Container = styled(View)`
  flex: 1;
`;

const ToggleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 20px;
`;

const ToggleText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: 16px;
  margin-left: 10px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const BooklistWrapper = styled(View)`
  margin: 10px 0;
`;

const NoDataText = styled(Text)`
  text-align: center;
  font-size: 18px;
  color: gray;
  margin-top: 20px;
`;
