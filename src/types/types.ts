export type ArticleTypes = {
  id: number;
  comment: string[];
  commentText: string,
  title: string;
  theme: string;
  content: string;
  isVisible: boolean;
  author: string;
  date: string;
  ascending?: boolean;
}

export type FilterTypes = string[]


export type StoreTypes = {
  articles: ArticleTypes[];
  filters?: {
    'Author': FilterTypes,
    'Theme': FilterTypes
  }
  title: string;
  theme: string;
  content: string;
  author: string;
  date: string;

};