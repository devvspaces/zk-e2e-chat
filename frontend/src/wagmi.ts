import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { holesky } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ZK E2E Chat App",
  projectId: "72293644363bd9dd4eb4f3a58838219b",
  chains: [holesky],
  ssr: true,
});
