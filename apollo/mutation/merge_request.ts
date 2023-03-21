import { gql } from '@apollo/client'

export const MERGE_REQUEST = gql`
  mutation viram($input: MergePullRequestInput!) {
    mergePullRequest(input: $input) {
      pullRequest {
        closedAt
      }
    }
  }
`

export const REVERT_MERGE_REQUEST = gql`
  mutation viram($input: RevertPullRequestInput!) {
    revertPullRequest(input: $input) {
      revertPullRequest {
        id
      }
    }
  }
`
export const CREATE_PR_REQUEST = gql`
  mutation createPr($input: CreatePullRequestInput!) {
    createPullRequest(input: $input) {
      clientMutationId
      pullRequest {
        state
        id
      }
    }
  }
`
