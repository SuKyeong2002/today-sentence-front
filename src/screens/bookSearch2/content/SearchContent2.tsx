import React from 'react';
import styled from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import Sentence from '@/components/Book/Sentence';

interface Post {
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
  commentCount: number;
}
interface Interaction{
  isLiked:boolean,
  isSaved:boolean
  }

interface SearchContentProps {
  post: Post;
  interaction: Interaction;
  sortByLatest: boolean;
}

export default function SearchContent2({post,interaction}: SearchContentProps) {
  return (
    <ScrollContainer>
      <Sentence
       post={post}
       interaction={interaction}
      />
    </ScrollContainer>
  );
}

const ScrollContainer = styled(ScrollView)`
  margin: 0 20px;
`;
