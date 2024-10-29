import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Stack,
  Center,
  Fieldset,
  Input,
  createListCollection,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { Avatar } from "@/components/ui/avatar";
import { FiMoon } from "react-icons/fi";
import { LuSun } from "react-icons/lu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
import { useEffect, useState } from "react";
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
import {
  useAccount,
  useAccountEffect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toaster } from "@/components/ui/toaster";
import ZkChat from "../../../../backend/out/ZkChat.sol/ZkChat.json";
import { CA } from "../../lib/constants"
import { User } from "../../lib/interface"


interface Props {
  children: React.ReactNode;
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isProfileSet, setIsProfileSet] = useState(false);
  const navigate = useRouter();

  const frameworks = createListCollection({
    items: [
      { label: "Nigeria", value: "NG" },
      { label: "Ghana", value: "GH" },
      { label: "Kenya", value: "KE" },
      { label: "South Africa", value: "SA" },
    ],
  });

  const { isConnected, address } = useAccount();
  const {
    data: _profileData,
  } = useReadContract({
    abi: ZkChat.abi,
    address: CA,
    args: [address],
    functionName: "getUser",
  });
  const profileData = _profileData as User | undefined;

  const {
    writeContract: saveUserProfile,
    error: saveUserProfileError,
    failureReason: saveUserProfileFailureReason,
  } = useWriteContract({
    mutation: {
      onMutate: function () {
        setIsSaving(true)
      },
      onSettled: function () {
        setIsSaving(false)
      },
      onSuccess: function () {
        toaster.create({
          title: "Success",
          description: "Saved user profile data",
          type: "success",
        });
      },
      onError: function (error) {
        console.log(error.cause);
        console.log(error.message);
        toaster.create({
          title: "Failed",
          description: "Error saving user profile data",
          type: "error",
        });
      },
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      bio: "",
      isPublic: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      bio: Yup.string().required("Required"),
      isPublic: Yup.boolean().required("Required"),
    }),
    onSubmit: async (values) => {
      saveUserProfile({
        abi: ZkChat.abi,
        address: CA,
        functionName: "updateUser",
        args: [values.username, values.bio, values.isPublic],
      });
    },
  });

  useEffect(() => {
    if (profileData && !isProfileSet) {
      formik.setValues({
        username: profileData.username || "",
        bio: profileData.bio || "",
        isPublic: profileData.isPublic || false,
      });
      setIsProfileSet(true);
    }
  }, [profileData, formik, isProfileSet]);

  return (
    <>
      <Toaster />
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

              <form onSubmit={formik.handleSubmit}>
                <Fieldset.Content>
                  <Field
                    label="Username"
                    id="username"
                    invalid={
                      !!formik.errors.username && formik.touched.username
                    }
                  >
                    <Input
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                  </Field>

                  <Field
                    id="isPublic"
                    orientation="horizontal"
                    label="Make public"
                  >
                    <Switch
                      name="isPublic"
                      checked={formik.values.isPublic}
                      onChange={(e) => {
                        formik.setFieldValue("isPublic", (e.target as any).checked)
                      }}
                    />
                  </Field>

                  <Field label="Bio" id="bio">
                    <Textarea
                      name="bio"
                      placeholder="Little bit about you..."
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bio}
                    />
                  </Field>

                  <Field>
                    <SelectRoot collection={frameworks} size="sm" width="320px">
                      <SelectLabel>Select country</SelectLabel>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select your country" />
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
              </form>
            </Fieldset.Root>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button
              loading={isSaving}
              loadingText="Saving..."
              onClick={(e) => {
                formik.submitForm();
              }}
            >
              Save
            </Button>
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
                  <MenuItem
                    value="a"
                    onClick={() => {
                      navigate.push("/chats");
                    }}
                  >
                    Your Chats
                  </MenuItem>
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
