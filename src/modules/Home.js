import React, { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { Box, Divider, Heading, Text, Link, Stack } from "@chakra-ui/react"
import { NFTs } from "../components/NFTs";
import Tokens from "../components/Tokens";
import Transactions from "../components/Transactions";
import { ErrorBox } from '../components/Error';


export const Home = () => {
    
    const { isAuthenticated, authError } =  useMoralis();
    const [address, setAddress] = useState(process.env.REACT_APP_PORTFOLIO_ADDRESS);
    
    useEffect(() => {
        if (isAuthenticated) {
        setAddress(process.env.REACT_APP_PORTFOLIO_ADDRESS);
        console.log("Address: " + address)
        }
    }, [isAuthenticated]);
    
    return(
        <Box>
            <Stack spacing={6}>
                {authError && ( <ErrorBox title="Authentication has failed" message={authError.message} />)}
            </Stack> 
            <Heading textAlign="center" size="lg" >Portfolio Summary</Heading>
            <Text mt={3 }textAlign="center">Portfolio Address: {" "}<Link href={"https://etherscan.io/address/" + address} isExternal>{address}</Link></Text>
            <Divider my={8} />
            <Tokens address={address}/>
            <Divider my={8} />
            <Transactions address={address}/>
            
        </Box>
        
        
    )
}