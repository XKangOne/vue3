<script setup>

</script>

<template>
  <!-- <div class="bg-pink-200 m-10 p-5"> -->
    <!-- <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">warning</el-button>
        <el-button type="danger">Danger</el-button>
    </el-row> -->
    <!-- <button class="btn">按钮</button>
  </div>   -->
  <RouterView></RouterView> 
</template>
  
<style >

#nprogress .bar{
  background-color: #3cb6ea !important;
  height: 5px !important;
}
.f-center{
  @apply flex justify-center items-center;
}
.f-around{
  @apply flex justify-around items-center
}
.f-between{
  @apply flex justify-between items-center
}
.v-center{
  @apply flex items-center
}
</style>