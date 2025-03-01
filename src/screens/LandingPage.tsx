import CustomButton from '@/components/Button/CustomButton';
import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
    animation: require('@/assets/animation/landing_record2.json'),
  },
  {
    id: '3',
    animation: require('@/assets/animation/landing_search2.json'),
  },
  {
    id: '4',
    animation: require('@/assets/animation/landing_save2.json'),
  },
  {
    id: '5',
    animation: require('@/assets/animation/landing_chat2.json'),
  },
];

const {width} = Dimensions.get('window');

export default function LandingPage({navigation}: LandingPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 기존 타이머 제거 (중복 실행 방지)
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
      autoScrollTimeout.current = null;
    }

    // id가 '1' ~ '4'인 경우 자동 넘김
    if (currentIndex < 5) {
      autoScrollTimeout.current = setTimeout(() => {
        // FlatList 스크롤이 정상 동작하는지 확인
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: currentIndex,
            animated: true,
          });
          // 상태 업데이트 지연 적용
          setTimeout(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
          }, 100); 
        } else {
        }
      }, 2000);
    }

    return () => {
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
        autoScrollTimeout.current = null;
      }
    };
  }, [currentIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleStart = () => {
    navigation.navigate('Login');
  };

  const landingImgSlide = ({item}: {item: Slide}) => (
    <View
      style={[
        styles.slide,
        {width},
        item.id === '1' && styles.brownBackground,
      ]}>
      <LottieView
        source={item.animation}
        autoPlay
        loop
        style={[
          styles.lottie,
          item.id === '1' && {width: 350, height: 350},
          item.id === '2' && {width: 300, height: 300, marginBottom: 48},
          item.id === '3' && {width: 350, height: 350},
          item.id === '4' && {width: 330, height: 330, marginBottom: 60},
          item.id === '5' && {width: 350, height: 350, marginBottom: 48},
        ]}
      />
    </View>
  );

  const landingButton = useMemo(() => {
    return currentIndex === 5 ? (
      <View style={styles.buttonContainer}>
        <CustomButton title="로그인" width={'90%'} onPress={handleStart} />
      </View>
    ) : (
      <View></View>
    );
  }, [currentIndex]);

  return (
    <View style={[styles.container]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
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
  brownBackground: {
    backgroundColor: '#8A715D',
  },
  lottie: {
    width: 300,
    height: 300,
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
