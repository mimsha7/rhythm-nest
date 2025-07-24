<template>
  <div class="navbar">
    <nav>
        <img src="@/assets/RN-icon.png" alt="icon">
        <h1><router-link :to="{name: 'home'}">RhythmNest</router-link></h1>
        <div class="links">
            <span v-if="user">
                <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create Playlist</router-link>
                <router-link :to="{ name: 'UserPlaylists' }" class="btn">My Playlist</router-link>
                <button class="_btn" @click="handleLogout" v-if="!isPending">Logout</button>
                <button class="_btn" @click="handleLogout" v-if="isPending" disabled>Logout</button>
            </span>
            <span v-else>
                <router-link :to="{ name: 'Signup'}" class="btn">Sign up</router-link>
                <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
            </span>
        </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const { user } = getUser(); 
        // Importing the useLogout composable to handle logout functionality
        const {logout, error, isPending} = useLogout();

        const handleLogout = async () => {
            try{
                await logout()
                console.log("Logout successful");
                if(!error.value) {
                    router.push({ name: 'Login' });
                }
            } catch(err) {
                console.error("Logout failed:", err);
            }
        }
        return {logout, error, isPending, handleLogout, user}
    }
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 65px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1180px;
    margin: 0 auto;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}
nav ._btn:hover {
    background: #da0f41;
}
nav img {
    height: 70px;
}
</style>