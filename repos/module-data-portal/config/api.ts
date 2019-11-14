import { Api } from "@legend/framework/api/Api"

export interface LoginPayload { userName: string, passWord: string, systemId: number }
export interface LoginDto { 
  token: string,
  agentId: number,
  groupId: number,
  systemType: string
  customerId: number,
  userIp: string,
  userAgent: string,
  userType: number,
  userName: string,
  userId: number,
  user_ReadableName: string,
}

export interface InfoDto {

}

export interface LogoutDto {

}

export type LoginFunc = (payload: LoginPayload) => Promise<LoginDto>
export type UserInfoFunc = () => Promise<InfoDto>


export interface IPortalApi {
  login: LoginFunc,
  info: UserInfoFunc
}

export class PortalApi extends Api implements IPortalApi {


  login (payload: LoginPayload) {
    return this.post<LoginDto>('/userapi/login', payload)
  }

  info () {
    return this.get('/userapi/info').then<InfoDto>(res => res.data)
  }

  logout () {
    return this.get<LogoutDto>('/userapi/logout')
  }
}