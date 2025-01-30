import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnChanges {
  bookForm: FormGroup;
  book?: Book;
  @Output() booklistEventEmitter = new EventEmitter<Book>();
  @Input() bookItemById?: Book;
  @Input() editModeToChild?: boolean;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [''],
      bookName: ['', Validators.required], // Campo obbligatorio
      bookAuthor: ['', Validators.required], // Campo obbligatorio
      bookISBN: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?:97[89])?\\d{9}[\\dX]|\\d{13}$'),
        ],
      ], // Campo obbligatorio
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Campo obbligatorio e deve essere un anno (4 cifre)
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !!this.bookItemById) {
      console.log(
        'book item FromId from parent to child OnChangesMethod',
        this.bookItemById
      );
      this.setValuesFromBookId(this.bookItemById);
      console.log('edit mode to child', this.editModeToChild);
    }
    /*ricordati che si usa questo hook del ciclo  vita quando avviene un binding fra due componenti*/
  }

  setValuesFromBookId(book: Book): void {
    this.bookForm.setValue({
      id: book.id,
      bookName: book?.bookName,
      bookAuthor: book?.bookAuthor,
      bookISBN: book?.bookISBN,
      year: book?.year,
    });
  }

  ngOnInit() {
    // console.log(
    //   'book item FromId from parent to child ngOnInit',
    //   this.bookItemById
    // );
  }

  onSubmit() {
    // Solo se il modulo è valido, esegui l'invio dei dati
    if (this.bookForm.valid) {
      console.log(
        'Il modulo è valido ed ha questi valori',
        this.bookForm.value
      );

      this.booklistEventEmitter.emit(this.bookForm.value);
    } else {
      console.log('Modulo non valido');
    }
  }
}
