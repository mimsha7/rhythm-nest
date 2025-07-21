import { projectFirestore } from "@/firebase/config"
import { addDoc, collection } from "firebase/firestore"
import { ref } from "vue"

const useCollection = (collections) => {
    const error = ref(null) 
    const isPending = ref(false)

    const addCollection = async (doc) => {
        error.value = null
        isPending.value = true
        
        try{
            const colRef = collection(projectFirestore, collections) //create a reference to the collection
            const res = await addDoc(colRef, doc) //add the document to the collection
            isPending.value = false
            return res //return the document reference
        } catch(err) {
            console.log(err.message)
            error.value = 'Could not send the message!'
            isPending.value = false
        }
        
    }

    return { error, addCollection, isPending }
}

export default useCollection