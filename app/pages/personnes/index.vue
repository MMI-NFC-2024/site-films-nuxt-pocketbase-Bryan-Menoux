<script setup lang="ts">
const nuxtApp = useNuxtApp()
const personnes = await nuxtApp.$pb.collection("personnes").getFullList()
const personnesWithUrls = personnes.map((personne) => ({
    ...personne,
    photoUrl: nuxtApp.$pb.files.getURL(personne, personne.photo)
}))
const user = nuxtApp.$user
</script>
<template>
    <h1 class="font-bold text-4xl">personnes</h1>
    <ul>
        <li v-for="personne in personnesWithUrls" class="flex max-w-full">
            <div>
                <h2 class="font-bold text-2xl">{{ personne.nom }}</h2>
                <img :src="personne.photoUrl" :alt="`photo de ${personne.nom}`" class="w-64 h-auto">
                <NuxtLink :to="`/personnes/${personne.id}`">Voir la personne</NuxtLink>
            </div>
        </li>
    </ul>
    <NuxtLink v-if="user" to="/personnes/edit/">Créer une personne</NuxtLink>
</template>