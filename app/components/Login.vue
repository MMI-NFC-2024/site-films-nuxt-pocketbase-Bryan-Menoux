<script setup lang="ts">
const nuxtApp = useNuxtApp()
async function loginWithGithub() {
    const authData = await nuxtApp.$pb.collection('users').authWithOAuth2({
        provider: 'github'
    })
    console.log('Authenticated user:', authData)
}
const user = nuxtApp.$user
</script>

<template>
    <button v-if="!user" @click="loginWithGithub">Se connecter via github</button>
    <button v-if="user" @click="nuxtApp.$pb.authStore.clear()">Se déconnecter {{ user?.name || user?.email }}</button>
</template>