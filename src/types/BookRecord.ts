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
    data: BookRecord[];
  }

