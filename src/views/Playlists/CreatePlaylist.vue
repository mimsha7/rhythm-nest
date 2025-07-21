<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" placeholder="Playlist title" v-model="title" required>
    <textarea placeholder="Playlist description..." v-model="description" required></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
    <div class="error">
        {{ error }}
    </div>
  </form>
</template>

<script>

import useCloudinaryStorage from '@/composables/useCloudinaryStorage';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection';
import { serverTimestamp } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
setup() {
    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const router = useRouter();
    const isPending = ref(false);

    const { url, uploadImage, error: uploadError } = useCloudinaryStorage();
    const { addCollection, error: collectionError } = useCollection('playlists');
    const { user } = getUser();

    const handleSubmit = async () => {
        if(file.value){
          isPending.value = true;
            fileError.value = null; // Reset file error

            const path = `covers/${user.value.uid}`;
            await uploadImage(file.value, path);
            console.log(url.value)
            
            if (uploadError.value) {
                console.error(uploadError.value);
                return;
            }

          const res =  await addCollection({
                title: title.value,
                description: description.value,
                userId: user.value.uid,
                userName: user.value.displayName, 
                coverUrl: url.value,
                createdAt: serverTimestamp(),
                songs: [] 
            });
            isPending.value = false;

            if(!collectionError.value) {
              router.push({ name: 'PlayListDetails', params: { id: res.id } }); // Redirect on success
            }
        }
    }

    const types = ["image/png", "image/jpeg", "image/jpg"];
    

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected) {
        // A file was selected
        if (types.includes(selected.type)) {
          file.value = selected;
          fileError.value = null;
        } else {
          file.value = null;
          fileError.value = 'Please select a valid image file (png or jpeg)';
        }
      } else {
        // if user clicked cancel, we shouldn't show an error if no file is selected.
        file.value = null;
        fileError.value = null;
      }
    }

    const error = ref(null); // Consolidate errors if needed, or handle separately

    return { 
      title, 
      description, 
      handleSubmit, 
      handleChange, 
      fileError, 
      isPending,
      error 
    };
  }
}
</script>

<style>
input[type="file"] {
    border: 0;
    padding: 0;
}
label {
    display: block;
    font-size: 12px;
    margin: 30px;
}
button {
    margin-top: 20px;
}
</style>