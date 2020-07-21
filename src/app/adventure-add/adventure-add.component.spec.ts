import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureAddComponent } from './adventure-add.component';

describe('AdventureAddComponent', () => {
  let component: AdventureAddComponent;
  let fixture: ComponentFixture<AdventureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
