import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from 'styled-components';

interface BookRecord {
  id: string;
  title: string;
  author: string;
  date: string;
}

type RootStackParamList = {
  BookDetail: {book: BookRecord};
  RecordSearch: undefined;
};

const sampleRecords: BookRecord[] = [
  {id: '1', title: '책 제목 A', author: '저자 A', date: '2025-01'},
  {id: '2', title: '책 제목 B', author: '저자 B', date: '2025-01'},
  {id: '3', title: '책 제목 C', author: '저자 C', date: '2025-02'},
];

const groupByMonth = (records: BookRecord[]) => {
  return records.reduce(
    (acc, book) => {
      acc[book.date] = acc[book.date] ? [...acc[book.date], book] : [book];
      return acc;
    },
    {} as Record<string, BookRecord[]>,
  );
};

export default function SavedContent() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBookSelect = (book: BookRecord) => {
    navigation.navigate('BookDetail', {book});
  };

  const [records] = useState(sampleRecords);
  const groupedRecords = groupByMonth(records);
  const {isDarkMode, theme} = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(groupedRecords)}
        keyExtractor={item => item}
        renderItem={({item: month}) => (
          <View>
            <Text style={styles.monthHeader}>{month}</Text>
            {groupedRecords[month].map(book => (
              <TouchableOpacity
                key={book.id}
                style={styles.bookItem}
                onPress={() => handleBookSelect(book)}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RecordSearch')}>
        <Image
          source={require('../../assets/image/back2.png')}
          style={[
            styles.backIcon,
            {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bookItem: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
