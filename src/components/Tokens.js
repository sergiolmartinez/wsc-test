import { Box, Heading, ListItem, UnorderedList, Stack } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralisWeb3Api  } from "react-moralis";


export const Tokens = () => {
    
    const Web3Api = useMoralisWeb3Api();
    const address = '0x6C025d31aEA85942488c9a67E17138B6752b29f8';
    const [tokens, setTokens] = useState([]);
    const [showTokens, setShowTokens] = useState(true);

    useEffect(() => {
        getBalance();
        }, []);

    const getBalance = async () => {
        const balances = await Moralis.Web3.getAllERC20({address: address});
        setTokens((tokens) => [...tokens, ...balances]);
      };


    return(
        <Box>
            <Heading size="lg" mt={3}>List of Token Balances </Heading>

                <Stack direction={['column', 'row']} spacing='24px'>
                    {tokens.map((bal) => (
                    <Box key={bal.id}>
                        {bal.name} :{" "}
                        <span>
                        {(bal.balance / Math.pow(10, bal.decimals)).toFixed(6)}{" "}
                        </span>
                    </Box>
                    ))}
                </Stack>
        </Box>
 
    )
}