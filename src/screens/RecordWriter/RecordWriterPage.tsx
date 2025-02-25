import BackHeader from '@/components/Header/BackHeader';
import CustomModal from '@/components/Modal/CustomModal';
import {useTheme} from '@/context/ThemeContext';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
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
import {Picker} from '@react-native-picker/picker';
import {usePostQuote} from '@/hooks/usePostQuote';

type RootStackParamList = {
  RecordBookList: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'RecordBookList'>;

interface Book {
  title: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  bookPublishingYear?: number;
  isbn?: string;
}

export default function RecordWriter() {
  const route = useRoute();
  const {bookData} = route.params as {bookData: Book};
  const navigation = useNavigation<NavigationProp>();
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const {mutate: saveQuote, isLoading} = usePostQuote();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookTitle, setBookTitle] = useState<string>(bookData.title);
  const [bookAuthor, setBookAuthor] = useState<string>(
    bookData.authors.join(', '),
  );
  const [bookPublisher, setBookPublisher] = useState<string>(
    bookData.publisher,
  );
  const [bookCover, setBookCover] = useState<string>(bookData.thumbnail);
  const [bookPublishingYear, setBookPublishingYear] = useState<number>(
    bookData.bookPublishingYear || new Date().getFullYear(),
  );
  const [isbn, setIsbn] = useState<string>(bookData.isbn || '');
  const [category, setCategory] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const handleSubmit = () => {
    const data = {
      bookTitle,
      bookAuthor,
      bookPublisher,
      bookPublishingYear,
      bookCover,
      isbn,
      category,
      hashtags: hashtags.split(' '),
      content: quote,
    };

    saveQuote(data, {
      onSuccess: () => setModalVisible(true),
    });
  };

  return (
    <>
      <BackHeader searchKeyword={t('기록')} />
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? '#000000' : '#F5F4F5'},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            <Text
              style={[styles.header, {color: isDarkMode ? '#FFF' : '#2B2B2B'}]}>
              {t('오늘의 문장은 무엇인가요?')}
            </Text>

            <View style={styles.formContainer}>
              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 제목
              </Text>
              <TextInput
                style={styles.input}
                value={bookTitle}
                onChangeText={setBookTitle}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                책 저자
              </Text>
              <TextInput
                style={styles.input}
                value={bookAuthor}
                onChangeText={setBookAuthor}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                출판사
              </Text>
              <TextInput
                style={styles.input}
                value={bookPublisher}
                onChangeText={setBookPublisher}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                출판 연도
              </Text>
              <TextInput
                style={styles.input}
                value={bookPublishingYear.toString()}
                onChangeText={text => setBookPublishingYear(Number(text))}
                keyboardType="numeric"
              />

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                ISBN
              </Text>
              <TextInput
                style={styles.input}
                value={isbn}
                onChangeText={setIsbn}
              />

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
                <Picker.Item label="선택해주세요." value="" />
                <Picker.Item label="시/소설/에세이" value="POEM_NOVEL_ESSAY" />
                <Picker.Item label="경제/경영" value="ECONOMY_MANAGEMENT" />
                <Picker.Item label="역사/사회" value="HISTORY_SOCIETY" />
                <Picker.Item
                  label="철학/심리학"
                  value="PHILOSOPHY_PSYCHOLOGY"
                />
                <Picker.Item label="자기계발" value="SELF_DEVELOPMENT" />
                <Picker.Item label="예체능" value="ARTS_PHYSICAL" />
                <Picker.Item label="아동/청소년" value="KID_YOUTH" />
                <Picker.Item label="여행/문화" value="TRAVEL_CULTURE" />
                <Picker.Item label="기타" value="ETC" />
              </Picker>

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                해시태그
              </Text>
              <TextInput
                style={styles.input}
                value={hashtags}
                onChangeText={setHashtags}
                placeholder="원하시는 태그를 입력해주세요"
              />

              <Text
                style={[
                  styles.label,
                  {color: isDarkMode ? '#FFFFFF' : '#000000'},
                ]}>
                명언
              </Text>
              <TextInput
                style={[styles.input, styles.quoteInput]}
                value={quote}
                onChangeText={setQuote}
                placeholder="마음에 드는 명언을 입력해주세요."
                multiline
              />

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {backgroundColor: isDarkMode ? '#2B2B2B' : 'gray'},
                ]}
                onPress={handleSubmit}
                disabled={isLoading}>
                <Text
                  style={[
                    styles.submitButtonText,
                    {color: isDarkMode ? '#FFFFFF' : 'white'},
                  ]}>
                  {isLoading ? '저장 중...' : '저장하기'}
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

// 🔹 스타일
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
    backgroundColor: '#fff',
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
  submitButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
