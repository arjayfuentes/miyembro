import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoMemberFormComponent } from './additional-info-member-form.component';

describe('AdditionalInfoMemberFormComponent', () => {
  let component: AdditionalInfoMemberFormComponent;
  let fixture: ComponentFixture<AdditionalInfoMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalInfoMemberFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
