import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';;
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { CardModule } from 'primeng/card';
import { AdditionalInfoMemberFormComponent } from "../../components/additional-info-member-form/additional-info-member-form.component";
import { Member } from 'src/app/core/models/member';
import { Location } from '@angular/common';

@Component({
  selector: 'app-additional-info-signup',
  imports: [ButtonModule, StepperModule, CardModule, BackgroundComponent, AdditionalInfoMemberFormComponent],
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
