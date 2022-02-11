import { Text, Box, Button, IconButton } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Avatar } from "@chakra-ui/react";
import { MdLogout } from 'react-icons/md';
import { Auth } from "./Auth";
import { UserBalance } from "./UserBalance";

type Props = { handleOpenModal: any; }

export const ConnectButton = ({handleOpenModal } : Props) => {

    const {user, isAuthenticated } =  useMoralis();  
    const [useraddress, setUserAddress] = useState();
    
    useEffect(() => {
        if (isAuthenticated) {
        setUserAddress(user.attributes.ethAddress);
        }
    }, [isAuthenticated]);

    return(
        // <Text>{Number(balance).toFixed(3)} ETH</Text> 
        isAuthenticated ? (
        <Box
            display="flex"
            alignItems="center"
            background="gray.700"
            borderRadius="xl"
            py="0"
            >
            <UserBalance />
            <Button
                onClick={handleOpenModal}
                bg="gray.800"
                border="1px solid transparent"
                _hover={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "blue.400",
                backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                m="1px"
                px={3}
                height="38px"
            >
                <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                {/* check account is defined and then slice the string */}
                {useraddress &&
                    `${useraddress.slice(0, 6)}...${useraddress.slice(
                        useraddress.length - 4,
                        useraddress.length
                    )}`}
                </Text>
                <Avatar size="xs" name={user.attributes.username} mr={3} />
            </Button>
        </Box>
        ) : (
            <Auth />
        )   
    )
}