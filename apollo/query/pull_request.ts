import { gql } from '@apollo/client'

export const GET_MERGE_REQUEST = gql`
  query name($query: String!) {
    search(type: ISSUE, first: 50, query: $query) {
      edges {
        node {
          ... on PullRequest {
            number
            title
            repository {
              nameWithOwner
            }
            state
            createdAt
            mergedAt
            url
            changedFiles
            id
            additions
            deletions
          }
        }
      }
    }
  }
`
