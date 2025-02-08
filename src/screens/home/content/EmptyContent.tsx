import React from 'react';
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomButton from '@/components/Button/CustomButton';

type RootStackParamList = {
  Record: undefined;
  RecordPage: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Record'>;

export default function EmptyContent() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ContentWrapper>
      <Container>
        <Wrapper>
          <TitleContainer>
            <ImageWrapper>
              <Image
                source={require('@/assets/image/creat.png')}
                style={styles.image}
              />
            </ImageWrapper>
            <TextWrapper>
              <Text style={styles.text}>내일의 명언을 채워주세요</Text>
            </TextWrapper>
          </TitleContainer>

          <SubTitleBox>
            <SubTitleInfoWrapper>
              <SubTitleInfoContainer>
                <InfoImage
                  source={require('@/assets/image/Info.png')}
                  resizeMode="contain"
                />
                <SubTitle>
                  작성한 문장이 누군가의 명언이 될 수 있습니다.
                </SubTitle>
              </SubTitleInfoContainer>
              <SubTitleInfoContainer>
                <InfoImage
                  source={require('@/assets/image/Info.png')}
                  resizeMode="contain"
                />
                <SubTitle>
                  단, 참여자가 없을 경우 비어 있을 수 있습니다.
                </SubTitle>
              </SubTitleInfoContainer>
            </SubTitleInfoWrapper>
          </SubTitleBox>
        </Wrapper>

        <ButtonWrapper>
          <CustomButton
            title="작성하기"
            onPress={() => navigation.navigate('Record')}
          />
        </ButtonWrapper>
      </Container>
    </ContentWrapper>
  );
}

const ContentWrapper = styled(View)`
  height: 73%;
  padding: 20px;
  margin: 0 20px;
  elevation: 10;
  border-radius: 15px;
  shadow-color: #000;
  background: ${({theme}) => theme.colors.white};
`;

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitleBox = styled(View)`
  display: flex;
  width: 100%;
  padding: 26px 7px;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: ${({theme}) => theme.colors.background};
`;

const SubTitleInfoWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const SubTitleInfoContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Container = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Wrapper = styled(View)`
  display: flex;
  height: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const ImageWrapper = styled(View)`
  margin-bottom: 20px;
`;

const TextWrapper = styled(View)`
  margin-bottom: 20px;
  align-items: center;
`;

const ButtonWrapper = styled(View)`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SubTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.darkGray};
`;

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#262627',
  },
});

// 이미지
const InfoImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
