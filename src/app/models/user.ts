
export class User{
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public phone: string,
    public city: string,
    public dob: string,
    public image: string,
    public notification_token: string,
  ){}
}
