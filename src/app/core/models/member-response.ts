import { MemberAddressResponse } from "./member-address-response";

export interface MemberResponse {
    memberId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    memberAddressResponse: MemberAddressResponse;
    createdAt: Date;
}

