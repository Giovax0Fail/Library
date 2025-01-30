import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      bookName: ['', [Validators.maxLength(100)]],
      bookAuthor: ['', [Validators.maxLength(100)]],
      bookISBN: ['', [Validators.maxLength(13)]],
    });
  }

  @Output() searchBookEventEmitter = new EventEmitter<Book>();
  @Output() resetBookEventEmitter = new EventEmitter<Book>();
  ngOnInit(): void {}

  submitFilter() {
    if (this.searchForm.valid) {
      console.log(
        'searchForm è valido ed ha questi valori',
        this.searchForm.value
      );

      this.searchBookEventEmitter.emit(this.searchForm.value);
    } else {
      console.log('searchForm non valido');
    }
  }

  onReset() {
    this.searchForm.reset();
    console.log('searchForm svotato ha questi valori', this.searchForm.value);
    this.resetBookEventEmitter.emit(this.searchForm.value);
  }
}
