import CustomButton from '@/components/Button/CustomButton';
import { NavigationProp } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface LandingPageProps {
  navigation: NavigationProp<any>;
}

type Slide = {
  id: string;
  image: any;
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
    image: require('../assets/image/NewLogo.png'),
  },
  {
    id: '2',
    image: require('../assets/image/Landing2.png'),
    texts: [
      { text: '책 속 명언 기록', fontSize: 24, fontweight: '600' },
      { text: '인상깊은 구절을 한 문장씩 기록하세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '3',
    image: require('../assets/image/Landing3.png'),
    texts: [
      { text: '다양한 명언 탐색', fontSize: 24, fontweight: '600' },
      { text: '다른 사람의 명언을 쉽게 찾아보세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '4',
    image: require('../assets/image/Landing4.png'),
    texts: [
      { text: '나만의 명언 목록', fontSize: 24, fontweight: '600' },
      { text: '기록하거나 저장한 명언을 확인해보세요', fontSize: 16, fontweight: '500', color: '#AAAAAA' },
    ],
  },
  {
    id: '5',
    image: require('../assets/image/Landing5.png'),
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

  const landingImgSlide = ({ item } : { item: Slide }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} />
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

  const langingButton = useMemo(() => {
    return currentIndex === 0 ? (
      <View style={styles.fixedTextContainer}>
        <Text style={styles.fixedText}>오늘의 한문장</Text>
      </View>
    ) : (
      <View style={styles.buttonContainer}>
        <CustomButton title="로그인" width={'90%'} onPress={handleStart} />
      </View>
    )
  }, [currentIndex]);

  return (
    <View style={[styles.container, currentIndex === 0 && { backgroundColor: '#8A715D' }]}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={landingImgSlide}
      />
      {langingButton}
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
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
  },
// Logo Text
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
