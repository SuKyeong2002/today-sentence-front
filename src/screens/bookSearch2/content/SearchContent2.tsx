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
}

interface SearchContentProps {
  post: Post;
  sortByLatest: boolean;
}

export default function SearchContent2({post}: SearchContentProps) {
  return (
    <ScrollContainer>
      <Sentence
        bookAuthor={post.bookAuthor}
        postId={post.postId}
        postWriter={post.postWriter}
        postContent={post.postContent}
        category={post.category}
        hashtags={post.hashtags}
        createAt={post.createAt}
        likesCount={post.likesCount}
        bookmarkCount={post.bookmarkCount}
        bookTitle={post.bookTitle}
        bookCover={post.bookCover}
      />
    </ScrollContainer>
  );
}

const ScrollContainer = styled(ScrollView)`
  margin: 0 20px;
`;
