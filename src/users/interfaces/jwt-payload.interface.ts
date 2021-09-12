export interface JwtPayload {
  id?: string;
  username: string;
  email: string;
  roles: string[];
  displayName: string;
}
