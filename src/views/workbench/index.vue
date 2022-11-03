<script setup>
const name = import.meta.env.VITE_PROJECT_NAME
</script>

<template>
  <div class="app-container">
    <div class="bg-primary rounded px-4 py-1 text-white mb-4">{{ name }} 项目:</div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>平台简介</span>
        </div>
      </template>
      <div class="font-sans text-sm container-wrap">
        <div>
          <div>1、技术栈：</div>
          <svg-icon name="element-plus-logo"/>
          <svg-icon name="tailwindcss" />
        </div>
        <p>2、项目用途：轻量级前端项目模版，完成登录及系统管理功能及后台管理交互，方便二次开发。</p>
        <p>3、使用流程：</p>
        <p>（1）省卫健委发文通知开始填报</p>
        <p>（2）各市登录账号根据要求填报数据（组织实施情况部分、考核指标部分），提交资料</p>
        <p>（3）省各相关机构、部门登录系统填写各市考核指标部分的数据，工作组登录评判市级提交的组织实施情况部分的得分</p>
        <p>（4）统计分析</p>
        <p>注：其中2、3部分流程不关联，无顺序要求，正常情况是先2后3，也可以根据情况先3后2，只要最后都完成即可</p>
        <p>
          5、业务功能：系统整体分为数据填报、数据复核、统计分析3大部分，相关组件定义见组件定义Excel文件，因业务流程不复杂，不再单独编写PRD文档
        </p>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 80px;
  display: inline-block;
  margin-left: 30px;
}
.container-wrap {
  > p {
    margin-bottom: 10px;
  }
}
</style>
