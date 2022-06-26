import React from 'react';
import { Flex, HStack, Link as ChakraLink, Text, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [isMd] = useMediaQuery(['(min-width: 48em)', '(min-width: 60em)']);

  const CustomLink = ({
    to,
    longText,
    shortText,
  }: {
    to: string;
    longText: string;
    shortText?: string;
  }) => (
    <ChakraLink
      as={Link}
      to={to}
      fontWeight={'bold'}
      _hover={{
        color: 'white',
      }}
      transition={'all 0.3s ease-in-out'}
    >
      <Text>{isMd ? longText : shortText ?? longText}</Text>
    </ChakraLink>
  );

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} textAlign={'center'} pb={5}>
      <HStack gap={isMd ? 6 : 4}>
        <CustomLink
          to={'/react-ar/face-tracking'}
          longText={'Face Tracking'}
          shortText={'Face...'}
        />
        <CustomLink
          to={'/react-ar/image-tracking'}
          longText={'Image Tracking'}
          shortText={'Image...'}
        />
        <CustomLink
          to={'/react-ar/image-compiler'}
          longText={'Image Compiler'}
          shortText={'Compiler...'}
        />
      </HStack>
    </Flex>
  );
};

export default TopBar;
