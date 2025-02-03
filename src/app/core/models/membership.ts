import { MembershipType } from "./membership-type";

export interface Membership {
    membershipId: string;
    organizationId: string;
    membershipType: MembershipType;
    status: string;
    startDate: Date;
    endDate: Date;
}

