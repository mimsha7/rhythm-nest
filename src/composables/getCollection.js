import { projectFirestore } from "@/firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { ref, watchEffect } from "vue"

const getCollection = (collections) => {
    const documents = ref(null)
    const error = ref(null)

    const colRef = collection(projectFirestore, collections)
    const q = query(colRef, orderBy('createdAt', 'asc'))

    const unsub = onSnapshot(q, (snap) => {
        let results = []
        snap.docs.forEach(doc => {
            //must wait for the server to create the timestamp & send back
           doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = "could not fetch data"
    })

    watchEffect((onInvalidate) => {
        //unsubscribe from the collection when the component is unmounted
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection