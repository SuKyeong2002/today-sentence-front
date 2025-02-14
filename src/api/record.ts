import axios from 'axios';

const API_URL = 'http://43.201.20.84';

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
