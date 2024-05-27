import { DatabaseClient } from 'api/drizzle/drizzleClient'
import { product, user } from 'api/drizzle/schema'
import {
  MutationCreateProductArgs,
  MutationDeleteProductArgs,
  Resolvers,
} from 'api/generated/resolversTypes'
import { eq } from 'drizzle-orm'

export const Product: Resolvers = {
  Query: {
    products: () => DatabaseClient.select().from(product),
  },
  Mutation: {
    createProduct: async (_: unknown, { input }: MutationCreateProductArgs) => {
      console.log('input', input)

      return await DatabaseClient.insert(product)
        .values({
          ...input,
        })
        .returning()
    },
    deleteProduct: async (_: unknown, { productId }: MutationDeleteProductArgs) =>
      Boolean(await DatabaseClient.delete(product).where(eq(product.id, productId)).returning()),
  },
}
