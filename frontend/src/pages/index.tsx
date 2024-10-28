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
} from "@chakra-ui/react";
import { LuSearch, LuShoppingCart } from "react-icons/lu";
import { EmptyState } from "@/components/ui/empty-state";
import { InputGroup } from "@/components/ui/input-group";

const Home: NextPage = () => {
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

        <Group attached w={'100%'} maxW={'500px'} mt={5} mb={10}>
          <Input size="xl" placeholder="Search for user address" />
          <IconButton size="xl" aria-label="Search database">
            <LuSearch />
          </IconButton>
        </Group>

        <div className={styles.grid}>
          <a className={styles.card} href="https://rainbowkit.com">
            <h2>Netrobe &rarr;</h2>
            <p>Code + Eat + Sleep.</p>
          </a>
        </div>

        <EmptyState
          icon={<LuShoppingCart />}
          title="No public users found"
          description="No public users found. Please try again later."
        />
      </main>
    </div>
  );
};

export default Home;
