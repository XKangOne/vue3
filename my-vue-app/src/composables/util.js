import { ElNotification, ElMessageBox} from  'element-plus'
import nprogress from 'nprogress'

// 封装消息提示组件
export function toast(message,type="success"){
    ElNotification({
        message,
        type,
        duration:2000
    })
}

// 显示全局进度条
export function showFullLoading() {
    nprogress.start()
}
// 隐藏全局进度条
export function hideFullLoading() {
    nprogress.done()
}
//退出登录时使用的
export function showModal(content = "提示内容",type = "warning",title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText:'确认',
            cancelButtonText:'取消',
            type,
        }
    )
}
