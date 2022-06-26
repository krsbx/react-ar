import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import TopBar from './TopBar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWithTopBar, setIsWithTopBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lastSlash = location.pathname.split('/').pop();
    const shouldWithTopBar = ['face-tracking', 'image-tracking', 'image-compiler'];

    setIsWithTopBar(_.includes(shouldWithTopBar, lastSlash));
  }, [location]);

  return (
    <Flex
      flexDirection={'column'}
      color={'whiteAlpha.600'}
      bg={'#1a202c'}
      w={'100vw'}
      h={'100vh'}
      p={{ base: 1, md: 5 }}
    >
      {isWithTopBar && <TopBar />}
      <Flex flex={1} justifyContent={'center'}>
        {children}
      </Flex>
    </Flex>
  );
};

export default MainLayout;
