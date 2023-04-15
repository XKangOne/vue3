import { useRouter } from "vue-router";
import {useAdminStore} from '~/store'
import {showModal} from '~/composables/util'
import { toast } from '~/composables/util';

//登录
export function useLogin(){

}

//引入一个管理员修改密码的功能
export function useRepassword(){

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