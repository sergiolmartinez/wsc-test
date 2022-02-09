import React, { useState } from 'react';
import { ByMoralis, useMoralis } from "react-moralis";
import { Container, Heading, Flex, Spacer, Avatar, Box, Button } from "@chakra-ui/react";
import {Auth} from './components/Auth'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Home} from './modules/Home';
import {Profile} from './modules/Profile'
import { NFTs } from './components/NFTs';

function App() {

  const {isAuthenticated, logout, user, isAuthUndefined} =  useMoralis();
  return(
    <Container maxW='container.lg'>
      <Flex my={6}>
        <Link to="/"><Heading mt={3} mr={6} as="h2" size='md'>Home</Heading></Link>
        <Link to="NFTs"><Heading mt={3} mr={6} as="h2" size='md'>NFTs</Heading></Link>
        <Spacer />
        {isAuthenticated && <Link to="profile"><Avatar name={user.attributes.username} mr={3} /></Link>}
        
        {isAuthenticated && <Button my={1} onClick={() => logout()}>Logout</Button>}
      </Flex>
      <Heading mb={6} as='h2' size='lg'>WSC test app, {user ? user.attributes.username : 'please authenticate...'}</Heading>
        {isAuthenticated ? <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="NFTs" element={<NFTs />} />
        {isAuthUndefined && <Route
        path="*"
        element={<Navigate to="/" />}
        />}
    </Routes> : <>
        <Auth />
    </>}
    {/* <Box mt={6}>
      <ByMoralis />
    </Box> */}
  </Container>
  )
}

export default App;
