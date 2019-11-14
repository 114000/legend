import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import rootComponent from './src/root'
import { portalModule } from './config'

const lifecycles = singleSpaReact({
  React, 
  ReactDOM,
  rootComponent,
  domElementGetter () {
    return document.getElementById(portalModule.mountId)
  }
})

export const bootstrap = [
  lifecycles.bootstrap, (props) => {
    console.log(2222, props)

    return Promise.resolve(props)
  }
]

export const mount = [
  lifecycles.mount
]

export const unmount = [
  lifecycles.unmount
]

