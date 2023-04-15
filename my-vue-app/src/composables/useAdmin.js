import { useRouter } from "vue-router";
import {useAdminStore} from '~/store'
import { updatepassword } from "~/api/admin";
import {showModal,toast} from '~/composables/util'
import { ref, reactive } from "vue";

//登录
export function useLogin(){

}

//引入一个管理员修改密码的功能
export function useRepassword(){
    const router = useRouter()
    const store = useAdminStore()
    const {logout} = store
    const formDrawerRef = ref(null)
    const openRepasswordForm = () => formDrawerRef.value.open()

    const form = reactive({
        oldpassword: "123456",
        password: "admin",
        repassword: "admin"
      })

      const rePassRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空！'))
        } else if (value !== form.password) {
          callback(new Error("确认密码必须和新密码一致！"))
        } else {
          callback()
        }
      }
      
      const rules = {
        oldpassword: [
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          },
        ],
        repassword: [
          {
            validator: rePassRule,
            trigger: 'blur'
          }
        ]
      }
      
      const formRef = ref(null)
      
      const onSubmit = () => {
        formRef.value.validate((valid) => {
          if (!valid) {
            return false
          }
      
        formDrawerRef.value.showLoading()
          setTimeout(() => {
            updatepassword(form)
              .then((res) => {
                console.log(res);
                if (res.code == 1) {
                  toast("修改密码成功，请重新登录")
                  // showDrawer.value = false
                  // 调用 store 中的 logout 方法
                  logout().then(() => {
                    // 跳转回登录页
                    router.push("/login")
                  })
                } else {
                  toast(res.msg, 'error')
                }
              })
              .finally(() => {
                formDrawerRef.value.hideLoading()
              })
          }, 2000);
        })
      }
      return{
        formDrawerRef,form,rules,formRef,openRepasswordForm,onSubmit
      }
}

//退出
export function useLogout(){
    const router = useRouter()
    const store = useAdminStore()
    const {logout}  = store 
    const handleLogout = () =>{
        showModal('是否要退出登录？').then(() =>{
            logout().then(()=>{
                router.push('/login')
                toast('退出登录')
                // console.log('退出成功')
            })
            // alert('ok')
            // console.log('退出成功')
        })
    }
    return{
        handleLogout
    }
}