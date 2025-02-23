export interface User {
  id: number;
  fullname: string;
  username: string;
}
export interface UserResp {
  data: User[];
}
