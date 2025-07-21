import { projectAuth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { ref } from "vue";

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true

    try {
        const res = await signOut(projectAuth)
        isPending.value = false
    }catch(err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

export default function useLogout () {

    return {logout, error, isPending}
}