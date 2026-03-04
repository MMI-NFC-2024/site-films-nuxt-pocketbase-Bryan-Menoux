<script setup lang="ts">
const nuxtApp = useNuxtApp()
const films = await nuxtApp.$pb.collection("films").getFullList()
const filmsWithUrls = films.map((film) => ({
    ...film,
    afficheUrl: nuxtApp.$pb.files.getURL(film, film.affiche)
}))
</script>
<template>
    <h1 class="font-bold text-4xl">films</h1>
    <ul>
        <li v-for="film in filmsWithUrls" class="flex max-w-full">
            <div>
                <h2 class="font-bold text-2xl">{{ film.titre }}</h2>
                <img :src="film.afficheUrl" :alt="`Affiche de ${film.titre}`" class="w-64 h-auto">
                <NuxtLink :to="`/films/${film.id}`">Voir le film</NuxtLink>

            </div>
        </li>
    </ul>
</template>