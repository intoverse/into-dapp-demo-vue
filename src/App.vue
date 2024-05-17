<script setup>

import { arbitrum, mainnet } from '@wagmi/core/chains'
import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme
} from '@web3modal/wagmi/vue'
import Home from './components/Home.vue'
import {chains, projectId, wagmiConfig} from "@/config.ts";


// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light'
})


</script>

<template>
 <Home></Home>
</template>
