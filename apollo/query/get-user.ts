import { gql } from '@apollo/client'

export const GET_USER = gql`
  query name($query: String!) {
    search(type: USER, first: 50, query: $query) {
      repositoryCount

      nodes {
        ... on User {
          name
          url
          avatarUrl
          updatedAt
        }
      }
    }
  }
`
