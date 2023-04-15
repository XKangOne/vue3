<script setup>
// import { ref, reactive } from 'vue'
import { useAdminStore } from '~/store'
import { storeToRefs } from 'pinia'
// import { useRouter } from "vue-router"
import { useFullscreen } from '@vueuse/core'
// import { showModal, toast } from "~/composables/util"
// import { toast } from "~/composables/util"
// import { updatepassword } from "~/api/admin"
import FormDrawer from '~/components/FormDrawer.vue'
import { useLogout, useRepassword} from "~/composables/useAdmin"

//这边是有括号的不然没有反应
const { handleLogout } = useLogout()

const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle
} = useFullscreen()

// 刷新
const handleRefresh = () => location.reload()

const store = useAdminStore()

//拿的是store中 index.js 中的值
const { adminInfo,sideWidth} = storeToRefs(store)

//拿的是store中 index.js 中的函数 
// const { logout, handleSideWidth } = store
const { handleSideWidth } = store


const{
  formDrawerRef,
  form,
  rules,
  formRef,
  onSubmit,
  openRepasswordForm
} = useRepassword()


// const router = useRouter()

// const handleLogout = () => {
//   showModal("是否要退出登录？").then((res) => {
//     logout()
//       .finally(() => {
//         // 调用store的登出方法
//         logout()
//         // 跳转回登录页
//         router.push("/login")
//         // 提示退出登录成功
//         toast("退出登录成功")
//       })
//   })
// }

// 修改密码
// const showDrawer = ref(false)
// const formDrawerRef = ref(null)

// const rePassword = () => {
//   // showDrawer.value = true
//   formDrawerRef.value.open()
// }

// const form = reactive({
//   oldpassword: "123456",
//   password: "admin",
//   repassword: "admin"
// })

// const rePassRule = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('确认密码不能为空！'))
//   } else if (value !== form.password) {
//     callback(new Error("确认密码必须和新密码一致！"))
//   } else {
//     callback()
//   }
// }

// const rules = {
//   oldpassword: [
//     {
//       required: true,
//       message: '旧密码不能为空',
//       trigger: 'blur'
//     },
//   ],
//   password: [
//     {
//       required: true,
//       message: '新密码不能为空',
//       trigger: 'blur'
//     },
//   ],
//   repassword: [
//     {
//       validator: rePassRule,
//       trigger: 'blur'
//     }
//   ]
// }

// const formRef = ref(null)
// const loading = ref(false)

// const onSubmit = () => {
//   formRef.value.validate((valid) => {
//     if (!valid) {
//       return false
//     }
//     // loading.value = true

//     formDrawerRef.value.showLoading()
//     setTimeout(() => {
//       updatepassword(form)
//         .then((res) => {
//           console.log(res);
//           if (res.code == 1) {
//             toast("修改密码成功，请重新登录")
//             // showDrawer.value = false
//             // 调用 store 中的 logout 方法
//             logout().then(() => {
//               // 跳转回登录页
//               router.push("/login")
//             })
//           } else {
//             toast(res.msg, 'error')
//           }
//         })
//         .finally(() => {
//           formDrawerRef.value.hideLoading()
//         })
//     }, 1000);
//   })
// }

</script>

<template>
  <div class="f-header v-center">
    <div class="f-center text-xl transition-all duration-500" :style="{width:sideWidth}">
      <el-icon class="icon-btn">
        <ElementPlus />
      </el-icon>
      <span v-if="sideWidth == '220px'">极客空间</span>
    </div>

    <el-icon class="icon-btn" @click="handleSideWidth">
      <Fold v-if="sideWidth == '220px'" />
      <Expand v-else />
    </el-icon>


    <div class="ml-auto v-center">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
      <el-icon class="icon-btn" @click="toggle">
        <FullScreen v-if="!isFullscreen" />
        <Aim v-else />
      </el-icon>
      <el-icon class="icon-btn">
        <Printer />
      </el-icon>
      <el-icon class="icon-btn">
        <Setting />
      </el-icon>


      <el-dropdown class="dropdown">
         <span class="v-center text-light-50">
            <el-avatar class="mr-2" :size="25" :src="adminInfo.avatar" />
            {{ adminInfo.username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openRepasswordForm">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <FormDrawer ref="formDrawerRef" destroyOnClose @sumbit="onSubmit" title="修改密码">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>

  <!-- 抽屉 -->
  <!-- :close-on-click-modal="true" 点击阴影部分也能关闭 -->
  <!-- <el-drawer v-model="showDrawer" title="修改密码" size="35%" :close-on-click-modal="true">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" @click="onSubmit" :loading="loading">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer> -->
</template>

<style scoped>
.f-header {
  @apply bg-gradient-to-r from-sky-500 to-indigo-600 text-light-50 fixed top-0 left-0 right-0 h-16 shadow-xl shadow-gray-400;
}

.icon-btn {
  @apply flex justify-center items-center mx-1 cursor-pointer;
  width: 42px;
  height: 64px;
}

.icon-btn:hover {
  @apply bg-indigo-300;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}

.btn {
  @apply w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full;
}
</style>