import { Api, IApiConf } from "@micro/framework"

export interface IListFetchPayload {
  searchKey?: string,
  limit?: number
  offset?: number
}

export interface IChannelManageDto<T = any> {
  code: number
  data: T
  message: string
}


export interface IListDto extends IChannelManageDto<IListItemDto[]> {}

export interface IListItemDto {
  id: number,
  name: string
}

export interface IDemoApi {
  listFetch: (payload: IListFetchPayload) => Promise<IListDto>
}

export class DemoApi extends Api implements IDemoApi {

  constructor (apiConf?: IApiConf) {
    // change apiConf here

    super(apiConf)
  }
 

  listFetch(payload?: IListFetchPayload) {
    return this.get<IListDto>(
      '/to/your/path', 
      payload, 
      { 
        getCache: true,
        adapter: {
          code: 200,
          message: '',
          data: [{ id: 1, name: 'Lisa'}, { id: 2, name: 'Jim' }]
        }
      }
    )
  }

 
}