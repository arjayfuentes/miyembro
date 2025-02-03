import { Member } from "./member";
import { Membership } from "./membership";
import { OrganizationResponse } from "./organization-reponse";
import { Role } from "./role";

export interface Session {
    accessToken: string;
    tokenType: string;
    member: Member;
    role: Role;
    permissions: string [];
    organization: OrganizationResponse;
    organizationIdsOfMember: string[];
    membership: Membership;
}
