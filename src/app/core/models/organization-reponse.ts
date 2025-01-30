import { OrganizationAddressResponse } from "./organization-address-response";

export interface OrganizationResponse {
    organizationId: string;
    name: string;
    description: string;
    organizationAddress: OrganizationAddressResponse;  // Reference to the OrganizationAddress interface
    createdAt: string;  // ISO 8601 format for date
    updatedAt: string;  // ISO 8601 format for date
  }