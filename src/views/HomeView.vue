<template>
  <div class="home">
    <div class="error">
      {{ error }}
    </div>
    <div class="card" v-if="documents && documents.length">
      <h2>Playlists</h2>
      <br>
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
  name: 'HomeView',
  components: { ListView },
  setup(){
    const { documents, error  } = getCollection('playlists');

    return {documents, error };
  }
}
</script>
<style>

</style>