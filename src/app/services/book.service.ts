import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.baseUrl;

  // getAllBooks(): Observable<Book[]> {
  //   return this.http.get<Book[]>(`${this.apiUrl}getAllBooks`);
  // }

  getFilteredBooks(book: Book): Observable<Book[]> {
    return this.http.post<Book[]>(`${this.apiUrl}filterBook`, book);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.apiUrl + id);
  }

  addBook(book: Book): Observable<Book> {
    let addNewBook = this.http.post<Book>(this.apiUrl + 'addBook', book);
    return addNewBook;
  }

  deleteBook(id: Number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'deleteBook/' + id);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.apiUrl + 'addBook', book);
  }
}
