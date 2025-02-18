import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { OrganizationListComponent } from '../../components/organization-list/organization-list.component';

@Component({
  selector: 'app-explore-page',
  imports: [OrganizationListComponent, FormsModule, InputTextModule, SelectModule, CommonModule],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss'
})
export class ExplorePageComponent implements OnInit  {

  name: string | null = null;
  countries: { label: string; value: string }[] = [];  // 
  cities: { label: string; value: string }[] = [];  // If you have cities too


  selectedCountry: string | null = null;
  selectedCity: string | null = null;

  
    constructor(
      private organizationService: OrganizationService
    ) {
    }


  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.organizationService.getUniqueOrganizationCountries().subscribe(
      (res) => {
        this.countries = res.map((country: string) => ({ label: country, value: country }));
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getCities(event: any) {
    this.selectedCity = null;
    this.cities = [];
    if(this.selectedCountry && this.selectedCountry !== '') {
      this.organizationService.getOrganizationCitiesByCountry(this.selectedCountry).subscribe(
        (res) => {
          this.cities = res.map((city: string) => ({ label: city, value: city }));
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    
  }



}
