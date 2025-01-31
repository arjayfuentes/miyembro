import { MemberResponse } from "./member-response";

export interface Session {
    accessToken: string;
    tokenType: string;
    member: MemberResponse;
    permissions: string [];
    selectedOrganizationId: string;
    organizationIdsOfMember: string[];
}
