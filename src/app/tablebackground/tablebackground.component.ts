import { Component, inject, OnInit, Output } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-tablebackground',
  templateUrl: './tablebackground.component.html',
  styleUrls: ['./tablebackground.component.scss'],
})
export class TablebackgroundComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  booklist: Book[] = [];
  book: Book = {} as Book;

  ngOnInit() {
    this.filterBooks(this.book);
  }

  emptyBookObj() {
    this.book = {} as Book;
  }

  filterBooks(book: Book) {
    console.log('oggetto passato nel filtro è', book);

    this.bookService.getFilteredBooks(book).subscribe(
      (books: Book[]) => {
        this.booklist = books;
        console.log('Items libri', this.booklist);
        if (this.booklist.length === 0) {
          console.log('La lista dei libri è vuota.');
          this.openSnackBar('Non ci sono libri con quei filtri');
        } else {
          console.log('Ci sono libri nella lista.');
        }
      },
      (error: any) => {
        console.error('Errore libri', error);
      }
    );
  }

  editItem(editItemId: Number) {
    console.log('deleted item id', editItemId);
    if (editItemId != null) {
      this.router.navigate(['/edit', editItemId]);
    }
  }

  // deleteItem(deletedItemId: Number) {
  //   console.log('deleted item id', deletedItemId);

  //   this.bookService.deleteBook(deletedItemId).subscribe(() => {
  //     this.openSnackBar('eliminato con successo');
  //     this.emptyBookObj();
  //     this.filterBooks(this.book);
  //   });
  // }

  deleteItem(deletedItemId: Number) {
    console.log('deleted item id', deletedItemId);

    this.bookService
      .deleteBook(deletedItemId)
      .pipe(
        switchMap(() => {
          this.openSnackBar('Libro eliminato con successo');
          this.emptyBookObj();
          return this.bookService.getFilteredBooks(this.book);
        })
      )
      .subscribe(
        //next
        (books: Book[]) => {
          this.booklist = books;
          console.log(
            'DeleteItem: Lista aggiornata dopo eliminazione',
            this.booklist
          );
        },
        //error
        (error: any) => {
          console.error('DeleteItem: errore durante la cancellazione ', error);
          this.openSnackBar("errore durante l'operazione");
        },
        //complete
        () => {
          console.log('DeleteItem: operazione completata con successo!');
        }
      );
  }

  updateBook(updatedBook: Book) {
    this.bookService.updateBook(updatedBook).subscribe(() => {
      this.emptyBookObj();
      this.filterBooks(this.book);
    });
  }

  resetBooks(book: Book) {
    this.emptyBookObj();
    console.log('oggetto passato nel filtro è', book);
    this.bookService.getFilteredBooks(book).subscribe(
      (books: Book[]) => {
        this.booklist = books;
        console.log('Items libri', this.booklist);
      },
      (error: any) => {
        console.error('Errore libri', error);
      }
    );
  }

  openSnackBar(message: string, action: string = 'chiudi') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
