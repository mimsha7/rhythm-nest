import { projectAuth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";

const error = ref(null)

const user = ref(projectAuth.currentUser)

const res = onAuthStateChanged(projectAuth,(_user) => {
    error.value = null
    console.log('User state change, current user is: ', _user)
    user.value = _user
    return res
})

export default function getUser () {
return { user, error }
}