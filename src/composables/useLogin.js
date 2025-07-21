import { projectAuth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const error = ref(null)
const isPending = ref(false) 

const login = async (email, password) => {
      error.value = null
      isPending.value = true
      try{
        const res = await signInWithEmailAndPassword(projectAuth, email, password)
        error.value = null
        isPending.value = false

        if(!res){
            throw new Error('Incorrect login credential!')
        }
        console.log(res)
        return res
      }catch(err){
        isPending.value = false
        console.log(err.message)
        error.value = err.message
        

      }
}
export default function useLogin () {

    return {error, login, isPending}
}