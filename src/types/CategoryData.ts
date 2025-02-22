export interface CategoryData {
    category: string;
    count: number;
  }
  
  export interface StatsContentProps {
    title: string;
    data: Record<string, number>;
  }
  
  export interface Statistics {
    records: Record<string, number>;
    bookmarks: Record<string, number>;
  }

  