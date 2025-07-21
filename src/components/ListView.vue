<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <router-link :to="{ name: 'PlayListDetails', params: { id: playlist.id } }">
    <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" alt="" />
        </div>
        <div class="info">
            <h3>{{ playlist.title }}</h3>
            <p>Created by: {{ playlist.userName }} on {{ playlist.createdAt.toDate().toLocaleDateString() }}</p>
        </div>
        <div class="song-count">
            <p>{{ playlist.songs.length }}</p>
        </div>
    </div>
    </router-link>
  </div> 
</template>

<script>
export default {
props:['playlists'],
}
</script>

<style scope>
.single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
}
.single:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
    transform: scale(1.02);
    transition: all ease 0.2s;
}
.thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
}
img {
    max-width: 150px;
    max-height: 150px;
    display: block;
} 
.info {
    margin: 0 30px;
}
.song-count {
    margin-left: auto;
}
</style>