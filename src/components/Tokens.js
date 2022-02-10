import { Box, Heading, ListItem, UnorderedList, HStack, Text } from "@chakra-ui/react"
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

      console.log(tokens)

    return(
        <Box>
            <Heading textAlign="center" size="lg" my={3}>Token Balances </Heading>

                <HStack align="center" spacing={8}>
                    {tokens.map((bal) => (
                    <Box 
                        p={5}
                        align="center"
                        shadow='md'
                        borderWidth='1px'
                        flex='1'
                        borderRadius='md'
                        key={bal.id}>
                            <Heading size="sm">{bal.name}</Heading>
                            <Text>
                            {(bal.balance / Math.pow(10, bal.decimals)).toFixed(6)}{" "}
                            </Text>
                    </Box>
                    ))}
                </HStack>
        </Box>
 
    )
}