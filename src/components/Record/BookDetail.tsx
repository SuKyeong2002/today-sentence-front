import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFetchBookDetail } from '../../hooks/useFetchBookDetail';
import BackHeader from '../Header/BackHeader';
import { RootStackParamList } from '../../types/Book';
import Sentence from '@/components/Book/Sentence';
import Footer from '../Footer/Footer';

type BookDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'BookDetail'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const { book, loading, error } = useFetchBookDetail(postId);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackHeader/>
      <Sentence post={book.posts} interaction={book.interaction} />
      <Footer/>
    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
