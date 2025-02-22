import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useFamousTags} from '@/hooks/useFamousTags';

type RootStackParamList = {
  BookSearch: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookSearch'>;

export default function InquiryTag() {
  const navigation = useNavigation<NavigationProp>();
  const {t} = useTranslation();
  const {data, isLoading, error} = useFamousTags();

  if (isLoading) return <Text>{t('로딩 중...')}</Text>;
  if (error) return <Text>{t('태그를 불러오지 못했습니다')}</Text>;
  if (!data) return <Text>{t('태그 데이터가 없습니다')}</Text>;

  // 최대 6개 태그만 표시
  const searchTags: string[] = (data.search || []).slice(0, 6);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <RegistrationTagContainer>
              <RegistrationText>🤎 {t('인기 조회 태그')}</RegistrationText>
              <TagContainer>
                <TagWrapper>
                  {searchTags.map((tag: string, index: number) => (
                    <TagText
                      key={index}
                      onPress={() => navigation.navigate('BookSearch')}>
                      <TagTextLabel>
                        {tag.length > 3 ? `${tag.substring(0, 3)}...` : tag}
                      </TagTextLabel>
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

const RegistrationTagContainer = styled(View)`
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 20px;
  flex-direction: column;
  background: ${({theme}) => theme.colors.white};
  gap: 20px;
`;

const RegistrationText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
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
  background: ${({theme}) => theme.colors.background};
`;

const TagTextLabel = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;
