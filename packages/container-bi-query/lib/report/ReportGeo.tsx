/**
 * 地域统计报表
*/
import React, { FC, useState, useEffect } from 'react'
import { FieldName } from '../config/types'
import { DEFAULT_VALUE } from './util'
import { PlainOption } from '@micro/framework'
import { CustomReport } from './CustomReport'
import { last7DaysMoment } from '@micro/kit'
import { IReportProps } from './types'

export const ReportGeo: FC<IReportProps> = ({
  biApi
}) => {

    const [creativeOptions, setCreativeOptions] = useState<PlainOption[]>([])
    const [terminalOptions, setTerminalOptions] = useState<PlainOption[]>([])
    const [provinceOptions, setProvinceOptions] = useState<PlainOption[]>([])

    useEffect(() => {
      biApi.creativeOptionsFetcher().then(setCreativeOptions)
      biApi.platformOptionsFetcher().then(setTerminalOptions)
      biApi.provinceOptionsFetcher().then(setProvinceOptions)
    }, [])

    return (
      <CustomReport
        biApi={biApi}
        range={last7DaysMoment}
        sort={{ field: FieldName.adxName, ascending: false }}
        defaultDimension={FieldName.adxName}
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
          'eCPM(实际花费)',
        ]}

        formConfigure={[
          ['流量终端', FieldName.requestTerminal, 'select', terminalOptions, { initialValue: DEFAULT_VALUE }],
          ['展现形式', FieldName.displayForm, 'select', creativeOptions, { initialValue: DEFAULT_VALUE }],
          ['省份', FieldName.requestTerminal, 'select', provinceOptions, { initialValue: DEFAULT_VALUE }],
        ]}
      />
    )
  }