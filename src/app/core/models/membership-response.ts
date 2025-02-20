import { Member } from "./member";
import { MembershipType } from "./membership-type";
import { Role } from "./role";

export interface MembershipResponse {
    membershipId: string;
    organizationId: string;
    member: Member;
    membershipType: MembershipType | undefined;
    role?: Role;
    status: string;
    startDate: Date;
    endDate: Date;
}

