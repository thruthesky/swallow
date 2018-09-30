import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunComponent } from './jun.component';

describe('JunComponent', () => {
  let component: JunComponent;
  let fixture: ComponentFixture<JunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
