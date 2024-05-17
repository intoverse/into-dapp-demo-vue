import { http, createConfig } from '@wagmi/vue'
import {bsc, mainnet, sepolia} from '@wagmi/vue/chains'
import {defaultWagmiConfig} from "@web3modal/wagmi/vue";
import {arbitrum} from "@wagmi/core/chains";
// @ts-expect-error 1. Get projectId
export const projectId = '5bad4b7459c1bdcb4d4972a1227b03c2'

// 2. Create wagmiConfig
export const chains = [mainnet, arbitrum,bsc]

export const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata: {
        name: 'Web3Modal Vue Example',
        description: 'Web3Modal Vue Example',
        url: '',
        icons: [],
        verifyUrl: ''
    }
})
