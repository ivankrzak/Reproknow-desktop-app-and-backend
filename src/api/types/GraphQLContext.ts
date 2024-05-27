import { PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless'
import { YogaInitialContext } from 'graphql-yoga'
import { GetServerSidePropsContext } from 'next'
import * as schema from 'api/drizzle/schema'

export type YogaServerContext = YogaInitialContext & {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
  drizzle: PlanetScaleDatabase<typeof schema>
}

// TODO adjust server context to your needs
// eslint-disable-next-line @typescript-eslint/ban-types
export type ApolloServerClientContext = {}
