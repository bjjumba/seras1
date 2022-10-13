import { toast } from "react-toastify"

export const notifyNetworkStatus=(value)=>{
    value?toast("You are Online"):toast("You are Offline")
}