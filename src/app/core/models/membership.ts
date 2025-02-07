import { Member } from "./member";
import { MembershipType } from "./membership-type";

export interface Membership {
    membershipId: string;
    organizationId: string;
    member: Member;
    membershipType: MembershipType;
    status: string;
    startDate: Date;
    endDate: Date;
}

