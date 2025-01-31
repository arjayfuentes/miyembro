import { MemberAddressResponse } from "./member-address-response";

export interface MemberRequest {
    memberId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    memberAddress: MemberAddressResponse;
}

