<script setup lang="ts">
import { ref } from 'vue'

const nuxtApp = useNuxtApp()
const route = useRoute()
const router = useRouter()

const id = route.params.id as string

const film = ref<Partial<FilmsRecord>>({
  titre: "",
  duree_min: undefined,
  genres: [],
  synopsis: "",
  date_sortie: ""
})

if (id) {
    const film_temp = await nuxtApp.$pb.collection("films").getOne(id)

    film.value = {
        ...film_temp,
        date_sortie: new Date(film_temp.date_sortie).toISOString().split("T")[0]
    }
}

async function envoyer(){

    const user = nuxtApp.$pb.authStore.model
    film.value.user = user?.id

    const filmAjoute = id
        ? await nuxtApp.$pb.collection("films").update(id, film.value)
        : await nuxtApp.$pb.collection("films").create(film.value)

    if (filmAjoute) {
        router.push({name: "films-id", params: {id: filmAjoute.id}})
    }
}
</script>
<template>
    <form @submit.prevent="envoyer">
        <div v-if="film.affiche" >
            <ImgPb :record="film" :filename="film.affiche" />
            <button @click.prevent="film.affiche = undefined">Supprimer</button>
        </div>
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
        <label>Date 
            <input type="date" v-model="film.date_sortie" />
        </label>
        <button>Envoyer</button>
    </form>
</template>