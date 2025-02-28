import React, {useState} from 'react';
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
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@/context/ThemeContext';
import {usePostQuote} from '@/hooks/usePostQuote';
import BackHeader from '@/components/Header/BackHeader';
import CustomModal from '@/components/Modal/CustomModal';
import { QueryClient, useQueryClient } from 'react-query';

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
  const {isDarkMode, theme} = useTheme();
  const {t} = useTranslation();
  const {mutate: saveQuote, isLoading} = usePostQuote();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [bookTitle] = useState<string>(bookData.title);
  const [bookAuthor] = useState<string>(bookData.authors.join(', '));
  const [bookPublisher] = useState<string>(bookData.publisher);
  const [bookCover] = useState<string>(bookData.thumbnail);
  const [bookPublishingYear, setBookPublishingYear] = useState<number>(
    bookData.bookPublishingYear || new Date().getFullYear(),
  );
  const [isbn, setIsbn] = useState<string>(bookData.isbn || '');
  const [category, setCategory] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const queryClient = useQueryClient();

  const isFormComplete =
    category !== '' && hashtags.trim() !== '' && quote.trim() !== '';

  const handleSubmit = () => {
    if (!isFormComplete) return;

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
      onSuccess: () => {
        queryClient.invalidateQueries(['recordBookList']); 
        queryClient.refetchQueries(['recordBookList']); 
        setModalVisible(true);
      },
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
              style={[
                styles.header,
                {
                  color: isDarkMode ? '#FFF' : '#2B2B2B',
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {t('오늘의 문장은 무엇인가요?')}
            </Text>

            <View style={styles.formContainer}>
              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('책 제목')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={bookTitle}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('책 저자')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={bookAuthor}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('출판사')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={bookPublisher}
                editable={false}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('출판년도')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={bookPublishingYear.toString()}
                onChangeText={text => setBookPublishingYear(Number(text))}
                keyboardType="numeric"
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {'ISBN'}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={isbn}
                onChangeText={setIsbn}
              />

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('카테고리')}
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={itemValue => setCategory(itemValue)}
                  style={[
                    styles.picker,
                    {backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF'},
                  ]}>
                  <Picker.Item
                    label={t('명언의 종류를 선택해주세요.')}
                    value="select"
                    style={{
                      color: isDarkMode ? 'gray' : 'gray',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('시/소설/에세이')}
                    value="POEM_NOVEL_ESSAY"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('경제/경영')}
                    value="ECONOMY_MANAGEMENT"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('역사/사회')}
                    value="HISTORY_SOCIETY"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('철학/심리학')}
                    value="PHILOSOPHY_PSYCHOLOGY"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('자기계발')}
                    value="SELF_DEVELOPMENT"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('예체능')}
                    value="ARTS_PHYSICAL"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('아동/청소년')}
                    value="KID_YOUTH"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('여행/문화')}
                    value="TRAVEL_CULTURE"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                  <Picker.Item
                    label={t('기타')}
                    value="ETC"
                    style={{
                      color: isDarkMode ? 'gray' : '#2B2B2B',
                      fontFamily: theme.fontFamily,
                    }}
                  />
                </Picker>
              </View>

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('해시태그')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={hashtags}
                onChangeText={setHashtags}
                placeholder={t('여러 개 입력 시 띄어쓰기로 구분됩니다.')}
                placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
                maxLength={20}
              />
              <Text
                style={[
                  styles.charCount,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {hashtags.length} / 20
              </Text>

              <Text
                style={[
                  styles.label,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {t('명언')}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.quoteInput,
                  styles.input,
                  {
                    backgroundColor: isDarkMode ? '#2B2B2B' : '#FFFFFF',
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}
                value={quote}
                onChangeText={setQuote}
                placeholder={t('책 속 명언을 입력해주세요.')}
                placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
                multiline
                maxLength={400}
              />
              <Text
                style={[
                  styles.charCount,
                  {
                    color: isDarkMode ? 'white' : '#2B2B2B',
                    fontFamily: theme.fontFamily,
                  },
                ]}>
                {quote.length} / 400
              </Text>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  {backgroundColor: isFormComplete ? '#8A715D' : 'gray'},
                ]}
                onPress={handleSubmit}
                disabled={!isFormComplete || isLoading}>
                <Text
                  style={[
                    styles.submitButtonText,
                    {color: '#FFFFFF', fontFamily: theme.fontFamily},
                  ]}>
                  {isLoading ? t('저장 중...') : t('저장하기')}
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
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  formContainer: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  quoteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 52,
  },
  charCount: {
    textAlign: 'right',
    color: '#666',
    marginTop: 10,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
