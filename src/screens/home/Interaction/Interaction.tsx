import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {View, Image, Text, Alert, TouchableOpacity, Share} from 'react-native';
import {useLikeToggle} from '@/hooks/useLikeToggle';
import {useBookmarkToggle} from '@/hooks/useBookmarkToggle';
import CommentModal from './CommentModal';
import {useTheme} from '@/context/ThemeContext';

interface InteractionProps {
  postId: number;
  likesCount: number;
  bookmarkCount: number;
  commentCount: number;
  // bookCover: string;
  bookTitle: string;
  postContent: string;
  bookAuthor: string;
}

export default function Interaction({
  postId,
  likesCount,
  bookmarkCount,
  commentCount,
  // bookCover,
  bookTitle,
  bookAuthor,
  postContent,
  interaction,
}: InteractionProps) {
  const likeMutation = useLikeToggle();
  const bookmarkMutation = useBookmarkToggle();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentBookmarks, setCurrentBookmarks] = useState(bookmarkCount);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [currentCommentCount, setCurrentCommentCount] = useState(commentCount);
  const {isDarkMode, theme} = useTheme();

  const [isLikesDisabled, setIsLikesDisabled] = useState(false);
  const [isBookmarkDisabled, setIsBookmarkDisabled] = useState(false);

  // postId 변경될 때 상태 업데이트
  useEffect(() => {
    setCurrentLikes(likesCount);
    setCurrentBookmarks(bookmarkCount);
    setCurrentCommentCount(commentCount);
    setIsLiked(interaction.isLiked);
    setIsBookmarked(interaction.isSaved);
  }, [likesCount, bookmarkCount, postId, interaction]);

  // 공감 toggle
  const handleHeartClick = () => {
    if (isLikesDisabled) return;

    setIsLikesDisabled(true);
    setTimeout(() => setIsLikesDisabled(false), 1000);

    setIsLiked(!isLiked);
    setCurrentLikes(prev => (isLiked ? prev - 1 : prev + 1));

    likeMutation.mutate(postId, {
      onError: () => {
        setIsLiked(!isLiked);
        setCurrentLikes(prev => (isLiked ? prev + 1 : prev - 1));
      },
    });
  };

  // 댓글
  const handleCommentAdded = () => {
    setCurrentCommentCount(prev => prev + 1);
  };

  // 저장 toggle
  const handleBookmarkClick = () => {
    if (isBookmarkDisabled) return;

    setIsBookmarkDisabled(true);
    setTimeout(() => setIsBookmarkDisabled(false), 1000);

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
          // console.log(`공유됨: ${result.activityType}`);
        } else {
          // console.log('공유 완료!');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('공유 취소됨');
      }
    } catch (error) {
      // console.error('공유 오류:', error);
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
            <HeartNumber isDarkMode={isDarkMode}>{currentLikes}</HeartNumber>
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
            <ChatNumber isDarkMode={isDarkMode}>{commentCount}</ChatNumber>
          </BookmarkContainer>
        </TouchableOpacity>

        {isCommentModalVisible && (
          <CommentModal
            postId={postId}
            isVisible={isCommentModalVisible}
            onClose={() => setCommentModalVisible(false)}
            onCommentAdded={() => setCurrentCommentCount(prev => prev + 1)}
          />
        )}

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
            <BookmarkNumber isDarkMode={isDarkMode}>
              {currentBookmarks}
            </BookmarkNumber>
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
            <ShareNumber isDarkMode={isDarkMode}>0</ShareNumber>
          </ShareContainer>
        </TouchableOpacity>
      </InteractionContainer>
    </>
  );
}

// 소통
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

const HeartNumber = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
`;

// 댓글
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

const ChatNumber = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
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

const BookmarkNumber = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
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

const ShareNumber = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
`;

// 이미지
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
