import BackHeader from '@/components/Header/BackHeader';
import CustomModal from '@/components/Modal/CustomModal';
import { useTheme } from '@/context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSaveQuote } from '../../hooks/useSaveQuote';
import { QuoteData } from '../../types/QuoteData';

type RootStackParamList = {
  RecordBookList: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'RecordBookList'>;

export default function RecordWriter() {
  const [category, setCategory] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>(''); // 책 제목
  const [bookAuthor, setBookAuthor] = useState<string>(''); // 책 저자
  const [bookPublisher, setBookPublisher] = useState<string>(''); // 책 출판사
  const [bookPublishingYear, setBookPublishingYear] = useState<string>(''); // 책 출판 연도
  const [bookCover, setBookCover] = useState<string>(''); // 책 표지 URL
  const [isbn, setIsbn] = useState<string>(''); // ISBN
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {isSaving, error, handleSaveQuote} = useSaveQuote();
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = async () => {
    const data: QuoteData = {
      bookTitle,
      bookAuthor,
      bookPublisher,
      bookPublishingYear: parseInt(bookPublishingYear, 10),
      bookCover,
      isbn,
      category,
      hashtags: hashtags.split(' '),
      content: quote,
    };

    try {
      await handleSaveQuote(data);
      setModalVisible(true);
    } catch (err) {
      Alert.alert('오류', '저장 중 문제가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? '#000000' : '#F5F4F5',
            borderColor: isDarkMode ? '#2B2B2B' : '#FFF',
          },
        ]}>
        {/* 키보드가 열릴 때 자동 조정 (iOS 전용) */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <Text
              style={[
                styles.header,
                {
                  color: isDarkMode ? '#FFF' : '#2B2B2B',
                },
              ]}>
              오늘의 문장은 무엇인가요?
            </Text>

            <View style={styles.formContainer}>
              {/* <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 제목
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={bookTitle}
                onChangeText={setBookTitle}
                placeholder="책 제목을 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
              />
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 저자
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={bookAuthor}
                onChangeText={setBookAuthor}
                placeholder="책 저자를 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
              />
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 출판사
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={bookPublisher}
                onChangeText={setBookPublisher}
                placeholder="책 출판사를 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
              />
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 출판년도
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={bookPublishingYear}
                onChangeText={setBookPublishingYear}
                placeholder="책 출판년도를 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
                keyboardType="numeric"
              />
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 표지 URL
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={bookCover}
                onChangeText={setBookCover}
                placeholder="책 표지 URL를 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
              />
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                ISBN
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={isbn}
                onChangeText={setIsbn}
                placeholder="책 ISBN을 입력해주세요"
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
                keyboardType="numeric"
              /> */}
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                카테고리
              </Text>
              <Picker
                selectedValue={category}
                onValueChange={itemValue => setCategory(itemValue)}
                style={[
                  styles.picker,
                  {backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF'},
                ]}>
                <Picker.Item
                  label="선택해주세요."
                  value=""
                  style={{color: isDarkMode ? '#AAAAAA' : '#000000'}}
                />
                <Picker.Item label="책" value="book" />
                <Picker.Item label="영화" value="movie" />
                <Picker.Item label="음악" value="music" />
              </Picker>

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                해시태그
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={hashtags}
                onChangeText={setHashtags}
                placeholder="명언과 관련된 내용을 해시태그로 남겨보세요."
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
                maxLength={300}
              />

              <Text
                style={[
                  styles.charCount,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                {hashtags.length}/20자
              </Text>
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                명언
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.quoteInput,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                    borderColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                  },
                ]}
                value={quote}
                onChangeText={setQuote}
                placeholder="책 속 명언을 입력해주세요."
                placeholderTextColor={isDarkMode ? '#AAAAAA' : '#666666'}
                multiline
              />
              <Text
                style={[
                  styles.charCount,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                {hashtags.length}/400자
              </Text>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : 'gray',
                    borderColor: isDarkMode ? '#2B2B2B' : 'gray',
                  },
                ]}
                onPress={handleSubmit}
                disabled={isSaving}>
                <Text
                  style={[
                    styles.submitButtonText,
                    {color: isDarkMode ? '#FFFFFF' : 'white'},
                  ]}>
                  {isSaving ? '저장 중...' : '저장하기'}
                </Text>
              </TouchableOpacity>
              <CustomModal
                visible={modalVisible}
                title={t('기록 성공')}
                message={t('달별로 기록한 명언을 확인해보세요.')}
                rightButton={t('확인')}
                onConfirm={() => {
                  setModalVisible(false);
                  navigation.navigate('RecordBookList');
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  quoteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  charCount: {
    textAlign: 'right',
    color: '#666',
    marginTop: 4,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
