export interface IUser {
    id: number;
    username: string;
    description: string;
    email: string;
    admin: boolean;
    createTime: string;
    updateTime: string;
    ldapUser: boolean;
    needChgPw: boolean;
    userType: 'LOCALUSER' | 'SSOUSER';
  }
  