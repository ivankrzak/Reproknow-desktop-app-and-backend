import {
  Box,
  Flex,
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  ModalCloseButton,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { useCreateProductMutation } from 'apollo/generated/graphqlClient'
import { useForm, SubmitHandler } from 'react-hook-form'

interface CreateProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface IFormInput {
  name: string
  description: string
  price: number
}

export const CreateProductModal = ({ isOpen, onClose, onSuccess }: CreateProductModalProps) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const [createProduct] = useCreateProductMutation()

  const onSubmit: SubmitHandler<IFormInput> = async ({ description, name, price }) => {
    const response = await createProduct({
      variables: { input: { description, name, price: Number(price) } },
    })

    if (!response.errors) {
      onClose()
      onSuccess()
    }
  }

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="8px">
        <ModalBody p="24px">
          <VStack spacing="32px">
            <Flex w="full" justifyContent="space-between">
              <Text w="full" fontWeight="semibold" fontSize="2xl">
                Create New Product
              </Text>
              <ModalCloseButton />
            </Flex>
            <Box w="full" h="full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack align="start" spacing="16px">
                  <label>Product Name</label>
                  <Input {...register('name')} />
                  <label>Product Description</label>
                  <Textarea {...register('description')} />
                  <label>Product Price</label>
                  <Input {...register('price')} />

                  <Button type="submit">Create</Button>
                </VStack>
              </form>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
