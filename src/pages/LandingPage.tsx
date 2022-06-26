import React from 'react';
import { Flex, Text, VStack, Link as ChakraLink, HStack } from '@chakra-ui/react';

const LandingPage = () => {
  const CustomLink = ({ to, text }: { to: string; text: string }) => (
    <ChakraLink
      href={to}
      fontWeight={'bold'}
      fontSize={'1.1rem'}
      _hover={{
        color: 'white',
      }}
      transition={'all 0.3s ease-in-out'}
    >
      <Text>{text}</Text>
    </ChakraLink>
  );

  return (
    <Flex flex={1} alignItems={'center'} justifyContent={'center'}>
      <VStack gap={5} width={{ base: '100%', md: '45%', lg: '35em' }} textAlign={'center'}>
        <Text fontWeight={'bold'} fontSize={'1.5rem'} py={5} color={'white'}>
          Oops!
        </Text>
        <Text fontSize={'1.15rem'} color={'whiteAlpha.700'}>
          Looks like you open a wrong page, do you mean try to access other pages?
        </Text>
        <HStack gap={5} pt={5}>
          <CustomLink to={'/react-ar/face-tracking'} text={'Face Tracking'} />
          <CustomLink to={'/react-ar/image-tracking'} text={'Image Tracking'} />
          <CustomLink to={'/react-ar/image-compiler'} text={'Image Compiler'} />
        </HStack>
      </VStack>
    </Flex>
  );
};

export default LandingPage;
