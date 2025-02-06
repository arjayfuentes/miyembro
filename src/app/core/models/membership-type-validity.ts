export interface MembershipTypeValidity {
    membershipTypeValidityId: string; // UUID as a string
    name: string;
    duration: number | null; // Nullable duration
    description: string;
}