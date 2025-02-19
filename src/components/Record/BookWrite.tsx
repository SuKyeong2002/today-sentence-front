import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSaveQuote } from '../../hooks/useSaveQuote';
import SuccessModal from './SuccessModal';

export default function WriteScreen() {
  const [category, setCategory] = useState<string>('');
  const [hashtags, setHashtags] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isSaving, error, handleSaveQuote } = useSaveQuote();

  const handleSubmit = async () => {
    const data = {
      bookTitle: '열두발자국',
      bookAuthor: '정재승',
      bookPublisher: '창비',
      bookPublishingYear: 2007,
      bookCover: 'http://coverurl.com/bookurl',
      isbn: '1234567890abc',
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>오늘의 문장은 무엇인가요?</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>카테고리</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="선택해주세요" value="" />
          <Picker.Item label="책" value="book" />
          <Picker.Item label="영화" value="movie" />
          <Picker.Item label="음악" value="music" />
        </Picker>

        <Text style={styles.label}>해시태그</Text>
        <TextInput
          style={styles.input}
          value={hashtags}
          onChangeText={setHashtags}
          placeholder="명언과 관련된 내용을 해시태그로 남겨보세요"
          maxLength={300}
        />
        <Text style={styles.charCount}>{hashtags.length}/300자</Text>

        <Text style={styles.label}>명언</Text>
        <TextInput
          style={[styles.input, styles.quoteInput]}
          value={quote}
          onChangeText={setQuote}
          placeholder="책 속 명언을 입력해주세요"
          multiline
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSaving}
        >
          <Text style={styles.submitButtonText}>{isSaving ? '저장 중...' : '저장하기'}</Text>
        </TouchableOpacity>
        <SuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});