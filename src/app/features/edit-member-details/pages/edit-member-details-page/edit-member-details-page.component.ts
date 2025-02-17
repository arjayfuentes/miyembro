import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MemberFormComponent } from 'src/app/core/auth/components/member-form/member-form.component';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { dataURLToFile } from 'src/app/core/helpers/data-url-to-file';
import { Member } from 'src/app/core/models/member';
import { MemberFormType } from 'src/app/core/models/member-form-type.enum';
import { MemberService } from 'src/app/features/home/members/services/member.service';
import { AlertService } from 'src/app/shared/services/alert.service';


@Component({
  selector: 'app-edit-member-details-page',
  imports: [MemberFormComponent, ButtonModule],
  templateUrl: './edit-member-details-page.component.html',
  styleUrl: './edit-member-details-page.component.scss',
  providers: [DatePipe]
})
export class EditMemberDetailsPageComponent implements OnInit {


  member: Member | undefined;
  MemberFormType = MemberFormType;
  memberForm: FormGroup; 


  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private memberService: MemberService,
    private router: Router,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {
    this.memberForm = this.formBuilder.group({
      memberId: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null],
      password: [null],
      phoneNumber: [null, Validators.required],
      profilePicUrl: [null, Validators.required],
      birthDate: [null, Validators.required],
      loginType: [null],
      memberAddress: this.formBuilder.group({
        street: [null],
        city: [null, Validators.required],
        provinceState: [null, Validators.required],
        postalCode: [null],
        country: [null, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.member = this.sessionService.getSession()?.member;
  }


  onClickRegisterAdditionalInfo() {
    const birthDate: Date = this.memberForm.controls['birthDate'].value;

    const formattedBirthDate = this.datePipe.transform(birthDate, 'yyyy-MM-dd');

    const memberRequest = { ...this.memberForm.value };
    memberRequest.birthDate = formattedBirthDate;

    const formData = new FormData();
    let profilePicImage = null;
    if(this.member?.profilePicUrl !== memberRequest.profilePicUrl) {
      profilePicImage = dataURLToFile(memberRequest.profilePicUrl, "profile-pic");
      memberRequest.profilePicUrl = null;
    }

    if (profilePicImage) {
      formData.append('profilePicImage', profilePicImage);
    }
   
    formData.append('additionalInfoRequest', JSON.stringify({
      memberRequest: memberRequest
    }));

    this.memberService.updateMemberDetails(formData).subscribe(
      (res) => {
        this.router.navigate(['/home/explore']);
        this.sessionService.updateMember(res);
        this.alertService.success('/additional-info-signup', 'Success', "Succesfully updated details.");
      },
      (err: any) => {
        this.alertService.error('/login', 'Error', err.error.message);
      }
    );
  }

  onCancelEditMemberDetails() {
    this.router.navigate(['/home/explore']);
  }
}
