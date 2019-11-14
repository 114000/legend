import { IPackageModule } from '@legend/framework'

export enum DataDashboardActionTypes {}

const state = {}

const action = {}

export type PortalModuleState = typeof state
export type PortalModuleAction = typeof action

export interface DashboardModule extends IPackageModule {
  name: string,
  state: PortalModuleState,
  action: PortalModuleAction
}

export const dashboardModule: DashboardModule = {
  mountId: 'module-data-dashboard',
  name: 'dasboard',
  state, 
  action, 
}



