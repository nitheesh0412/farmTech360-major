import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCowComponent } from './add-cow.component';

describe('AddCowComponent', () => {
  let component: AddCowComponent;
  let fixture: ComponentFixture<AddCowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCowComponent]
    });
    fixture = TestBed.createComponent(AddCowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
