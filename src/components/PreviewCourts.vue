<script setup lang="ts">
import PreviewCourt from '@/components/PreviewCourt.vue'
import { useCourtsStore } from '@/stores/courts'
const courtsStore = useCourtsStore()
</script>

<template>
  <div>
    <PreviewCourt 
      v-for="previewCourt in courtsStore.previewCourts" 
      :key="previewCourt.name" 
      :data="previewCourt" 
    />
  </div>
</template>
