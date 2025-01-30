import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    'id',
    'bookName',
    'bookAuthor',
    'bookISBN',
    'year',
    'actions',
  ];
  @Input() bookItems: Book[] = [];
  dataSource = new MatTableDataSource<Book>(this.bookItems);
  @Output() deleteItemEvent = new EventEmitter<Number>();
  @Output() editItemEvent = new EventEmitter<Number>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  constructor(private router: Router) {
    // this.dataSource = new MatTableDataSource(this.bookItems);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.bookItems;
    console.log('Data Source NgOnChanges:', this.dataSource.data);
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log(this.bookItems);
    this.dataSource.data = this.bookItems;
    console.log('Datasource ngOnInit', this.dataSource.data);
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.data = this.bookItems;
    console.log('Data Source:', this.dataSource.data);
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  // routeChange(clickchange: any) {
  //   if (clickchange != null) {
  //     console.log('clickchange', clickchange);
  //     this.router.navigate(['/edit']);
  //   }
  // }
  editItem(value: number) {
    this.editItemEvent.emit(value);
    console.log('event emitter edit Item', value);
    // if (value != null) {
    //   this.router.navigate(['/edit']);
    // }
  }
  deleteItem(value: number) {
    this.deleteItemEvent.emit(value);
    console.log('event emitter delete', value);
  }
}
