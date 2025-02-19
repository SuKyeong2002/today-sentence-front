import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface LandingPageProps {
  navigation: NavigationProp<any>;
}

type Slide = {
  id: string;
  image: any;
  imageStyle?: {
    width: number;
    height: number;
  };
  texts?: {
    text: string;
    fontSize: number;
    fontweight?: 'normal' | 'bold';
    color?: string;
  }[];
};

const slides: Slide[] = [
  {
    id: '1',
    image: require('../assets/image/NewLogo.png'),
    imageStyle: {
      width: 50,
      height: 50,
    },
  },
  {
    id: '2',
    image: require('../assets/image/Landing2.png'),
    texts: [
      { text: '책 속 명언 기록', fontSize: 24, fontweight: 'bold' },
      { text: '인상깊은 구절을 한 문장씩 기록하세요', fontSize: 16, fontweight: 'normal', color: '#B5B5B5' },
    ],
  },
  {
    id: '3',
    image: require('../assets/image/Landing3.png'),
    texts: [
      { text: '다양한 명언 탐색', fontSize: 24, fontweight: 'bold' },
      { text: '다른 사람의 명언을 쉽게 찾아보세요', fontSize: 16, fontweight: 'normal', color: '#B5B5B5' },
    ],
  },
  {
    id: '4',
    image: require('../assets/image/Landing4.png'),
    texts: [
      { text: '나만의 명언 목록', fontSize: 24, fontweight: 'bold' },
      { text: '기록하거나 저장한 명언을 확인해보세요', fontSize: 16, fontweight: 'normal', color: '#B5B5B5' },
    ],
  },
  {
    id: '5',
    image: require('../assets/image/Landing5.png'),
    texts: [
      { text: '명언을 통한 소통', fontSize: 24, fontweight: 'bold' },
      { text: '다른사람의 명언에 반응을 남겨보세요.\n좋아요와 댓글을 남길 수 있어요', fontSize: 16, fontweight: 'normal', color: '#B5B5B5' },
    ],
  },
];

const { width } = Dimensions.get('window');

export default function LandingPage({ navigation }: LandingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleStart = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, currentIndex === 0 && { backgroundColor: '#8A715D' }]}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Image source={item.image} style={styles.image} />
            {item.texts &&
              item.texts.map((textItem, index) => (
                <Text
                  key={index}
                  style={[
                    styles.text,
                    {
                      fontSize: textItem.fontSize,
                      fontWeight: textItem.fontweight || 'normal',
                      color: textItem.color || '#000',
                    },
                  ]}
                >
                  {textItem.text}
                </Text>
              ))}
          </View>
        )}
      />

      {currentIndex !== 0 && (
        <View style={styles.buttonContainer}>
          {slides[currentIndex].id === '5' ? (
            <TouchableOpacity style={styles.buttonEnabled} onPress={handleStart}>
              <Text style={styles.buttonText1}>시작하기</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.horizontalButtons}>
              <TouchableOpacity style={styles.firstButton} onPress={handleStart}>
                <Text style={styles.buttonText}>건너뛰기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {currentIndex === 0 && (
        <View style={styles.fixedTextContainer}>
          <Text style={styles.fixedText}>오늘의 한문장</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalButtons: {
    backgroundColor: '#8A715D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  firstButton: {
    backgroundColor: 'none',
    width: '50%',
    color: '#000000',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonEnabled: {
    backgroundColor: '#8A715D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonDisabled: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'none',
  },
  buttonText1: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'none',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  fixedTextContainer: {
    position: 'absolute',
    bottom: 30, 
    width: '100%',
    alignItems: 'center',
  },
  fixedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
