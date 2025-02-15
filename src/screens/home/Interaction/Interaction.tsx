import React, {useState} from 'react';
import styled from 'styled-components';
import {View, Image, Text, Alert, TouchableOpacity} from 'react-native';

interface InteractionProps {
  likesCount: number;
}

export default function Interaction({likesCount}: InteractionProps) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
    setCurrentLikes(prev => (isHeartClicked ? prev - 1 : prev + 1));
  };

  const handleBookmarkClick = () => {
    setIsBookmarkClicked(!isBookmarkClicked);
  };

  return (
    <>
      <InteractionContainer>
        <TouchableOpacity onPress={handleHeartClick} activeOpacity={0.5}>
          <HeartContainer>
            <HeartWrapper>
              <HeartImage
                source={
                  isHeartClicked
                    ? require('@/assets/image/clickHeart.png')
                    : require('@/assets/image/heart.png')
                }
                resizeMode="contain"
              />
            </HeartWrapper>
            <HeartNumber>{currentLikes}</HeartNumber>
          </HeartContainer>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('대화하시겠습니까?')}>
          <BookmarkContainer>
            <ChatWrapper>
              <ChatImage
                source={require('@/assets/image/chat.png')}
                resizeMode="contain"
              />
            </ChatWrapper>
            <ChatNumber>0</ChatNumber>
          </BookmarkContainer>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBookmarkClick} activeOpacity={0.5}>
          <BookmarkContainer>
            <BookmarkWrapper>
              <BookmarkImage
                source={
                  isBookmarkClicked
                    ? require('@/assets/image/clickBookmark.png')
                    : require('@/assets/image/bookMark.png')
                }
                resizeMode="contain"
              />
            </BookmarkWrapper>
            <BookmarkNumber>0</BookmarkNumber>
          </BookmarkContainer>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('공유하시겠습니까?')}>
          <ShareContainer>
            <ShareWrapper>
              <ShareImage
                source={require('@/assets/image/share.png')}
                resizeMode="contain"
              />
            </ShareWrapper>
            <ShareNumber>0</ShareNumber>
          </ShareContainer>
        </TouchableOpacity>
      </InteractionContainer>
    </>
  );
}

// 소통
const IconTouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
`;

const InteractionContainer = styled(View)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 40px;
`;

const HeartContainer = styled(View)`
  display: flex;
  width: 48px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const HeartWrapper = styled(View)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  border: 1px solid #a9a9a955;
  position: relative;
`;

const HeartNumber = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

// 댓글
const ChatContainer = styled(View)`
  display: flex;
  width: 48px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const ChatWrapper = styled(View)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  border: 1px solid #a9a9a955;
`;

const ChatNumber = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

// 북마크
const BookmarkContainer = styled(View)`
  display: flex;
  width: 48px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const BookmarkWrapper = styled(View)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  border: 1px solid #a9a9a955;
`;

const BookmarkNumber = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

// 공유
const ShareContainer = styled(View)`
  display: flex;
  width: 48px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;

const ShareWrapper = styled(View)`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 30px;
  border: 1px solid #a9a9a955;
`;

const ShareNumber = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;

// 이미지
const ResponsiveImage = styled(Image)``;

const HeartImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
const ChatImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
const BookmarkImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
const ShareImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
