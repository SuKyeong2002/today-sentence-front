import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useSearch} from '@/hooks/useSearch';
import {useTagSearch} from '@/hooks/useTagSearch';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {KAKAO_API_KEY} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const categoryMap: Record<string, string> = {
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

const reverseCategoryMap = Object.fromEntries(
  Object.entries(categoryMap).map(([key, value]) => [value, key]),
);

interface InputProps {
  onSearchResultChange?: (hasResults: boolean) => void;
}

type RootStackParamList = {
  BookSearch: {
    category?: string;
    thumbnail?: string;
    bookTitle: string;
    bookAuthor?: string;
    hashtags?: string;
    postContent?: string;
    quotes?: string;
  };
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function Input({onSearchResultChange}: InputProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const mappedSearchText =
    selectedOption === 'category'
      ? reverseCategoryMap[searchText] || searchText
      : searchText;

  const searchHook =
    selectedOption === 'tag' || selectedOption === 'category'
      ? useTagSearch(selectedOption, mappedSearchText)
      : useSearch(selectedOption, searchText);

  const {data, refetch, error, isLoading} = searchHook;
  const searchResults = Array.isArray(data) ? data : data?.content || [];

  useEffect(() => {
    if (onSearchResultChange) {
      onSearchResultChange(searchResults.length > 0);
    }
  }, [searchResults, onSearchResultChange]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const newThumbnails: Record<string, string> = {};
      for (const item of searchResults) {
        try {
          const response = await axios.get(
            `https://dapi.kakao.com/v3/search/book?query=${item.bookTitle}`,
            {
              headers: {Authorization: `KakaoAK ${KAKAO_API_KEY}`},
            },
          );
          const thumbnailUrl = response.data.documents?.[0]?.thumbnail || '';
          newThumbnails[item.bookTitle] = thumbnailUrl;
        } catch (error) {
          console.error('Failed to fetch thumbnail:', error);
        }
      }
      setThumbnails(newThumbnails);
    };

    if (searchResults.length > 0) {
      fetchThumbnails();
    }
  }, [searchResults]);

  const onSearchPress = async () => {
    if (!selectedOption) {
      Alert.alert(t('검색 실패'), t('검색 기준을 선택해주세요!'));
      return;
    }
    if ((searchText?.length ?? 0) === 0) {
      Alert.alert(t('검색 실패'), t('검색어를 입력해주세요!'));
      return;
    }

    console.log('검색 실행:', {type: selectedOption, search: mappedSearchText});

    try {
      await refetch();
    } catch (err) {
      console.error('검색 API 호출 실패:', err);
    }
  };

  const highlightMatchedText = (text: string, searchText: string) => {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        <NormalText key={index}>{part}</NormalText>
      ),
    );
  };

  return (
    <>
      <ContentWrapper>
        <SelectWrapper>
          <SelectContainer>
            <Picker
              selectedValue={selectedOption}
              onValueChange={itemValue => setSelectedOption(itemValue)}>
              <Picker.Item label={t('선택')} value="" />
              <Picker.Item label={t('제목')} value="title" />
              <Picker.Item label={t('저자')} value="author" />
              <Picker.Item label={t('태그')} value="tag" />
              <Picker.Item label={t('카테고리')} value="category" />
            </Picker>
          </SelectContainer>

          <SearchContainer>
            <StyledTextInput
              placeholder={t('입력해주세요')}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={onSearchPress}>
              <SearchImage
                source={require('@/assets/image/InputSearch.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </SearchContainer>
        </SelectWrapper>
      </ContentWrapper>

      {error && (
        <ErrorText>{t('검색에 실패했습니다. 다시 시도해주세요.')}</ErrorText>
      )}

      {isLoading && <ActivityIndicator size="large" color="gray" />}

      {!isLoading && searchResults.length > 0 ? (
        <ScrollContainer isTitleOrAuthor={selectedOption === "title" || selectedOption === "author"}>
          <ResultContainer>
            {searchResults.map(
              (
                item: {
                  bookTitle: string;
                  bookAuthor?: string;
                  bookCover?: string;
                  bookPublisher?: string;
                  bookPublishingYear?: number;
                  hashtags?: string;
                  category?: string;
                  postContent?: string;
                  quotes?: string;
                },
                index: number,
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('BookSearch', {
                      category: item.category,
                      thumbnail: thumbnails[item.bookTitle],
                      bookTitle: item.bookTitle,
                      bookAuthor: item.bookAuthor,
                      hashtags: item.hashtags,
                      postContent: item.postContent,
                      quotes: searchResults,
                    })
                  }>
                  <BookItem key={index}>
                    <BookWrapper>
                      {(selectedOption === 'title' ||
                        selectedOption === 'author') && (
                        <BookImage
                          source={{
                            uri:
                              thumbnails[item.bookTitle] ||
                              'https://via.placeholder.com/150',
                          }}
                        />
                      )}
                      <BookInfo>
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookTitle>
                            {highlightMatchedText(item.bookTitle, searchText)}
                          </BookTitle>
                        )}
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookAuthor>
                            {highlightMatchedText(
                              item.bookAuthor || '',
                              searchText,
                            )}
                          </BookAuthor>
                        )}
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookPublisherContainer>
                            <BookPublisher>
                              {highlightMatchedText(
                                item.bookPublisher || '',
                                searchText,
                              )}
                              /{' '}
                              {highlightMatchedText(
                                String(item.bookPublishingYear || ''),
                                searchText,
                              )}
                            </BookPublisher>
                          </BookPublisherContainer>
                        )}
                        {selectedOption === 'tag' && (
                          <BookTags>
                            {highlightMatchedText(
                              item.hashtags || '',
                              searchText,
                            )}
                          </BookTags>
                        )}
                        {selectedOption === 'category' && item.category && (
                          <BookTags>
                            {highlightMatchedText(
                              categoryMap[item.category] || item.category,
                              searchText,
                            )}
                          </BookTags>
                        )}
                      </BookInfo>
                    </BookWrapper>
                  </BookItem>
                </TouchableOpacity>
              ),
            )}
          </ResultContainer>
        </ScrollContainer>
      ) : (
        !isLoading
      )}
    </>
  );
}

const ScrollContainer = styled(ScrollView)<{ isTitleOrAuthor: boolean }>`
  margin: 0 20px 10px 20px;
  align-self: ${({ isTitleOrAuthor }) => (isTitleOrAuthor ? "center" : "flex-end")};
  width: ${({ isTitleOrAuthor }) => (isTitleOrAuthor ? "90%" : "57%")};
`;

const ContentWrapper = styled(View)`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 0 16px;
`;

const SelectWrapper = styled(View)`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-direction: row;
  gap: 6px;
`;

const SelectContainer = styled(View)`
  display: flex;
  width: 35%;
  height: 45px;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #ededed;
  background: ${({theme}) => theme.colors.white};
`;

const SearchContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  height: 45px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #ededed;
  background: ${({theme}) => theme.colors.white};
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  color: ${({theme}) => theme.colors.text};
  height: 100%;
  padding: 0 10px;
`;

const SearchImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

const ResultContainer = styled(View)`
  background: ${({theme}) => theme.colors.background};
`;

// 책 관련
const BookItem = styled(View)``;

const BookImage = styled(Image)`
  width: 90px;
  height: 130px;
  margin-right: 32px;
  border-radius: 10px;
`;

const BookInfo = styled(View)`
  flex-direction: column;
  gap: 5px;
`;

const BookWrapper = styled(View)`
  margin-top: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: ${({theme}) => theme.colors.white};
`;

const BookTags = styled(Text)`
  font-size: 12px;
`;

const BookTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  font-weight: 600;
`;

const BookAuthor = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({theme}) => theme.colors.text};
  font-weight: 400;
`;

const BookPublisherContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

const BookPublisher = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  color: ${({theme}) => theme.colors.darkGray};
  font-weight: 400;
`;

// 검색 결과 관련
const NoResultText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  text-align: center;
  margin: 10px;
`;

const ErrorText = styled(Text)`
  font-size: 14px;
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const HighlightedText = styled(Text)`
  color: ${({theme}) => theme.colors.green};
  font-weight: bold;
`;

const NormalText = styled(Text)``;
