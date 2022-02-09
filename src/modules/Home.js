import { Box, Divider, Heading, Text, Link } from "@chakra-ui/react"
import { NFTs } from "../components/NFTs";
import { Tokens } from "../components/Tokens";
import { Transactions } from "../components/Transactions";


export const Home = () => {
    
    const address = '0x6C025d31aEA85942488c9a67E17138B6752b29f8';
    
    return(
        <Box>
            <Heading textAlign="center" size="lg" >Home</Heading>
            <Text mt={3 }textAlign="center">Address: {" "}<Link href={"https://etherscan.io/address/" + address} isExternal>{address}</Link></Text>
            <Divider my={8} />
            <Tokens />
            <Divider my={8} />
            <Transactions />
            
        </Box>
        
        
    )
}