<script setup>
import { getVerifyCodeImg } from '@/api/user'

const sendData = reactive({
  isSendedMessage: false,
  count: 60,
  interval: null
})
// 获取验证码
const sendMessage = () => {
  sendData.isSendedMessage = true
  disCount(60)
  getVerifyCodeImg().then((res) => {

  })
}
const disCount = (val) => {
  sendData.count = val
  sendData.interval = setInterval(function () {
    sendData.count--
    console.log(sendData.count)
  }, 1000)
}

watch(() => sendData.count, (newValue, oldValue) => {
  if(newValue <= 0) {
    sendData.isSendedMessage = false
    clearInterval(sendData.interval)
    sendData.count = 60
  }
})

onBeforeUnmount(() => {
  clearInterval(sendData.interval)
  sendData.interval = null
})
</script>

<template>
  <div>
    <div
      v-if="!sendData.isSendedMessage"
      @click="sendMessage"
      class="w-24 h-8 bg-indigo-400 cursor-pointer rounded-lg text-white text-center ml-2 leading-8"
    >
      发送验证码
    </div>
    <div v-else class="w-24 h-8 bg-gray-400 cursor-not-allowed rounded-lg text-white text-center ml-2 leading-8">
      已发送 {{ sendData.count }} 秒
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
