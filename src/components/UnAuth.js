import React from 'react';
import { useMoralis } from "react-moralis";
import { Container, Heading, Text, Stack } from "@chakra-ui/react";
import { ErrorBox } from './Error'




function UnAuth() {

  const { user, authError } =  useMoralis();
  
  
  return(
    <Container maxW='container.lg'>
        <Stack spacing={6}>
            {authError && ( <ErrorBox title="Authentication has failed" message={authError.message} />)}
        </Stack> 
        <Heading mb={6} as='h1' size='md'>Welcome to the WSC Test App! {user ? user.attributes.username : 'Please authenticate...'}</Heading>
        <Text>This is a site to visualize the WSC Portfolio including the token balances, transactions and owned NFTs in a human readable format.</Text>
        <Text>You will also be able to visualize profits and losses, a graph of investment performance over time, and other features.</Text>
        <Text>To get started please connect your MetMask wallet with the Connect button above.</Text>
    </Container>
  )
}

export default UnAuth;