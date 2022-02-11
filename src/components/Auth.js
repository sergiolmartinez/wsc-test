import React from 'react';
import { useMoralis } from "react-moralis";
import { Button } from '@chakra-ui/react';

export const Auth = () => {
    const {authenticate, isAuthenticating, authError} =  useMoralis();

    return (
    
        <Button isLoading={ isAuthenticating } onClick={() => authenticate()}>Connect MetaMask</Button>
    
    )
}