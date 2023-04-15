<script setup>
import { ref } from "vue";
const showDrawer = ref(false)

const props = defineProps({
    title:{
        type:String,
        default:"标题"
    },
    size:{
        type:String,
        default:"45%"
    },
    destroyOnClose:{
        type:Boolean,
        default: false
    },
    confirmText:{
        type:String,
        default:"提交"
    }
})

//让提交按钮有加载状态
const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

//打开
const open = ()=>showDrawer.value = true

//关闭
const close = ()=>showDrawer.value = false

//提交
const emit = defineEmits(["sumbit"])
const onSumbit = () => emit("sumbit")

//向父组件暴露以下方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})
</script>
<template>
   <el-drawer v-model="showDrawer" :title="title" :size="size" :destroy-on-close="destroyOnClose"
    :close-on-click-modal="true">
        <div class="form-drawer">
            <div class="body">
                <slot></slot>
            </div>

            <div class="actions">
                <el-button type="primary" @click="onSumbit" :loading="loading">{{confirmText}}</el-button>
                <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
   </el-drawer>
</template>

<style scoped>
.form-drawer{
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col
}

.form-drawer .body{
    flex: 1;
    position: absolute;
    top: 0;
}
.form-drawer .actions{
    height: 60px;
    @apply mt-auto flex items-center
}

</style>