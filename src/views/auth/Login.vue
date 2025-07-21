<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="password" placeholder="password" v-model="password" required>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Login</button>
    <div class="error">
        {{ error }}
    </div>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(props, context) { 
        const {login, error, isPending} = useLogin() //importing login info from composables

        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const handleSubmit = async () => {
           await login(email.value, password.value)
           if(!error.value) {
            router.push({ name: 'home' })
            context.emit('login')
           }
        }
        return {email, password, handleSubmit, login, error, isPending}
    }
}
</script>

<style>

</style>