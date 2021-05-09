export interface JwtPayload {
    username: string;
    email: string;
    roles: string[];
    displayName: string;
}