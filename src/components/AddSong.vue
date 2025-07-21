<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleAddSong">
        <h4>Add a New Song</h4>
        <input type="text" placeholder="Song title" v-model="title" required>
        <input type="text" placeholder="Artist" v-model="artist" required>
        <button>Add</button>
    </form>
  </div>
</template>

<script>
import useDocument from '@/composables/useDocument';
import { ref } from 'vue';


export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('');
    const artist = ref('');
    const showForm = ref(false);

    const { updateDocument } = useDocument('playlists');

    const handleAddSong = async () => {
        const newSong = {
            title: title.value,
            artist: artist.value,
            id: Date.now() // simple unique ID
        };
        await updateDocument(props.playlist.id, {
            songs: [...props.playlist.songs, newSong]
        });
        title.value = ''
        artist.value = '' 
    }

    return { title, artist, handleAddSong, showForm, useDocument};
  }
}
</script>

<style scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
}
</style>