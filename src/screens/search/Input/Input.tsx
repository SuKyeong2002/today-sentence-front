import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, TextInput, Image, Alert } from 'react-native';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

export default function Input() {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const {t} = useTranslation();

  const handleTextChange = (text: string) => {
    if (!selectedOption) {
      Alert.alert(t('검색 실패'), t('검색 기준을 선택해주세요!')); 
      return;
    }
    setSearchText(text); 
  };

  return (
    <>
      <ContentWrapper>
        <SelectWrapper>
          <SelectContainer>
            <Picker
              selectedValue={selectedOption}
              onValueChange={itemValue => setSelectedOption(itemValue)}
            >
              <Picker.Item label={t('선택')} value="" />
              <Picker.Item label={t('제목')} value="title" />
              <Picker.Item label={t('저자')} value="author" />
              <Picker.Item label={t('태그')} value="tag" />
            </Picker>
          </SelectContainer>

          <SearchContainer>
            <StyledTextInput
              placeholder={t('입력해주세요')}
              value={searchText}
              onChangeText={handleTextChange} 
            />
            <SearchImage
              source={require('@/assets/image/InputSearch.png')}
              resizeMode="contain"
            />
          </SearchContainer>
        </SelectWrapper>
      </ContentWrapper>
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
  background: ${({ theme }) => theme.colors.white};
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
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  padding: 0 10px;
`;

const SearchImage = styled(Image)`
  width: 20px;
  height: 20px;
`;
