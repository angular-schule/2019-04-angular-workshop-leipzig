import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { utf8Encode } from '@angular/compiler/src/util';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let bookRatingMock;
  let book: Book;


  beforeEach(() => {
    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 2.99
    };

    bookRatingMock = {
      rateUp: () => book,
      rateDown: () => book
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA], // Shallow Unit Test
      providers: [
        { provide: BookRatingService, useValue: bookRatingMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the service for rateUp', () => {
    // Service holen
    const rs = TestBed.get(BookRatingService);

    // spy auf den Service
    spyOn(rs, 'rateUp').and.callThrough();
    // spyOn(rs, 'rateDown').and.callFake(() => book);

    // Methode aufrufen
    component.rateUp(book);

    // prüfen
    expect(rs.rateUp).toHaveBeenCalledWith(book);
  });

  it('should update and sort the book list', () => {
    // Liste mit Büchern füllen (component.books)

    // Neues Buch erstellen mit gleicher ISBN

    // aufrufen: updateSortList(book)

    // Buch finden und prüfen

    // Reihenfolge prüfen (z.B. durch Liste der ISBNs oder erwartete komplette Buchliste)

    // HAUSAUFGABE! :-)
    // PS: .toEqual() macht Deep Compare!
  });
});
