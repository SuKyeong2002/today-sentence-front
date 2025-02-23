import { Book} from "./Book";

export interface BookRecord {
    bookTitle: string;
    author: string;
    coverUrl: string;
    publisher: string;
    publishingYear: number;
    postId: number;
    postWriter: string;
    postContent: string;
    category: string;
    hashtags: string;
    likesCount: number;
  }

export interface SearchResponse {
    data: {
      content: Book[];
      totalElements: number;
      totalPages: number;
    };
  }

