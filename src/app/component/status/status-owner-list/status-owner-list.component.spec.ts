import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOwnerListComponent } from './status-owner-list.component';

describe('StatusOwnerListComponent', () => {
  let component: StatusOwnerListComponent;
  let fixture: ComponentFixture<StatusOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOwnerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
