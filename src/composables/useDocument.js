import { projectFirestore } from "@/firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";

const useDocument = (collectionName) => {
    const error = ref(null);
    const isPending = ref(false);

    const deleteDocument = async (id) => {
        isPending.value = true;
        error.value = null;
        try {
            const docRef = doc(projectFirestore, collectionName, id);
            const res = await deleteDoc(docRef);
            isPending.value = false;
            return res;
        } catch (err) {
            console.log(err.message);
            isPending.value = false;
            error.value = "Could not delete the document";
        }
    };

    const updateDocument = async (id, updates) => {
        isPending.value = true;
        error.value = null;
        try {
            const docRef = doc(projectFirestore, collectionName, id);
            const res = await updateDoc(docRef, updates);
            isPending.value = false;
            return res;
        } catch (err) {
            console.log(err.message);
            isPending.value = false;
            error.value = "Could not update the document";
        }
    };

    return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;