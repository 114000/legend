import React, { FC, useState, useCallback } from 'react'
import { MatrixDigitalRainCanvas } from '@legend/ui'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { useGlobalModule } from '@legend/helper-react-hooks'
import { portalModule, PortalActionTypes, PortalApi, LoginDto, InfoDto, PortalModuleState } from '../../config'
import { NormalLogin } from '@legend/ui'

const Login: FC<RouteComponentProps & {
  signSuccessRedirectPath: string,
  portalApi: PortalApi,
  systemId: number
}> = ({
  signSuccessRedirectPath,
  portalApi,
  systemId,
}) => {

  const history = useHistory()
  const { state, dispatch } = useGlobalModule<PortalModuleState, PortalActionTypes>(portalModule.name)

  const handleLoginSubmit = useCallback(function submit (userName: string, passWord: string) {
    /// 
    portalApi.login({ userName, passWord, systemId })
    .then((res: LoginDto) => {
      portalApi.token = res.token
      return portalApi.info()
    })
    .then((info: InfoDto) => {
      dispatch(PortalActionTypes.updatePortalState, { info, isLogin: true })
      history.replace(signSuccessRedirectPath)
    })
    
  }, [])

  return (
    <NormalLogin 
      onSubmit={(username: string, password: string) => {
        handleLoginSubmit(username, password)
      }}
      withCardWrapper
      backboard={<MatrixDigitalRainCanvas />}
    />
  )
}

export { Login }