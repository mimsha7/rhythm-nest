import { projectFirestore } from "@/firebase/config"
import { doc, onSnapshot } from "firebase/firestore"
import { ref, watchEffect } from "vue"

const getDocument = (collections, id) => {
    const document = ref(null)
    const error = ref(null)

    const docRef = doc(projectFirestore, collections, id)   

    const unsub = onSnapshot(docRef, (doc) => {
        if(doc.data()){
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else {
            error.value = "This playlist has been deleted or does not exist.";
            document.value = null; 
        }
    }, (err) => {
        console.log(err.message)
        error.value = "could not fetch document"
    })

    watchEffect((onInvalidate) => {
        //unsubscribe from the collection when the component is unmounted
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument