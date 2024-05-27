import { mergeTypeDefs } from '@graphql-tools/merge'
import auth from './auth.graphql'
import product from './product.graphql'
import user from './user.graphql'
import date from './date.graphql'

export default mergeTypeDefs([product, date, auth, user])
