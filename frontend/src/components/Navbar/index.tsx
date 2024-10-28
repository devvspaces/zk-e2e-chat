import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  Stack,
  Center,
  Fieldset,
  Input,
  createListCollection,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { Avatar } from "@/components/ui/avatar";
import { FiMoon } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  return (
    <>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Fieldset.Root size="lg" maxW="md">
              <Stack>
                <Fieldset.HelperText>
                  Please provide your account details below.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field label="Username">
                  <Input name="username" />
                </Field>

                <Field orientation="horizontal" label="Make public">
                  <Switch />
                </Field>

                <Field label="Bio">
                  <Textarea placeholder="Little bit about you..." />
                </Field>

                <Field>
                  <SelectRoot collection={frameworks} size="sm" width="320px">
                    <SelectLabel>Select country</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText placeholder="Select movie" />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.items.map((movie) => (
                        <SelectItem item={movie} key={movie.value}>
                          {movie.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
              </Fieldset.Content>
            </Fieldset.Root>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          maxW={"6xl"}
          mx={"auto"}
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <a href="/">
              <Heading size={"lg"} mb={0}>
                ZK E2E Chat
              </Heading>
            </a>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} gap={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FiMoon /> : <LuSun />}
              </Button>

              <ConnectButton showBalance={false} />

              <MenuRoot>
                <MenuTrigger>
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuTrigger>
                <MenuContent alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  {/* <Divider /> */}
                  <MenuItem value="a" onClick={() => {
                    navigate.push("/chats");
                  }}>Your Chats</MenuItem>
                  <MenuItem value="b" onClick={() => setOpen(true)}>
                    Account Settings
                  </MenuItem>
                  <MenuItem value="c">Logout</MenuItem>
                </MenuContent>
              </MenuRoot>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
