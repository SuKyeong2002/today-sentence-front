import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useSearch} from '@/hooks/useSearch';

export default function Input() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const {t} = useTranslation();
  const {data, refetch, error} = useSearch(selectedOption, searchText);

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

  const highlightMatchedText = (text: string) => {
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

      {data && (
        <ResultContainer>
          {data?.content?.length > 0 ? (
            data.content.map(
              (
                book: {
                  bookCover: string;
                  bookTitle: string;
                  bookAuthor: string;
                },
                index: number,
              ) => (
                <BookItem key={index}>
                  <BookImage source={{uri: book.bookCover}} />
                  <BookInfo>
                    <BookTitle>{highlightMatchedText(book.bookTitle)}</BookTitle>
                    <BookAuthor>{highlightMatchedText(book.bookAuthor)}</BookAuthor>
                  </BookInfo>
                </BookItem>
              ),
            )
          ) : (
            <NoResultText>{t('검색 결과가 없습니다.')}</NoResultText>
          )}
        </ResultContainer>
      )}
    </>
  );
}

const ContentWrapper = styled(View)`
  display: flex;
  width: 350px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin: 0 14px;
`;

const SelectWrapper = styled(View)`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-direction: row;
  gap: 6px;
  width: 100%;
`;

const SelectContainer = styled(View)`
  display: flex;
  width: 30%;
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
  width: 70%;
  height: 45px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #ededed;
  background: #fff;
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
  padding: 10px;
`;

const BookItem = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const BookImage = styled(Image)`
  width: 50px;
  height: 70px;
  margin-right: 10px;
`;

const BookInfo = styled(View)`
  flex-direction: column;
`;

const BookTitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
`;

const BookAuthor = styled(Text)`
  font-size: 14px;
  color: gray;
`;

const NoResultText = styled(Text)`
  font-size: 14px;
  color: gray;
  text-align: center;
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

const NormalText = styled(Text)`
  color: black;
`;
