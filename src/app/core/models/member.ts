import { MemberAddress } from "./member-address";

export interface Member {
    memberId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicUrl: string;
    memberAddress: MemberAddress;
}

