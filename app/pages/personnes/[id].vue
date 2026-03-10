<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const nuxtApp = useNuxtApp()
const personne = ref<any>(null)

const id = route.params.id as string
personne.value = await nuxtApp.$pb.collection('personnes').getOne(id)
const photoUrl = computed(() =>
  personne.value && personne.value.photo
    ? nuxtApp.$pb.files.getURL(personne.value, personne.value.photo)
    : ''
)
</script>

<template>
  <div v-if="personne">
    <h1 class="font-bold text-4xl">{{ personne.nom }}</h1>
    <img v-if="photoUrl" :src="photoUrl" :alt="`Photo de ${personne.nom}`" class="w-64 h-auto my-4" />
  </div>
</template>