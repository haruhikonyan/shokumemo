export type User = {
  id: number
  displayName: string;
  description: string;
  email: string;
}
export type SecuredUser = Omit<User, 'email'>
