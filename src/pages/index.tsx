import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useDeleteProductMutation, useProductsQuery } from 'apollo/generated/graphqlClient'
import { CreateProductModal } from 'components/CreateProductModal'

const Home: NextPage = () => {
  const { data, loading, refetch } = useProductsQuery()
  const [deleteProduct] = useDeleteProductMutation({ onCompleted: () => refetch })
  const {
    isOpen: isCreateProductModalOpen,
    onOpen: onCreateProductModalOpen,
    onClose: onCreateProductModalClose,
  } = useDisclosure()

  return (
    <Container centerContent>
      <Heading>Reproknow stack demo</Heading>
      <VStack w="full">
        <Flex w="full" justify="space-between">
          <Text>Products</Text>
          <Button onClick={onCreateProductModalOpen}>Create New Product</Button>
        </Flex>
        {loading && (
          <Center w="full" h="full">
            <Spinner size="xl" />
          </Center>
        )}
        {data?.products && (
          <SimpleGrid columns={3} gap="24px">
            {data.products.map(({ id, name, description, price }) => (
              <Card key={name} w="320px" p="32px" borderRadius="16px">
                <Flex w="full" justify="end">
                  <Button
                    w="20px"
                    h="20px"
                    colorScheme="red"
                    onClick={() => {
                      deleteProduct({ variables: { productId: id }, onCompleted: () => refetch() })
                    }}
                  >
                    X
                  </Button>
                </Flex>
                <Text fontWeight="semibold" fontSize="2xl">
                  {name}
                </Text>
                <Text>{description}</Text>
                <Text>{price} €</Text>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
      <CreateProductModal
        isOpen={isCreateProductModalOpen}
        onClose={onCreateProductModalClose}
        onSuccess={() => refetch()}
      />
    </Container>
  )
}

export default Home
