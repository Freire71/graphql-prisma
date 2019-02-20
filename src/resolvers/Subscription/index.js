import * as CommentSubscriptions from './Comment'
import * as PostSubscriptions from './Post'

export default {
    ...CommentSubscriptions,
    ...PostSubscriptions
}