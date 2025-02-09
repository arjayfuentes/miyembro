import { Member } from "./member";
import { MembershipType } from "./membership-type";
import { Role } from "./role";

export interface Membership {
    membershipId: string;
    organizationId: string;
    member: Member;
    membershipType: MembershipType;
    role: Role;
    status: string;
    startDate: Date;
    endDate: Date;
}

