<script setup lang="ts">
import {useWeb3Modal} from '@web3modal/wagmi/vue'
import {useAccount, useBalance, useDisconnect, useReadContract, useSignMessage, useWriteContract} from "@wagmi/vue";
import ERC20 from '../contract/abi/ERC20.json'
import {ChainId, USDT_ADDRESS} from "@/contract/address";
import {formatUnits, parseUnits} from "viem";

const { signMessageAsync } = useSignMessage()


const { disconnect } = useDisconnect()
// 4. Use modal composable
const modal = useWeb3Modal()
const {address,chainId,isConnected} = useAccount()
//签名
async function sign(){
  const signature = await signMessageAsync({
    message: 'gm wagmi frens'
  })
  console.log(signature)
}
// function getBalance(){
//   console.log(isConnected.value,chainId.value,address.value)
// // 读取合约数据
//   const usdtBalance = useReadContract({
//     abi:ERC20,
//     address: USDT_ADDRESS[chainId.value],
//     functionName: 'balanceOf',
//     args: [address.value],
//   })
//   console.log(usdtBalance)
// }
// 获取原生代币余额
const { data: balance } = useBalance({ address })
// 获取 USDT 余额
  const {data:usdtBalance} = useReadContract({
    abi:ERC20,
    address: USDT_ADDRESS[ChainId.BSC],
    functionName: 'balanceOf',
    args: [address],
  })
// 获取 USDT授权某个合约额度 直接转账transfer不需要授权 调用合约扣除自己代币的需要先授权
// 授权方法 approve 参数 合约地址 数量（一般MaxUint256）具体看 abi erc20
// export const MaxUint256: bigint = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const {data:allowance} = useReadContract({
  abi:ERC20,
  address: USDT_ADDRESS[ChainId.BSC],
  functionName: 'allowance',
  //自己地址 合约地址
  args: [address,address],
})
const { writeContractAsync } = useWriteContract()
async function transfer(){
  //转给谁
  const to = "0x6A6374400CBf4A30fEA48AE3DD12F7b9562288fd"
  //转多少 这里以 1 个 USDT 举例 因为区块链没有小数 USDT 的代币精度是 18 1个 USDT 在区块链上表示为 1*10**18
  const value = parseUnits("1",18) //库封装了方法
  const res = await writeContractAsync({
    abi:ERC20,
    address: USDT_ADDRESS[ChainId.BSC],
    functionName: 'transfer',
    args: [
      to,
      value
    ],
  })
  console.log(res)
}
</script>

<template>
   <h3>1.连接钱包</h3>
  <button @click="modal.open()">Open Connect Modal</button>
  <button @click="modal.open({ view: 'Networks' })">Open Network Modal</button>
  <button @click="disconnect()">断开连接</button>
  <h3>2.获取钱包信息</h3>
  <p>address:{{ address }}</p>
  <p>chainId:{{ chainId }}</p>
  <h3>3.签名</h3>
  <button @click="sign()">sign message</button>
  <h3>4.查询 bsc 余额</h3>
  <p>BNB: {{balance && formatUnits(balance.value,18)}}</p>
  <p>USDT: {{usdtBalance && formatUnits(usdtBalance,18)}}</p>
  <h3>5.转账</h3>
  <button @click="transfer()">transfer</button>
  <h3>6.查询 授权合约额度</h3>
  <p> allowance: {{allowance && formatUnits(allowance,18)}}</p>
</template>

