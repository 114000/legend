/**
 * RTB统计报表
*/
import React, { FC, useState, useEffect } from 'react'
import { BiApi } from '../config'
import { FieldName } from '../config/types'
import { DEFAULT_VALUE, boolSelectOptions } from './util'
import { CommonOption } from '@legend/framework'
import { CustomReport } from './CustomReport'
import { last7DaysMoment } from '@legend/kit'
import { IReportProps } from './types'

export const ReportRtb: FC<IReportProps> = ({
  biApi
}) => {

    const [creativeOptions, setCreativeOptions] = useState<CommonOption[]>([])
    const [terminalOptions, setTerminalOptions] = useState<CommonOption[]>([])
    const [platformOptions, setProvinceOptions] = useState<CommonOption[]>([])
    const [requestOptions, setRequestOptions] = useState<CommonOption[]>([])

    useEffect(() => {
      biApi.creativeOptionsFetcher().then(setCreativeOptions)
      biApi.platformOptionsFetcher().then(setProvinceOptions)
      biApi.requestOptionsFetcher().then(setRequestOptions)
      biApi.terminalOptionsFetcher().then(setTerminalOptions)
    }, [])

    return (
      <CustomReport
        biApi={biApi}
        range={last7DaysMoment}
        columns={[
          '询价量',
          '竞价量',
          '竞价率',
          '竞价成功量',
          '竞价成功率',
          '曝光量',
          '点击量',
          '点击率',
          '广告主总花费',
          '代理商总花费',
          '实际总花费',
          '花超花费',
          'eCPM(实际花费)',
        ]}

        formConfigure={[
          ['流量采买类型', FieldName.requestTypeName, 'select', requestOptions, { initialValue: DEFAULT_VALUE }],
          ['平台名称', FieldName.adxName, 'select', platformOptions, { initialValue: DEFAULT_VALUE }],
          ['流量终端', FieldName.requestTerminal, 'select', terminalOptions, { initialValue: DEFAULT_VALUE }],
          ['展现形式', FieldName.displayForm, 'select', creativeOptions, { initialValue: DEFAULT_VALUE }],
          ['是否原生', FieldName.relevantType, 'select', boolSelectOptions, { initialValue: DEFAULT_VALUE }],
        ]}
      />
    )
  }