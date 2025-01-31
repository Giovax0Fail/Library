import { Component, inject, Input, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-form-background',
  templateUrl: './insert-form-background.component.html',
  styleUrls: ['./insert-form-background.component.scss'],
})
export class InsertFormBackgroundComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  testId: number = 0;
  bookGotById?: Book;
  public editModeParent: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['id'];
      if (!!this.testId) {
        console.log('test id from table component', this.testId);
        this.bookService.getBookById(this.testId).subscribe(
          (response: Book) => {
            console.log('Response subscribe get book by id', response);
            this.bookGotById = response;
            this.editModeParent = true;
            console.log('edit mode parent result', this.editModeParent);
          },
          (error) => {
            console.error('Errore libri', error);
            this.openSnackBar('Id libro non trovato', 'chiudi');
          }
        );
      } else this.editModeParent = false;
      {
        console.log('edit mode parent result', this.editModeParent);
      }
    });
  }

  submitBook(book: Book) {
    if (!this.editModeParent) {
      console.log('Edit mode parent in submit add book', this.editModeParent);

      console.log('Oggetto Book', book);
      this.bookService.addBook(book).subscribe(
        (response: Book) => {
          if (response) {
            console.log('response subscribe add book', response);
            this.goToDash();
            this.openSnackBar('Libro aggiunto con successo');
          }
        },
        (error) => {
          console.error('Errore libri', error);
          this.openSnackBar('Libro non aggiunto');
        }
      );
    } else if (!!this.editModeParent) {
      console.log(
        'Edit mode parent in submit update book',
        this.editModeParent
      );
      console.log('Oggetto Book', book);
      this.bookService.updateBook(book).subscribe(
        (response: Book) => {
          if (response) {
            console.log('response subscribe update book', response);
            this.goToDash();
            this.openSnackBar('Libro modificato con successo');
          }
        },
        (error) => {
          console.error('Errore libri', error);
          this.openSnackBar('Libro non modificato');
        }
      );
    }
  }

  openSnackBar(message: string, action: string = 'chiudi') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  goToDash() {
    this.router.navigate(['/dashboard']);
  }
}
