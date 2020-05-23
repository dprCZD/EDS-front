
export interface CurrentUser {
  name: string;
  avatar: string;
  gmtCreate:Date;
  id: string;
  email: string;
  city: string;
  district: string;
  grid: string;
  phone: string;
  authority:number;
  status:number;
  password:string;
}
export interface UserQueryParams {
  name: string;
  id: string;
  email: string;
  city: string;
  district: string;
  grid: string;
  phone: string;
  authority:string;
  status:string;
}
