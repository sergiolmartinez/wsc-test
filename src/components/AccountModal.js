import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Avatar,
  useClipboard,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useMoralis } from "react-moralis";

type Props = {
  isOpen: any;
  onClose: any;
}

 export default function AccountModal({ isOpen,onClose }: Props) {
  const {isAuthenticated, logout, user, isAuthUndefined, Moralis} =  useMoralis();
  const [useraddress, setUserAddress] = useState();
  const { hasCopied, onCopy } = useClipboard(useraddress)


  function handleLogout(){
    logout();
    onClose();
  }
    
    useEffect(() => {
        if (isAuthenticated) {
        setUserAddress(user.attributes.ethAddress);
        }
    }, [isAuthenticated]);

  return (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
    <ModalOverlay />
    <ModalContent
      background="gray.900"
      border="1px"
      borderStyle="solid"
      borderColor="gray.700"
      borderRadius="3xl"
    >
      <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
        Account
      </ModalHeader>
      <ModalCloseButton
        color="white"
        fontSize="sm"
        _hover={{
          color: "whiteAlpha.700",
        }}
      />
      <ModalBody pt={0} px={4}>
        <Box
          borderRadius="3xl"
          border="1px"
          borderStyle="solid"
          borderColor="gray.600"
          px={5}
          pt={4}
          pb={2}
          mb={3}
        >
          <Flex justifyContent="space-between" alignItems="center" mb={3}>
            <Text color="gray.400" fontSize="sm">
              Connected with MetaMask
            </Text>
            <Button
              variant="outline"
              size="sm"
              borderColor="blue.800"
              borderRadius="3xl"
              color="blue.500"
              fontSize="13px"
              fontWeight="normal"
              px={2}
              height="26px"
              _hover={{
                background: "none",
                borderColor: "blue.300",
                textDecoration: "underline",
              }}
              onClick={handleLogout}>
              Change
            </Button>
          </Flex>
          <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
            <Avatar size="md" name={user.attributes.username} mr={3} />
            <Text
              color="white"
              fontSize="xl"
              fontWeight="semibold"
              ml="2"
              lineHeight="1.1"
            >
              {useraddress &&
                `${useraddress.slice(0, 6)}...${useraddress.slice(
                  useraddress.length - 4,
                  useraddress.length
                )}`}
            </Text>
          </Flex>
          <Flex alignContent="center" m={3}>
            <Button
              onClick={onCopy} 
              variant="link"
              color="gray.400"
              fontWeight="normal"
              fontSize="sm"
              _hover={{
                textDecoration: "none",
                color: "whiteAlpha.800",
              }}
            >
              <CopyIcon mr={1} />
              Copy Address
            </Button>
            <Link
              fontSize="sm"
              display="flex"
              alignItems="center"
              href={`https://etherscan.io/address/${useraddress}`}
              isExternal
              color="gray.400"
              ml={6}
              _hover={{
                color: "whiteAlpha.800",
                textDecoration: "underline",
              }}
            >
              <ExternalLinkIcon mr={1} />
              View on Etherscan
            </Link>
          </Flex>
        </Box>
      </ModalBody>

      <ModalFooter
        justifyContent="end"
        background="gray.700"
        borderBottomLeftRadius="3xl"
        borderBottomRightRadius="3xl"
        p={6}
      >
        <Text
          color="white"
          textAlign="left"
          fontWeight="medium"
          fontSize="md"
        >
          Your transactions will appear here...
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>)
}