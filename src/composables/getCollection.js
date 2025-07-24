import { projectFirestore } from "@/firebase/config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { ref, watchEffect } from "vue"

const getCollection = (collections) => {
    const documents = ref(null)
    const error = ref(null)

    let colRef = collection(projectFirestore, collections)
    let q = query(colRef, orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(q, (snap) => {
        let results = []
        snap.docs.forEach(doc => {
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
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection