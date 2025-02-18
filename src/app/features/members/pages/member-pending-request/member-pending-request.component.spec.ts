import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPendingRequestComponent } from './member-pending-request.component';

describe('MemberPendingRequestComponent', () => {
  let component: MemberPendingRequestComponent;
  let fixture: ComponentFixture<MemberPendingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberPendingRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
