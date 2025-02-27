import BackHeader from '@/components/Header/BackHeader';
import { useTheme } from '@/context/ThemeContext';
import { useCategorySearch } from '@/hooks/useCategorySearch';
import { RouteProp } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Switch, Text, View } from 'react-native';
import styled from 'styled-components';
import SearchContent2 from './content/SearchContent2';

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
  const {t} = useTranslation();
  const {category} = route.params;
  const {isDarkMode} = useTheme();
  const [sortByLatest, setSortByLatest] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);

  const size = 4;
  const sortBy = sortByLatest ? 'create_at' : 'like_count';

  const {data, isLoading, fetchNextPage, hasNextPage} = useCategorySearch(
    category,
    size,
    sortBy,
  );

  const handleSwitchToggle = () => {
    if (isSwitchDisabled) {
      return;
    }

    setIsSwitchDisabled(true);
    setSortByLatest(prev => !prev);

    setTimeout(() => setIsSwitchDisabled(false), 1300);
  };

  const combinedPosts = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap(page =>
      (page.posts || []).map((post: any, index: string | number) => ({
        ...post,
        interaction: (page.interaction || [])[index] || {
          isLiked: false,
          isSaved: false,
        },
      })),
    );
  }, [data]);

  return (
    <Container
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : 'background'}}>
      <BackHeader
        searchKeyword={t('검색')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ToggleContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Switch
            value={sortByLatest}
            onValueChange={handleSwitchToggle}
            disabled={isSwitchDisabled}
            trackColor={{false: '#D3D3D3', true: '#8A715D'}}
            thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
          />
          <ToggleText isDarkMode={isDarkMode}>{sortByLatest ? t('최신순') : t('공감순')}</ToggleText>
        </View>
      </ToggleContainer>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : combinedPosts.length > 0 ? (
        <FlatList
          data={combinedPosts}
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
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
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