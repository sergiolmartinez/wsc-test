import { Box, Heading, ListItem, UnorderedList, Image, Text, HStack, VStack, StackDivider } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralis  } from "react-moralis";
import ImageParser from "./ImageParser";


export const NFTs = () => {
    
    const [nfts, setNfts] = useState([]);
    const { isAuthenticated } =  useMoralis();
    const [address, setAddress] = useState(process.env.REACT_APP_PORTFOLIO_ADDRESS);
    
    useEffect(() => {
        if (isAuthenticated) {
        setAddress(process.env.REACT_APP_PORTFOLIO_ADDRESS);
        console.log("Address: " + address)
        }
    }, [isAuthenticated]);

    useEffect(() => {
        getNFTs();
        }, []);

    const getNFTs = async () => {
        const nftlist = await Moralis.Web3.getNFTs({address: address});
        setNfts((nfts) => [...nfts, ...nftlist]);
      };

      console.log(nfts);


    return(
        <Box>
            <Heading mt={3}>NFTs in the Portfolio </Heading>
                
                <VStack 
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'>
                    {nfts.map((n) => (
                    <Box key={n.id}>
                        <Text> {n.name} :{" "}{n.token_id}</Text>
                        <Box>
                            <ImageParser uri={n.token_uri}/>
                        </Box>                        
                    </Box>
                    ))}
                </VStack>
        </Box>
 
    )
}