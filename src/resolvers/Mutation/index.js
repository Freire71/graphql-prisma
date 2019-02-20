import * as UserMutations from './User'
import * as PostMutations from './Post'
import * as CommentMutations from './Comment'

export default {
    ...UserMutations,
    ...PostMutations,
    ...CommentMutations
}