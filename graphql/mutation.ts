import { gql } from "@apollo/client/core"

const mutationSignIn = gql`
  mutation signUp($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
    }
  }
`

export { mutationSignIn }
