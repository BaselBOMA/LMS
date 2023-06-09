import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: LibraryItemComponent;
  let fixture: ComponentFixture<LibraryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
