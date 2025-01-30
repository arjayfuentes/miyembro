import { MemberResponse } from "./member-response";

export interface Session {
    accessToken: string;
    tokenType: string;
    memberResponse: MemberResponse;
    permissions: string [];
}
