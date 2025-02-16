import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { KAKAO_API_KEY } from '@env';
import Interaction from '@/screens/home/Interaction/Interaction';
import { ScrollView } from 'react-native-gesture-handler';

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

interface Post {
  postId: number;
  category: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  bookPublisher: string;
  bookPublishingYear: number;
  postContent: string;
  hashtags: string;
  likesCount: number;
  bookmarkCount: number;
  createAt: string;
}

interface SearchContentProps {
  post: Post;
  sortByLatest: boolean;
}

export default function SearchContent2({ post, sortByLatest }: SearchContentProps) {
  const [thumbnail, setThumbnail] = useState<string>(post.bookCover); // 기본 표지 설정

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const response = await axios.get(
          `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(post.bookTitle)}`,
          {
            headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
          }
        );

        const fetchedThumbnail = response.data.documents?.[0]?.thumbnail || post.bookCover;
        setThumbnail(fetchedThumbnail); 
      } catch (error) {
        console.error('Failed to fetch thumbnail:', error);
      }
    };

    fetchThumbnail();
  }, [post.bookTitle, sortByLatest]); 

  return (
    <ScrollContainer>
      <ContentWrapper>
        <BookContainer>
          <BookImage source={{ uri: thumbnail }} resizeMode="contain" />
          <BookWrapper>
            <BookCategory>{categoryMap[post.category] || '기타'}</BookCategory>
            <BookTitle>{post.bookTitle}</BookTitle>
            <BookWriter>{post.bookAuthor}</BookWriter>
          </BookWrapper>
        </BookContainer>
        <BookRecord>
          <BookSentence>"{post.postContent}"</BookSentence>
          <BookTag>#{post.hashtags.replace(/,/g, ' #')}</BookTag>
        </BookRecord>
        <Interaction postId={post.postId} likesCount={post.likesCount} bookmarkCount={post.bookmarkCount} />
      </ContentWrapper>
    </ScrollContainer>
  );
}

// 스타일 정의
const ScrollContainer = styled(ScrollView)`
  margin: 0 20px;
`;

const ContentWrapper = styled(View)`
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.white};
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
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.33);
  border-radius: 8px;
  background: #f5f4f5;
  padding: 4px 10px;
`;

const BookTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.title}px;
  font-weight: 600;
`;

const BookWriter = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
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
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 400;
`;

const BookTag = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray};
`;

const BookImage = styled(Image)`
  width: 110px;
  height: 150px;
  border-radius: 10px;
`;
