<script setup lang="ts">
import Courts from '@/components/Courts.vue'
import PlayerList from '@/components/PlayerList.vue'
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-10">
    <h1 class="text-4xl mb-12">Badminton Group Demo</h1>

    <Courts />

    <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    
    <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PlayerList />
      <div>
        <!-- <Court v-for="p in 2" :key="p" :number="p" class="mb-4" preview/> -->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
