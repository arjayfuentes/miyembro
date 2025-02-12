import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';;
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { CardModule } from 'primeng/card';
import { Member } from 'src/app/core/models/member';
import { Location } from '@angular/common';
import { MemberFormComponent } from '../../components/member-form/member-form.component';

@Component({
  selector: 'app-additional-info-signup',
  imports: [ButtonModule, StepperModule, CardModule, BackgroundComponent, MemberFormComponent],
  templateUrl: './additional-info-signup.component.html',
  styleUrl: './additional-info-signup.component.scss'
})
export class AdditionalInfoSignupComponent {

  member: Member | undefined;

  constructor(private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState() as { member?: Member };

    if (state && state.member) {
      this.member = state.member;
      console.log(this.member);
    }
  }

  
}
