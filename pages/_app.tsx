import '../styles/globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import type { AppProps } from 'next/app'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const authLink = setContext(async (_, { headers }) => {
  const modifiedHeader = {
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  }
  return modifiedHeader
})

const uploadLink = createUploadLink({
  uri: 'https://api.github.com/graphql',
  credentials: 'same-origin',
})



const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}


