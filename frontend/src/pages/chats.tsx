import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Chat.module.css";
import {
  Button,
  HStack,
  Input,
  InputAddon,
  Group,
  IconButton,
  Stack,
  Container,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { EmptyState } from "@/components/ui/empty-state";
import { InputGroup } from "@/components/ui/input-group";
import { useColorModeValue } from "@/components/ui/color-mode";
import { BsSend } from "react-icons/bs";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ZK E2E Chat App - Chats</title>
        <meta
          content="Zero Knowledge End-to-End Encrypted Chat App"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Flex
          maxW={"6xl"}
          mx={"auto"}
          width={"100%"}
          bg={useColorModeValue("gray.100", "gray.900")}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack borderRight={"1px solid"} borderColor={"gray.800"} w={"30%"}>
            <Box
              p={4}
              borderBottom={"1px solid"}
              borderColor={"gray.800"}
              bg={useColorModeValue("gray.200", "gray.800")}
            >
              <Heading size={"md"} mb={0}>
                Chat List
              </Heading>
            </Box>
            <Stack
              gap={2}
              p={2}
              overflowY={"auto"}
              height={"calc(100vh - 12rem)"}
            >
              {
                // Add more chat list items here
                Array.from({ length: 10 }).map((_, i) => (
                  <Box
                    key={i}
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    cursor={"pointer"}
                    transition={"background 0.3s ease"}
                    _hover={{
                      bg: useColorModeValue("gray.200", "gray.800"),
                    }}
                  >
                    Netrobe
                  </Box>
                ))
              }
            </Stack>
          </Stack>
          <Box style={{ width: "70%" }}>
            <Box
              display={"none"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <EmptyState
                icon={<LuShoppingCart />}
                title="No chat selected"
                description="Please select a chat to start chatting."
              />
            </Box>
            <Box>
              <Flex p={4} borderBottom={"1px solid"} borderColor={"gray.800"}>
                <Box>
                  <Heading size={"md"} mb={0}>
                    Chat with Netrobe
                  </Heading>
                </Box>
              </Flex>

              <Box>
                <Stack
                  gap={2}
                  p={2}
                  overflowY={"auto"}
                  height={"calc(100vh - 15rem)"}
                >
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.100", "black")}
                    maxW={"50%"}
                    marginLeft={"auto"}
                  >
                    Code + Eat + Sleep.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.200", "gray.800")}
                    maxW={"50%"}
                    marginRight={"auto"}
                  >
                    Code + Eat + Sleep.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.200", "gray.800")}
                    maxW={"50%"}
                    marginRight={"auto"}
                  >
                    korem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.100", "black")}
                    maxW={"50%"}
                    marginLeft={"auto"}
                  >
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.100", "black")}
                    maxW={"50%"}
                    marginLeft={"auto"}
                  >
                    Code + Eat + Sleep.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.200", "gray.800")}
                    maxW={"50%"}
                    marginRight={"auto"}
                  >
                    Code + Eat + Sleep.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.200", "gray.800")}
                    maxW={"50%"}
                    marginRight={"auto"}
                  >
                    korem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi.
                  </Box>
                  <Box
                    p={4}
                    rounded={"md"}
                    border={"1px solid"}
                    borderColor={"gray.800"}
                    bg={useColorModeValue("gray.100", "black")}
                    maxW={"50%"}
                    marginLeft={"auto"}
                  >
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi.
                  </Box>
                </Stack>
              </Box>

              <Flex
                p={4}
                gap={4}
                borderTop={"1px solid"}
                borderColor={"gray.800"}
              >
                <Input
                  placeholder="Type a message"
                  rounded={"full"}
                  size={"lg"}
                />
                <IconButton
                  aria-label="Send message"
                  rounded={"full"}
                  bg={useColorModeValue("blue.500", "blue.200")}
                >
                  <BsSend />
                </IconButton>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </main>
    </div>
  );
};

export default Home;
