<template>
  <div class="home">
    <div class="error">
      {{ error }}
    </div>
    <div class="card" v-if="documents && documents.length">
      <h2>Playlists</h2>
      <br>
      <ListView :playlists="documents" />
        <!-- <div class="playlists" v-for="doc in formattedPlaylists" :key="doc.id">
          <img :src="doc.coverUrl" alt="" />
          <h3>{{ doc.title }}</h3>
          <p>{{ doc.description }}</p>
          <p>Created by: {{ doc.userName }} on {{ doc.createdAt }}</p>
        </div> -->
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import { computed } from 'vue';
import ListView from '@/components/ListView.vue';

export default {
  name: 'HomeView',
  components: { ListView },
  setup(){
    const { documents, error  } = getCollection('playlists');
    // const formattedPlaylists = computed(() => {
    //   if(documents.value) {
    //     return documents.value.map(doc => ({
    //       ...doc,
    //       createdAt: doc.createdAt ? doc.createdAt.toDate().toLocaleDateString() 
    //       : 'Unknown date'
    //     }));
    //   }
    // });
    return {documents, error };
  }
}
</script>
<style>
/* .home {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
}
.playlists {
  box-shadow: 1px solid rgba(50, 50, 50, 0.1);
  margin-bottom: 20px;
}
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
} */
</style>