<script setup>
import ErrorLayout from "./components/ErrorLayout.vue"
import Svg403 from "@/assets/image/403.svg"
</script>

<template>
  <ErrorLayout>
    <div class="flex items-center">
      <div class="mr-20 antialiased text-gray-600">
        <div class="text-2xl font-medium mb-2">403</div>
        <div>你似乎来到了没有知识存在的荒原</div>
      </div>
      <Svg403 />
    </div>
  </ErrorLayout>
</template>
