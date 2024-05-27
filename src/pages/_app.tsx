import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { useApollo } from 'hooks/useApollo'
import type { AppProps } from 'next/app'
import { BaseAppProps, NextPageWithLayout } from 'types/next'
import { theme } from 'theme'
import { ToastContainer } from 'components/auth/toast/ToastContainer'

type AppPropsWithLayout = AppProps<BaseAppProps> & {
  Component: NextPageWithLayout<BaseAppProps>
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <ToastContainer />
      <ApolloProvider client={apolloClient}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </ChakraProvider>
  )
}

const AppWithAuth = (props: AppPropsWithLayout) => {
  return <App {...props} />
}

export default AppWithAuth
