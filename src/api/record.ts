import axios from 'axios';
import {BookRecord} from "../types/BookRecord";
import { Statistics } from '../types/CategoryData';
import { QuoteData } from '@/types/QuoteData';
import { Bookmark } from '@/types/Bookmark';
import { Book } from '@/types/Book';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://3.34.197.35';

interface SearchResponse {
  data: {
    content: Book[];
    totalElements: number;
    totalPages: number;
  };
}

export const RecordQuote = async (
  bookTitle: string,
  bookAuthor: string,
  bookPublisher: string,
  bookPublishingYear: number,
  bookCover: string,
  isbn: string,
  category: string,
  hashtages: string,
  content: string,
): Promise<void> => {
  const response = await axios.post<void>(
    `${API_URL}/api/posts`,
    {bookTitle, bookAuthor, bookPublisher, bookPublishingYear, bookCover, isbn, category, hashtages, content},
  );
  return response.data;
};

export const GetQuoteDetail = async (
  postId: number,
  bookTitle: string,
  bookAuthor: string,
  bookPublisher: string,
  bookPublishingYear: number,
  bookCover: string, 
  category: string,
  hashtages: string
): Promise<void> => {
  const response = await axios.get(
    `${API_URL}/api/posts/{post_id}`,
    {params: {postId, bookTitle, bookAuthor, bookPublisher, bookPublishingYear, bookCover, category, hashtages}},
  );
  return response.data.data;
};

export const GetQuoteListByPeriod = async (
    postId: number, 
    bookTitle: string, 
    bookAuthor: string, 
    bookPublisher: string, 
    bookPublishingYear: string,
    bookCover: string,
): Promise<void> => {
  const response = await axios.get<void>(
    `${API_URL}/api/posts/records`,
    {params: {postId, bookTitle, bookAuthor, bookPublisher, bookPublishingYear, bookCover}},
  );
  return response.data;
};

export const GetSavedQuoteListByPeriod = async (
    postId: number,
    bookTitle: string, 
    bookAuthor: string, 
    bookPublisher: string,
    bookPublishingYear: string,
    bookCover: string,
): Promise<void> => {
  const response = await axios.get<void>(
    `${API_URL}/api/posts/bookmarks`,
    {params: {postId, bookTitle, bookAuthor, bookPublishingYear, bookPublisher, bookCover}},
  );
  return response.data;
};

export const ToggleSaveQuote = async (
  postId: number
): Promise<void> => {
  const response = await axios.post<void>(
    `${API_URL}/api/posts/bookmarks`,
    {postId},
  );
  return response.data;
};

export const SearchBookRecord = async (
    searchQuery: string
  ): Promise<BookRecord[]> => {
    const response = await axios.get<SearchResponse>(
      `${API_URL}/api/search/posts`,
      {
        params: {
            query: searchQuery
        }
      }
    );
    return response.data.data;
  };
  
  export async function fetchStatistics(): Promise<Statistics> {
    const response = await fetch("api/posts/statistics");
    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }
    const data = await response.json();
    return {
      records: data.records || {},
      bookmarks: data.bookmarks || {},
    };
  }

  export async function saveQuote(data: QuoteData): Promise<void> {
    const response = await axios.post('/api/posts/bookmarks', data);
    if (response.status !== 200) {
      throw new Error('Failed to save quote');
    }
  }

  export async function fetchBookmarks(): Promise<Bookmark[]> {
    const response = await axios.get('/api/posts/bookmarks');
    if (response.status !== 200) {
      throw new Error('Failed to fetch bookmarks');
    }
    return response.data.data;
  }

  export async function searchBooks(query: string): Promise<Book[]> {
    const response = await axios.get<SearchResponse>(`/search?q=${query}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch search results');
    }
    return response.data.data.content;
  }

  export async function fetchBookDetail(postId: number): Promise<Book> {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
    
      const response = await axios.get<{ data: Book }>(`${API_URL}/api/posts/test/${postId}`, {
        headers: {
          "ACCESS-TOKEN": token,
        },
      });
    
      if (response.status !== 200) {
        throw new Error('Failed to fetch book detail');
      }
    
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch book detail');
    }
  }
  