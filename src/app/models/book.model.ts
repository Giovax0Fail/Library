export class Book {
  id: number;
  bookName: string;
  bookAuthor: string;
  bookISBN: string;
  year: number;

  constructor(
    id: number,
    bookName: string,
    bookAuthor: string,
    bookISBN: string,
    year: number
  ) {
    this.id = id;
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookISBN = bookISBN;
    this.year = year;
  }
}
