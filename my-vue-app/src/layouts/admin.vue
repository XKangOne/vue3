<script setup>
import FMenu from '../layouts/components/FMenu.vue'
import FHeader from '../layouts/components/FHeader.vue'
import FTagList from '../layouts/components/FTagList.vue'
</script>

<template>
<el-container>
    <el-header>
        <f-header/>
    </el-header>

    <el-container>
        <el-aside>
            <f-menu></f-menu>
        </el-aside>
        <el-main>
            <f-tag-list></f-tag-list>
            <RouterView></RouterView>
        </el-main>
    </el-container>
</el-container>
</template>

<style scoped>

</style>