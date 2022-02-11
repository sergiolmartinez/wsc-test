import React from 'react';
import { useMoralis } from "react-moralis";
import { Container, Heading, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Home} from './modules/Home';
import {Profile} from './modules/Profile'
import { NFTs } from './components/NFTs';
import { ConnectButton } from './components/ConnectButton';
import AccountModal from './components/AccountModal'
import UnAuth from './components/UnAuth';

function App() {

  const {isAuthenticated, logout, user, isAuthUndefined} =  useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <Container maxW='container.lg'>
      <Flex my={6}>
        <Link to="/"><Heading mt={3} mr={6} as="h2" size='md'>Home</Heading></Link>
        <Link to="NFTs"><Heading mt={3} mr={6} as="h2" size='md'>NFTs</Heading></Link>
        <Link to="profile"><Heading mt={3} mr={6} as="h2" size='md'>Profile</Heading></Link>
        <Spacer />
        {isAuthenticated ? <ConnectButton handleOpenModal={onOpen} /> : <ConnectButton />}
        {isAuthenticated && <AccountModal isOpen={isOpen} onClose={onClose} />}
      </Flex>

        {isAuthenticated ? <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="NFTs" element={<NFTs />} />
        {isAuthUndefined && <Route
        path="*"
        element={<Navigate to="/" />}
        />}
      </Routes> : <>
        <UnAuth />
    </>}
  </Container>
  )
}

export default App;
