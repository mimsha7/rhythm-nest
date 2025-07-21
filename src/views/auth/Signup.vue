<template>
  <form @submit.prevent="handleSubmit">
    <h1>Sign up</h1>
    <input type="text" placeholder="display Name" v-model="displayName" required>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="password" placeholder="Password" v-model="password" required>
    <div class="error">
        {{ error }}
    </div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Sign Up</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(props, context) {
        const { signup, error, isPending } = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleSubmit = async () => {
            await signup( displayName.value, email.value, password.value)
            if(!error.value){
                router.push({name: 'home'})
            context.emit('signup')
          }
        }

        return { displayName, email, password, handleSubmit, signup, error, isPending }
    }
}
</script>

<style>

</style>