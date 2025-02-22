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
  
  type RootStackParamList = {
    BookWrite: { book: Book };
    RecordSearch: undefined;
  };
