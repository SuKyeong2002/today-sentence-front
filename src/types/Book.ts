export interface Book {
    postId: number;
    bookTitle: string;
    bookAuthor: string;
    bookPublisher: string;
    bookPublishingYear: number;
    bookCover: string;
    category: string;
    hashtags: string[];
  }
  
  export type RootStackParamList = {
    BookmarkBookList: undefined;  
    BookDetail: { postId: string };  
  };
