import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {View, Image, Text, Alert, TouchableOpacity, Share} from 'react-native';
import {useLikeToggle} from '@/hooks/useLikeToggle';
import {useBookmarkToggle} from '@/hooks/useBookmarkToggle';
import CommentModal from './CommentModal';

interface InteractionProps {
  postId: number;
  likesCount: number;
  bookmarkCount: number;
  // bookCover: string;
  bookTitle: string;
  postContent: string;
  bookAuthor: string;
}

export default function Interaction({
  postId,
  likesCount,
  bookmarkCount,
  // bookCover,
  bookTitle,
  bookAuthor,
  postContent,
}: InteractionProps) {
  const likeMutation = useLikeToggle();
  const bookmarkMutation = useBookmarkToggle();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentBookmarks, setCurrentBookmarks] = useState(bookmarkCount);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);

  // postId 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentLikes(likesCount);
    setCurrentBookmarks(bookmarkCount);
  }, [likesCount, bookmarkCount, postId]);

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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `💌 오늘의 한문장 💌\n\n\n책 '${bookTitle}', ${bookAuthor}\n\n"${postContent}"\n\n\n오늘 하루, 작은 힘이 되길 바라요 😊`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`공유됨: ${result.activityType}`);
        } else {
          console.log('공유 완료!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('공유 취소됨');
      }
    } catch (error) {
      console.error('공유 오류:', error);
      Alert.alert('공유 실패', '이미지를 공유하는 동안 문제가 발생했습니다.');
    }
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

        <TouchableOpacity onPress={() => setCommentModalVisible(true)}>
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
        <CommentModal
          postId={postId}
          isVisible={isCommentModalVisible}
          onClose={() => setCommentModalVisible(false)}
        />

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

        <TouchableOpacity onPress={handleShare}>
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
