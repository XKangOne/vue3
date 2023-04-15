<script setup>
// // 定义一个form对象，用来放数据
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
// import { adminLogin } from '~/api/http';

// import { toSafeInteger } from 'lodash';

// // import {ElNotification} from 'element-plus'
import { toast } from '~/composables/util';


// // import { useCookies} from '@vueuse/integrations/useCookies'
// import { setToken} from '~/utils/auth'

import { useAdminStore } from '~/store'

const router = useRouter()
const store = useAdminStore()

const { login } = store

const form = reactive({
    username:'admin',
    password:'123456'
})
const rules = ({
    username:[
        {
            // 是否为必须
            required:true,
            message:'用户名不能为空',
            // 离开输入框立马校验
            trigger:'blur'
        }
    ],
    password:[
        {
            required:true,
            message:'密码不能为空',
            trigger:'blur'
        }
    ]
})
// 跟表单相互联动
const formRef = ref(null)
const loading = ref(false)

// const onsubmit = () =>{ 
//     formRef.value.validate((valid)=>{
//         if(!valid){
//             return false;
//         }
//         loading.value = true

//         console.log(form);
//             // 向后台发请求
//             // console.log('验证通过');
//         // 发请求
//         adminLogin(form.username, form.password)
//             .then((res)=>{
//                 console.log(res);
//                 // alert(res.data.data)

//                 if(res.code===200){

//                 // 将token存入cookie
//                     // const cookie = useCookies()
//                     // cookie.setToken('admin-token',res.data.token)
//                     setToken(res.data.token)
//                      // 提示登录成功
//                     // ElNotification({
//                     //     message:'登录成功',
//                     //     type:'success',
//                     //     duration:2000
//                     // })
//                     setStoreToken(res.data.token)
//                     toast('登录成功')
//                     router.push('/')

//                 }else{
//                     // 提示失败
//                     // ElNotification({
//                     //     message:  '登录失败',
//                     //     type:'error',
//                     //     duration:2000
//                     // })
//                     toast('登录失败','error')
//                 }
//             }).finally(()=>{
//                 loading.value = false
//             })
//             // .catch((err) =>{
//             //     console.log(err);
               
//             // })
//     })
// }

const onsubmit = () =>{
    formRef.value.validate((valid) =>{
        if(!valid){
            return false;
        }

        loading.value = true

        setTimeout(() =>{  
            login(form.username,form.password).then((res)=>{
                console.log(res)
                toast(res.msg)
                if(res.code === 1){
                    router.push('/')
                }
                loading.value = false
            })
        },1000)
    })
}

//监听回车事件
function onKeyUp(e){
    if(e.key == "Enter") onSubmit()
}

//添加键盘监听
onMounted(() =>{
    document.addEventListener("keyup",onKeyUp)
})

//移除键盘监听
onBeforeUnmount(() =>{
   document.removeEventListener("keyup",onKeyUp)
})
</script>

<template>
    <div>
        <el-row class="w-full h-screen bg">
            <el-col :lg="12" :md="12" class="bg-indigo-500 flex justify-center items-center bg-indigo-500 text-light-50 flex-col ">
                <p class=" text-5xl font-bold mb-4">shop admin</p>
                <p class=" text-3xl">基于vue3和vite后台管理系统</p>
            </el-col>
            <el-col :lg="12" :md="24" class="flex flex-col justify-center items-center">
                <h2>后台登录</h2>
                <div class="flex justify-center items-center my-5 space-x-2">
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                    <span>账号密码登录</span>
                    <span class="h-[1px] w-16 bg-gray-200"></span>
                </div>

                <el-form :model="form" :rules="rules" ref="formRef" class="w-[50%]">
                    <el-form-item label="Username" prop="username">
                        <el-input placeholder="Username" v-model="form.username">
                            <template #prefix>
                                <el-icon>
                                    <user/>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Password" prop="password">
                        <el-input type="password" placeholder="Password" v-model="form.password" show-password>
                        <template #prefix>
                                <el-icon>
                                    <lock></lock>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item >
                        <el-button class="w-full py-3 bg-indigo-600 text-white rounded-full text-lg" @click="onsubmit" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>

</style>