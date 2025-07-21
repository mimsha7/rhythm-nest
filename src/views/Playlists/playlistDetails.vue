<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist info -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="">
      </div>
        <h2>{{ playlist.title }}</h2>
        <p class="username">Created by {{ playlist.userName }}</p>
        <p class="description">{{ playlist.description }}</p>
        <button v-if="ownList" @click="handleDelete()" class="_btn">Delete Playlist</button>
    </div>

    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet!</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="song-info">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="song-icon">
            <path d="M9 18V5.5C9 5.22386 9.22386 5 9.5 5H16.5C16.7761 5 17 5.22386 17 5.5V8M17 8C17 10.2091 15.2091 12 13 12C10.7909 12 9 10.2091 9 8M17 8V11C17 12.1046 16.1046 13 15 13H11C9.89543 13 9 12.1046 9 11V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="7" cy="18" r="2" stroke="currentColor" stroke-width="2"/>
            <circle cx="15" cy="15" r="2" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>{{ song.title }} by {{ song.artist }}</span>
        </div>
        <button class="delete-song _btn" v-if="ownList" @click="handleDeleteSong(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownList" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useCloudinaryStorage from '@/composables/useCloudinaryStorage';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddSong from '@/components/AddSong.vue';


export default {
props: ['id'],
components: {
    AddSong
},
setup(props) {
  const {  error, document: playlist } = getDocument('playlists', props.id)
  const { user } = getUser()
  const {deleteDocument, isPanding, updateDocument} = useDocument('playlists')
  const { deleteImage } = useCloudinaryStorage();
  const router = useRouter()

  const ownList = computed(() => {
    return playlist.value && user.value && user.value.uid == playlist.value.userId
  })

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this playlist and its cover image?')) {
      await deleteImage(playlist.value.coverUrl);
      await deleteDocument(props.id)
      router.push({ name: 'home' })
    }
  }

  const handleDeleteSong = async (songId) => {
    const songs = playlist.value.songs.filter(song => song.id !== songId);
    await updateDocument(props.id, { songs });
  }

  return { playlist, error, ownList, handleDelete, isPanding, handleDeleteSong }
}
}
</script>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 10px;
  }
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
  margin-bottom: 10px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 20px;
  
}
.username {
    color: #999;
  }
.description {
    text-align: left;
  }
.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
  .song-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .song-icon {
    color: #999;
  }
._btn:hover {
    background: #da0f41;
}
</style>