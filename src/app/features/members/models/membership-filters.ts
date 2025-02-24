export interface MembershipFilters {
    memberFirstName:string | null;
    memberEmail: string | null;
    memberMemberAddressCity: string | null;
    memberMemberAddressCountry: string | null;
    membershipStatusNames?: any [] | null;
    membershipTypeNames?: any [] | null;
    roleName: string | null;
    startDates: Date [] | null;
    endDates: Date [] | null;
}