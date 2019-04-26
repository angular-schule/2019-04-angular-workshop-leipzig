import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  results$: Observable<Book[]>;

  @Output() formSubmit = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl('', [
        Validators.min(0)
      ])
    });

    this.results$ = this.bookForm.get('title').valueChanges.pipe(
      filter(term => term.length >= 3),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => this.bs.search(term))
    );
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }

    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    this.formSubmit.emit(newBook);
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  logForm() {
    console.log(this.bookForm);
  }
}
