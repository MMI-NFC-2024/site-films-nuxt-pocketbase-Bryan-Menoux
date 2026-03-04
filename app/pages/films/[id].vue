<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const nuxtApp = useNuxtApp()
const film = ref<any>(null)

const id = route.params.id as string
film.value = await nuxtApp.$pb.collection('films').getOne(id)
const afficheUrl = computed(() =>
  film.value && film.value.affiche
    ? nuxtApp.$pb.files.getURL(film.value, film.value.affiche)
    : ''
)
</script>

<template>
  <div v-if="film">
    <h1 class="font-bold text-4xl">{{ film.titre }}</h1>
    <img v-if="afficheUrl" :src="afficheUrl" :alt="`Affiche de ${film.titre}`" class="w-64 h-auto my-4" />
  </div>
</template>