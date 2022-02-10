import { Box, Heading, ListItem, UnorderedList, Image, Text, HStack, VStack, StackDivider } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralisWeb3Api  } from "react-moralis";
import ImageParser from "./ImageParser";


export const NFTs = () => {
    
    const Web3Api = useMoralisWeb3Api();
    const address = '0x6C025d31aEA85942488c9a67E17138B6752b29f8';
    const [nfts, setNfts] = useState([]);

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