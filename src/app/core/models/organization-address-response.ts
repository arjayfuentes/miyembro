export interface OrganizationAddressResponse {
    organizationAddressId: string;
    street: string;
    city: string;
    provinceState: string;
    region: string;
    country: string;
    createdAt: string;  // ISO 8601 format, you can also use Date if needed
    updatedAt: string;  // ISO 8601 format, you can also use Date if needed
  }