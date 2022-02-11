import { Text, Box, Button, IconButton } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";


export const UserBalance = () => {

    const {user, Moralis, isAuthenticated, logout} =  useMoralis();  
    const [balance, setBalance] = useState(0);

    const [useraddress, setUserAddress] = useState();
    
    useEffect(() => {
        if (isAuthenticated) {
        setUserAddress(user.attributes.ethAddress);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        getBalance();
        }, []);

    async function getBalance() {
        // get native balance for the current user
        const result = await Moralis.Web3API.account.getNativeBalance({address: useraddress});
        const balance = setBalance(Moralis.Units.FromWei(result.balance));
    }

    return(
            <Box px="3">
                <Text color="white" fontSize="md">
                {Number(balance).toFixed(3)} ETH
                </Text>
            </Box>   
    )
}