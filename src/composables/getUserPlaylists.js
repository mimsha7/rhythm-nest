import { projectFirestore } from "@/firebase/config";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import getUser from "./getUser";

const getUserPlaylists = () => {
    const playlists = ref([]);
    const error = ref(null);
    const { user } = getUser();

    const unsub = watchEffect((onInvalidate) => {
        if (user.value) {
            const q = query(
                collection(projectFirestore, 'playlists'),
                where('userId', '==', user.value.uid),
                orderBy('createdAt', 'desc')
            );

            const unsubscribeSnapshot = onSnapshot(q, (snap) => {
                playlists.value = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                error.value = null;
            }, (err) => {
                console.error(err.message);
                error.value = "Could not fetch user playlists.";
                playlists.value = [];
            });

            onInvalidate(() => unsubscribeSnapshot());
        } else {
            playlists.value = [];
        }
    });

    return { playlists, error };
};

export default getUserPlaylists; 