import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { Book } from '../shared/book';
import { ButtonSharedModule } from 'src/app/button-shared/button-shared.module';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      imports: [ButtonSharedModule] // Achtung: Später vermeiden mit Shallow Unit Test
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    // Initialisierung VOR detectChanges()
    component.book = {
      isbn: '',
      title: 'title',
      description: 'ddd',
      price: 2.99,
      rating: 3
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on doRateUp', () => {
    // Arrange
    let eventBook: Book;

    component.rateUp.subscribe(b => {
      eventBook = b;
    });

    // Act
    component.doRateUp();

    // Assert
    expect(eventBook).toBeTruthy();
    expect(eventBook).toBe(component.book);
  });

  it('should call method for button click', () => {
    // Spionage!
    spyOn(component, 'doRateUp');

    // Button holen
    const rateUpBtn: HTMLButtonElement = fixture.debugElement
      .query(By.css('[data-testing-id="rateUpBtn"]'))
      .nativeElement;

    // klicken
    rateUpBtn.click();

    // prüfen, ob Methode aufgerufen
    expect(component.doRateUp).toHaveBeenCalledTimes(1);
  });
});
