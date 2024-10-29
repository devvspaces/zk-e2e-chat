import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Button,
  HStack,
  Input,
  InputAddon,
  Group,
  IconButton,
  For,
} from "@chakra-ui/react";
import { LuSearch, LuShoppingCart } from "react-icons/lu";
import { EmptyState } from "@/components/ui/empty-state";
import ZkChat from "../../../backend/out/ZkChat.sol/ZkChat.json";
import { CA } from "../lib/constants";
import { User } from "../lib/interface";
import { useAccount, useReadContract } from "wagmi";

const Home: NextPage = () => {
  const { address } = useAccount();
  console.log("address", address)
  const {
    data: _profileData,
  } = useReadContract({
    abi: ZkChat.abi,
    address: CA,
    args: [address],
    functionName: "getUser",
  });
  const profileData = _profileData as User | undefined;
  const { data: _users } = useReadContract({
    abi: ZkChat.abi,
    address: CA,
    functionName: "getPublicUsers",
  });
  console.log("_users", _users)
  console.log("profileData", profileData)
  const publicUsers = ((_users || []) as User[]).filter((user) => user.username && profileData?.username != user.username);
  return (
    <div className={styles.container}>
      <Head>
        <title>ZK E2E Chat App</title>
        <meta
          content="Zero Knowledge End-to-End Encrypted Chat App"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">ZK E2E Chat</a> +{" "}
          <a href="https://nextjs.org">Aligned!</a>
        </h1>

        <Group attached w={"100%"} maxW={"500px"} mt={5} mb={10}>
          <Input size="xl" placeholder="Search for user address" />
          <IconButton size="xl" aria-label="Search database">
            <LuSearch />
          </IconButton>
        </Group>

        <div className={styles.grid}>
          <For
            each={publicUsers}
          >
            {(user, index) => (
              <a key={index} className={styles.card} href={`/chats?selected=${user.username}`}>
              <h2>{user.username} &rarr;</h2>
              <p>{user.bio}</p>
            </a>
            )}
          </For>
        </div>

        {publicUsers.length == 0 && (
          <EmptyState
            icon={<LuShoppingCart />}
            title="No public users found"
            description="No public users found. Please try again later."
          />
        )}
      </main>
    </div>
  );
};

export default Home;
