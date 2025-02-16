import React, {useState} from 'react';
import styled from 'styled-components';
import {View, Image, Text, Alert, TouchableOpacity} from 'react-native';
import { useLikeToggle } from '@/hooks/useLikeToggle';
import { useBookmarkToggle } from '@/hooks/useBookmarkToggle';

interface InteractionProps {
  postId: number;
  likesCount: number;
  bookmarkCount: number
}

export default function Interaction({postId, likesCount, bookmarkCount}: InteractionProps) {
  const likeMutation = useLikeToggle();
  const bookmarkMutation = useBookmarkToggle();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentBookmarks, setCurrentBookmarks] = useState(bookmarkCount);

  // 공감 toggle
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => (isLiked ? prev - 1 : prev + 1));

    likeMutation.mutate(postId, {
      onError: () => {
        setIsLiked(!isLiked);
        setCurrentLikes(prev => (isLiked ? prev + 1 : prev - 1));
      },
    });
  };

  // 저장 toggle
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    setCurrentBookmarks(prev2 => (isBookmarked ? prev2 - 1 : prev2 + 1));

    bookmarkMutation.mutate(postId, {
      onError: () => {
        setIsBookmarked(!isBookmarked);
        setCurrentBookmarks(prev2 => (isBookmarked ? prev2 + 1 : prev2 - 1));
      },
    });
  };

  return (
    <>
      <InteractionContainer>
        <TouchableOpacity onPress={handleHeartClick} activeOpacity={0.5}>
          <HeartContainer>
            <HeartWrapper>
              <HeartImage
                source={
                  isLiked
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
                  isBookmarked
                    ? require('@/assets/image/clickBookmark.png')
                    : require('@/assets/image/bookMark.png')
                }
                resizeMode="contain"
              />
            </BookmarkWrapper>
            <BookmarkNumber>{currentBookmarks}</BookmarkNumber>
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
