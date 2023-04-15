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
    conirmText:{
        type:String,
        default:"提交"
    }
})

//打开
const open = ()=>showDrawer.value = true

//关闭
const close = ()=>showDrawer.value = false

//向父组件暴露以下方法
defineExpose({
    open,close
})
</script>
<template>
   <el-drawer v-model="showDrawer" title="修改密码" size="45%" :close-on-click-modal="true">
        <div class="form-drawer">
            <div class="body">
                <slot></slot>
            </div>

            <div class="actions">
                <el-button type="primary">提交</el-button>
                <el-button type="default">取消</el-button>
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