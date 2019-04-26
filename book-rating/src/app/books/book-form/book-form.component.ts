import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;

  @Output() formSubmit = new EventEmitter<Book>();

  constructor() { }

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

    this.bookForm.get('title').valueChanges
      .subscribe(value => console.log(value));
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
