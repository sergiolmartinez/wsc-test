import { Box, Heading, Text, VStack, StackDivider, Link } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";



export default function Transactions({address}) {
    
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions();
        }, []);

      async function getTransactions() {
        // get mainnet transactions for the current user
        const userTrans = await Moralis.Web3.getTransactions({address: address});
        
        setTransactions((transactions) => [...transactions, ...userTrans.result]);
      }

        console.log(transactions)

    return(
        <Box>            
            <Heading textAlign="center" size="lg" mt={3}>Transactions </Heading>
            <VStack 
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'my={3}>                
                    {transactions.map((item) => (
                    <Box key={item.id}>
                            <Text>Block Number: {item.block_number}{" "}</Text>
                            <Text>Time: {item.block_timestamp}{" "}</Text>
                            <Text>Value: {Moralis.Units.FromWei(item.value)}{" "}</Text>
                            <Text> Outgoing address: {item.to_address}{" "}</Text>
                            <Text>Etherscan: {" "}<Link href={"https://etherscan.io/tx/" + item.hash} isExternal>{item.hash}</Link></Text>
                        </Box>
                    ))}
                
            </VStack>
        </Box>
        
        
    )
}