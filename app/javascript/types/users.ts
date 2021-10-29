export type User = {
  displayName: string;
  description: string;
  email: string;
}
export type SecuredUser = Omit<User, 'email'>
