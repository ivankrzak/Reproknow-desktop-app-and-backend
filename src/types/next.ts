import { ReactElement, ReactNode } from 'react'
import { NormalizedCacheObject } from '@apollo/client'
import { NextPage } from 'next'

export interface BaseAppProps {
  initialApolloState?: NormalizedCacheObject
}

export type NextPageWithLayout<P = BaseAppProps, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
