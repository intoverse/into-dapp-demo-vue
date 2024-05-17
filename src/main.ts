import './assets/main.css'

import { createApp } from 'vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import App from './App.vue'
import {wagmiConfig} from "@/config";
const queryClient = new QueryClient()
createApp(App)
    .use(WagmiPlugin, { config:wagmiConfig })
    .use(VueQueryPlugin, { queryClient })
    .mount('#app')
