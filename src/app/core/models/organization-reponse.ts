import { OrganizationAddressResponse } from "./organization-address-response";

export interface OrganizationResponse {
    organizationId: string;
    name: string;
    description: string;
    organizationAddress: OrganizationAddressResponse; 
    logoUrl: string;
    backgroundImageUrl: string;
    email: string;
    phoneNumber: string;
    websiteUrl: string;
    createdAt: string;  // ISO 8601 format for date
    updatedAt: string;  // ISO 8601 format for date
  }