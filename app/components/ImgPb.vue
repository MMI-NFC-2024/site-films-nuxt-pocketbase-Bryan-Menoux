<script setup lang="ts">
const props = defineProps<{
  record: any
  filename: string
  alt?: string
}>()

const { $pb } = useNuxtApp()

const url = computed(() => {
  if (!props.record || !props.filename) return ""
  return $pb.files.getURL(props.record, props.filename)
})
</script>

<template>
  <img
    v-if="url"
    :src="url"
    :alt="alt ?? ''"
  >
</template>