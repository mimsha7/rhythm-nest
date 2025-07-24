<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script>
import ListView from '@/components/ListView.vue';
import getUserPlaylists from '@/composables/getUserPlaylists';

export default {
  components: {ListView},
    setup() {
      const { playlists, error } = getUserPlaylists();
      console.log(playlists);
      
      return { playlists, error };
    }
}
</script>

<style>

</style>