<script setup>
import {useAdminStore} from '~/store'
import FMenu from '../layouts/components/FMenu.vue'
import FHeader from '../layouts/components/FHeader.vue'
import FTagList from '../layouts/components/FTagList.vue'
import { storeToRefs } from 'pinia'

const store = useAdminStore()
const {sideWidth} = storeToRefs(store)
</script>

<template>
<el-container>
    <el-header>
        <f-header/>
    </el-header>

    <el-container>
        <el-aside :style="{ width: sideWidth}">
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
.el-main{
    @apply w-full h-screen bg-sky-300
}
</style>