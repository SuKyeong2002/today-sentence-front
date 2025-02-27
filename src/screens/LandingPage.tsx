import CustomButton from '@/components/Button/CustomButton';
import { NavigationProp } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

interface LandingPageProps {
  navigation: NavigationProp<any>;
}

type Slide = {
  id: string;
  animation: any; 
  texts?: {
    text: string;
    fontSize: number;
    fontweight?: '500' | '600';
    color?: string;
  }[];
};

const slides: Slide[] = [
  {
    id: '1',
    animation: require('@/assets/animation/landing_logo.json'),
  },
  {
    id: '2',
    animation: require('@/assets/animation/landing_record.json'),
    texts: [
      { text: '책 속 명언 기록', fontSize: 24, fontweight: '600' },
      { text: '인상깊은 구절을 한 문장씩 기록하세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '3',
    animation: require('@/assets/animation/landing_search.json'),
    texts: [
      { text: '다양한 명언 탐색', fontSize: 24, fontweight: '600' },
      { text: '다른 사람의 명언을 쉽게 찾아보세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '4',
    animation: require('@/assets/animation/landing_save.json'),
    texts: [
      { text: '나만의 명언 목록', fontSize: 24, fontweight: '600' },
      { text: '기록하거나 저장한 명언을 확인해보세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '5',
    animation: require('@/assets/animation/landing_chat.json'),
    texts: [
      { text: '명언을 통한 소통', fontSize: 24, fontweight: '600' },
      { text: '다른사람의 명언에 반응을 남겨보세요.\n좋아요와 댓글을 남길 수 있어요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
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

  const landingImgSlide = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <LottieView source={item.animation} autoPlay loop style={styles.lottie} />

      {item.texts?.map((textItem, index) => (
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
  );

  const landingButton = useMemo(() => {
    return currentIndex === 0 ? (
      <View style={styles.fixedTextContainer}>
        <Text style={styles.fixedText}>오늘의 한문장</Text>
      </View>
    ) : (
      <View style={styles.buttonContainer}>
        <CustomButton title="로그인" width={'90%'} onPress={handleStart} />
      </View>
    );
  }, [currentIndex]);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={landingImgSlide}
      />
      {landingButton}
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
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200, 
    height: 200,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  // Logo Text
  fixedTextContainer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  fixedText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8A715D',
  },
});
