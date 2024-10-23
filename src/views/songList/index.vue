<template>
  <div>
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <el-pagination
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'songList',
})
import { getCode } from '@/api/countries'
// const input = ref()
onMounted(() => {
  getCode().then(res => {
    console.log(res)
  })
})
//
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
const currentPage2 = ref(5)
const pageSize2 = ref(100)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped></style>
