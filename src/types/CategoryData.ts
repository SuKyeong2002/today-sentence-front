import { NativeStackScreenProps } from '@react-navigation/native-stack';
export interface CategoryData {
    category: string;
    count: number;
  }
  
  export type RootStackParamList = {
    StatusContent: {
      title: string;
      data: Record<string, number>;
    };
  }
  
  export interface Statistics {
    records: Record<string, number>;
    bookmarks: Record<string, number>;
  }

  export type StatsContentProps = NativeStackScreenProps<RootStackParamList, 'StatusContent'>;

  