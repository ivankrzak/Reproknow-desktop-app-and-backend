import { ApolloClient, ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { merge } from 'lodash'
import { toast } from 'components/auth/toast/ToastContainer'
import { createInMemoryCache } from 'utils/app/createInMemoryCache'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

const IS_BROWSER = typeof window !== 'undefined'

export type Config = { host: string }

function createClientLink(config?: Config) {
  const host = config?.host ? config.host : ''
  const httpLink = new HttpLink({
    uri: `${host}/api/graphql`,
    credentials: 'same-origin',
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      toast({
        title: networkError.message,
        status: 'error',
      })
    }
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        toast({
          title: graphQLError.message,
          status: 'error',
        })
      })
    }
  })
  return ApolloLink.from([errorLink, httpLink])
}

function createApolloClient(config?: Config) {
  return new ApolloClient({
    ssrMode: !IS_BROWSER,
    link: createClientLink(config),
    cache: createInMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

/**
 * Creates a client side Apollo client which can be hydrated. The original example no longer works
 * (using 'require' on local modules returns a promise) and thus the client-side and server-side
 * clients have been split.
 * @param initialState Initial state from SSG/SSR to hydrate the client with.
 * @param config Optional configuration for Apollo client
 * @returns A client side Apollo client instance.
 */
export function initializeApolloClient(initialState?: NormalizedCacheObject, config?: Config) {
  const createClient = () => createApolloClient(config)
  const apolloClient = !IS_BROWSER ? createClient() : globalApolloClient ?? createClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    let mergedCache = initialState

    if (globalApolloClient) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = apolloClient.extract()

      // Merge the existing cache into data passed from getStaticProps/getServerSideProps
      mergedCache = merge({}, initialState, existingCache)
    }

    apolloClient.cache.restore(mergedCache)
  }

  // Create the Apollo Client once in the client
  if (!globalApolloClient && IS_BROWSER) {
    globalApolloClient = apolloClient
  }

  return apolloClient
}
