import { projectAuth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";

const error = ref(null)
const isPending = ref(false)

const signup = async (displayName, email, password) => {
    error.value = null;
    isPending.value = false
    try 
    {
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)
        if(!res) {
            throw new Error('User does not exist!')
        }
        await updateProfile(res.user, {displayName})
        error.value = null
        isPending.value = false
        
        return res
    }
    catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {
    

    return { signup, error, isPending}
}

export default useSignup