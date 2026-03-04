<script setup lang="ts">
import { ref } from 'vue'
const film = ref({ genres: [] } as unknown as FilmsResponse)
const nuxtApp = useNuxtApp()
async function envoyer(){
    try {
        const userId = nuxtApp.$pb?.authStore?.record?.id || nuxtApp.$user?.value?.id
        if (userId) film.value.user = userId as any

        const filmAjoute = await nuxtApp.$pb.collection("films").create(film.value)
        if (filmAjoute) {
            useRouter().push({name: "films-id", params: {id: filmAjoute.id}})
        }
    } catch (err: any) {
        // surface errors in the console and to the user for now
        console.error('Failed to create film', err)
        alert(err?.message || String(err))
    }
}
</script>
<template>
    <form @submit.prevent="envoyer">
        <label>Titre
            <input type="text" v-model="film.titre" />
        </label>
        <label>Durée
            <input type="number" v-model="film.duree_min" />
        </label>
        <label>Genres
            <select v-model="film.genres" multiple>
                <option v-for="genre in FilmsGenresOptions" :value="genre">{{ genre }}</option>
            </select>
        </label>
        <label>Synopsis
            <textarea v-model="film.synopsis"></textarea>
        </label>
        <button>Envoyer</button>
    </form>
</template>