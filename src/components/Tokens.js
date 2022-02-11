import { Container, Heading, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";

export default function Tokens({address}) {
    
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        getBalance();
        }, []);

    const getBalance = async () => {
        const balances = await Moralis.Web3.getAllERC20({address: address});
        setTokens((tokens) => [...tokens, ...balances]);
      };

      console.log(tokens)

    return(
        <Container maxW='xl' my={3} centerContent> 
            <Heading as="h2" size="md">Token Balances</Heading>
            <Table size='sm' my={3}>
                <Thead>
                    <Tr>
                        <Th>Token</Th>
                        <Th>Balance</Th>
                        <Th isNumeric>Value USD</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tokens.map((bal) => (
                    <Tr key={bal.id}>
                        <Td>{bal.symbol}</Td>
                        <Td>{(bal.balance / Math.pow(10, bal.decimals)).toFixed(6)}{" "}</Td>
                        <Td isNumeric>$ X,XXX.XX</Td>
                    </Tr>))}
                </Tbody>      
        </Table>
      </Container>
 
    )
}