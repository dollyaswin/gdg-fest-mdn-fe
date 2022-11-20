export type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  created_at: string;
  updated_at: null;
};

export type AddNewBook = {
  id: number
  isbn: string;
  title: string;
  author: string;
  publisher: string;
};
