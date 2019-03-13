import { shield } from 'graphql-shield'
import * as rules from './rules'

export const permissions = shield({
    Mutation: {
      createPost: rules.isAuthenticated
    },
})
  