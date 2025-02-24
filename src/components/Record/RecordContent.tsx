import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fetchStatistics} from '@/api/record';
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

const groupByMonth = (records: BookRecord[]) => {
  return records.reduce(
    (acc, book) => {
      acc[book.date] = acc[book.date] ? [...acc[book.date], book] : [book];
      return acc;
    },
    {} as Record<string, BookRecord[]>,
  );
};

export default function RecordContent() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [records, setRecords] = useState<BookRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const {isDarkMode, theme} = useTheme();

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchStatistics();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecords();
  }, []);

  const groupedRecords = groupByMonth(records);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
                onPress={() => navigation.navigate('BookDetail', {book})}>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
