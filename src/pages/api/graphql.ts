import { useSentry } from '@envelop/sentry'
import { schema } from 'api/graphql/schema'
import { YogaServerContext } from 'api/types/GraphQLContext'
import { createYoga } from 'graphql-yoga'
import '@sentry/tracing'

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

export default createYoga<YogaServerContext>({
  schema,
  // eslint-disable-next-line react-hooks/rules-of-hooks
  plugins: [useSentry({})],
  cors: {
    origin: '*',
    allowedHeaders: ['*'],
    methods: ['*'],
    credentials: true,
  },
  graphiql: process.env.NODE_ENV === 'development',
})
