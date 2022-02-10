import { Box, Heading, ListItem, UnorderedList, Image, Text, HStack, VStack, StackDivider } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import Moralis from "moralis";
import { useMoralisWeb3Api  } from "react-moralis";


export default function ImageParser({uri}) {
    
    const [img, setImg] = useState('');

    useEffect(() => {
        const url = uri;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json.image);
                setImg(json.image);
            } catch(error) {
                console.log("error", error);
            }
        };

        fetchData();

        }, []);
        
    return(
        <Image 
            boxSize='100px'
            objectFit='cover'
            src={img}
            alt='NFT Image' />
    )
}