import {useTheme} from '@/context/ThemeContext';
import {useSearch} from '@/hooks/useSearch';
import {useTagSearch} from '@/hooks/useTagSearch';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import styled from 'styled-components';

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
    bookCover?: string;
    category?: string;
    thumbnail?: string;
    bookTitle: string;
    bookAuthor?: string;
    hashtags?: string;
    postContent?: string;
    quotes?: string;
    tags?: string;
  };
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function Input({onSearchResultChange}: InputProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const {isDarkMode, theme} = useTheme();

  const searchHook =
    selectedOption === 'tag'
      ? useTagSearch(selectedOption, searchText)
      : useSearch(selectedOption, searchText);

  const {data, refetch, error, isLoading} = searchHook;
  const searchResults = Array.isArray(data) ? data : data?.content || [];

  const [tags, setTags] = useState<string[]>([]);
  console.log(data);

  useEffect(() => {
    if (Array.isArray(data) && JSON.stringify(tags) !== JSON.stringify(data)) {
      setTags(data);
    }
  }, [data]);

  useEffect(() => {
    if (onSearchResultChange) {
      onSearchResultChange(searchResults.length > 0);
    }
  }, [searchResults, onSearchResultChange]);

  const onSearchPress = async () => {
    if (!selectedOption) {
      Alert.alert(t('검색 실패'), t('검색 기준을 선택해주세요!'));
      return;
    }
    if ((searchText?.length ?? 0) === 0) {
      Alert.alert(t('검색 실패'), t('검색어를 입력해주세요!'));
      return;
    }

    console.log('검색 실행:', {type: selectedOption, search: searchText});

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
          <SelectContainer isDarkMode={isDarkMode}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={itemValue => setSelectedOption(itemValue)}
              style={{
                color: isDarkMode ? '#FFFFFF' : '#2B2B2B',
              }}
              dropdownIconColor={isDarkMode ? '#FFFFFF' : '#2B2B2B'}>
              <Picker.Item
                style={{fontFamily: theme.fontFamily}}
                label={t('선택')}
                value=""
              />
              <Picker.Item
                style={{fontFamily: theme.fontFamily}}
                label={t('제목')}
                value="title"
              />
              <Picker.Item
                style={{fontFamily: theme.fontFamily}}
                label={t('저자')}
                value="author"
              />
              <Picker.Item
                style={{fontFamily: theme.fontFamily}}
                label={t('태그')}
                value="tag"
              />
            </Picker>
          </SelectContainer>

          <SearchContainer isDarkMode={isDarkMode}>
            <StyledTextInput
              placeholder={t('입력해주세요')}
              value={searchText}
              onChangeText={setSearchText}
              isDarkMode={isDarkMode}
              placeholderTextColor={isDarkMode ? '#FFFFFF' : '#2B2B2B'}
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

      {selectedOption === 'tag' && tags?.length > 0 && (
        <TagListContainer>
          {tags.map((tag, index) => (
            <ScrollContainer
              key={index}
              isTitleOrAuthor={false}
              isTagSearch={true}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BookSearch', {tag})}>
                <BookWrapper isDarkMode={isDarkMode}>
                  <BookTag isDarkMode={isDarkMode}>#{tag}</BookTag>
                </BookWrapper>
              </TouchableOpacity>
            </ScrollContainer>
          ))}
        </TagListContainer>
      )}

      {isLoading && <ActivityIndicator size="large" color="gray" />}
      {!isLoading && searchResults.length > 0 && selectedOption !== 'tag' ? (
        <ScrollContainer
          isTitleOrAuthor={
            selectedOption === 'title' || selectedOption === 'author'
          }
          isTagSearch={false}>
          <ResultContainer isDarkMode={isDarkMode}>
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
                  tag?: string;
                },
                index: number,
              ) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('BookSearch', {
                      category: item.category,
                      bookCover: item.bookCover,
                      bookTitle: item.bookTitle,
                      bookAuthor: item.bookAuthor,
                      hashtags: item.hashtags,
                      postContent: item.postContent,
                      quotes: searchResults,
                    })
                  }>
                  <BookItem key={index}>
                    <BookWrapper isDarkMode={isDarkMode}>
                      {(selectedOption === 'title' ||
                        selectedOption === 'author') && (
                        <BookImage
                          source={{
                            uri:
                              item.bookCover ||
                              'https://via.placeholder.com/150',
                          }}
                        />
                      )}
                      <BookInfo>
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookTitle isDarkMode={isDarkMode}>
                            {highlightMatchedText(item.bookTitle, searchText)}
                          </BookTitle>
                        )}
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookAuthor isDarkMode={isDarkMode}>
                            {highlightMatchedText(
                              item.bookAuthor || '',
                              searchText,
                            )}
                          </BookAuthor>
                        )}
                        {(selectedOption === 'title' ||
                          selectedOption === 'author') && (
                          <BookPublisherContainer>
                            <BookPublisher isDarkMode={isDarkMode}>
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

const TagListContainer = styled(View)`
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
`;

const ScrollContainer = styled(ScrollView)<{
  isTitleOrAuthor: boolean;
  isTagSearch: boolean;
}>`
  margin: 0 20px 10px 20px;
  align-self: ${({isTitleOrAuthor}) =>
    isTitleOrAuthor ? 'center' : 'flex-end'};
  width: ${({isTitleOrAuthor}) => (isTitleOrAuthor ? '90%' : '57%')};
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

const SelectContainer = styled(View)<{isDarkMode: boolean}>`
  display: flex;
  width: 35%;
  height: 45px;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid
    ${({isDarkMode, theme}) => (isDarkMode ? theme.colors.text : '#ededed')};
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;

const SearchContainer = styled(View)<{isDarkMode: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  height: 45px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid
    ${({isDarkMode, theme}) => (isDarkMode ? theme.colors.text : '#ededed')};
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const StyledTextInput = styled(TextInput)<{isDarkMode: boolean; theme: any}>`
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  height: 100%;
  padding: 0 10px;
  font-family: ${({theme}) => theme.fontFamily};
`;

const SearchImage = styled(Image)`
  width: 20px;
  height: 20px;
`;

const ResultContainer = styled(View)<{isDarkMode: boolean; theme: any}>`
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? '#000000' : theme.colors.background};
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

const BookWrapper = styled(View)<{isDarkMode: boolean}>`
  margin-top: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const BookTagsContainer = styled(View)`
  flex-direction: column;
  justify-content: flex-start;
`;

const BookTag = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const BookTitle = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.medium}px;
  font-weight: 600;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
`;

const BookAuthor = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-weight: 400;
  font-family: ${({theme}) => theme.fontFamily};
`;

const BookPublisherContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

const BookPublisher = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.lightGray : theme.colors.darkGray};
  font-weight: 400;
  font-family: ${({theme}) => theme.fontFamily};
`;

// 검색 결과 관련
const NoResultText = styled(Text)<{theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  text-align: center;
  margin: 10px;
  font-family: ${({theme}) => theme.fontFamily};
`;

const ErrorText = styled(Text)<{theme: any}>`
  font-size: 14px;
  color: red;
  text-align: center;
  margin-top: 10px;
  font-family: ${({theme}) => theme.fontFamily};
`;

const HighlightedText = styled(Text)<{theme: any}>`
  color: ${({theme}) => theme.colors.green};
  font-weight: bold;
  font-family: ${({theme}) => theme.fontFamily};
`;

const NormalText = styled(Text)<{theme: any}>`
  font-family: ${({theme}) => theme.fontFamily};
`;
