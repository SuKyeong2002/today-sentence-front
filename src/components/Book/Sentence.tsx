import React from 'react';
import styled from 'styled-components';
import {View, Text, Image} from 'react-native';
import Interaction from '@/screens/home/Interaction/Interaction';

const categoryMap: Record<string, string> = {
  POEM_NOVEL_ESSAY: '시/소설/에세이',
  ECONOMY_MANAGEMENT: '경제/경영',
  HISTORY_SOCIETY: '역사/사회',
  PHILOSOPHY_PSYCHOLOGY: '철학/심리학',
  SELF_DEVELOPMENT: '자기계발',
  ARTS_PHYSICAL: '예체능',
  KID_YOUTH: '아동/청소년',
  TRAVEL_CULTURE: '여행/문화',
  ETC: '기타',
};

interface SentenceProps {
  postId: number;
  postWriter: string;
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  postContent: string;
  hashtags: string;
  likesCount: number;
  bookmarkCount: number;
  createAt: string;
}

export default function Sentence({
  postId,
  bookCover,
  bookTitle,
  bookAuthor,
  postWriter,
  postContent,
  category,
  hashtags,
  createAt,
  likesCount,
  bookmarkCount,
}: SentenceProps) {
  const formattedDate = new Date(createAt).toLocaleString();

  return (
    <ContentWrapper>
      <BookContainer>
        <BookImage source={{uri: bookCover}} resizeMode="contain" />
        <BookWrapper>
          <BookCategory>{categoryMap[category] || '기타'}</BookCategory>
          <BookTitle>{bookTitle}</BookTitle>
          <BookWriter>{bookAuthor}</BookWriter>
          <PostProfileContainer>
            <ChatImage
              source={require('@/assets/image/other_user.png')}
              resizeMode="contain"
            />
            <PostWriter>{postWriter}</PostWriter>
          </PostProfileContainer>
        </BookWrapper>
      </BookContainer>
      <BookRecord>
        <BookSentence>{postContent}</BookSentence>
        <BookTag>#{hashtags.replace(/,/g, ' #')}</BookTag>
        <BookTag>{formattedDate}</BookTag>
        <InteractionContainer>
          <Interaction
            postId={postId}
            likesCount={likesCount}
            bookmarkCount={bookmarkCount}
          />
        </InteractionContainer>
      </BookRecord>
    </ContentWrapper>
  );
}

const ContentWrapper = styled(View)`
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  background: ${({theme}) => theme.colors.white};
`;

const BookContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const BookWrapper = styled(View)`
  flex-direction: column;
  flex: 1;
  gap: 5px;
`;

const BookCategory = styled(Text)`
  align-self: flex-start;
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.33);
  border-radius: 8px;
  background: #f5f4f5;
  padding: 4px 10px;
`;

const BookTitle = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.title}px;
  font-weight: 600;
`;

const BookWriter = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 500;
`;

const BookRecord = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 5px;
`;

const BookSentence = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
`;

const BookTag = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.darkGray};
`;

const BookImage = styled(Image)`
  width: 110px;
  height: 150px;
  border-radius: 10px;
`;

// 작성자
const PostProfileContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const PostWriter = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

// 상호작용
const InteractionContainer = styled(View)`
  margin: 20px 0 0 0;
`;

// 이미지
const ChatImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
