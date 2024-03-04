<script setup lang="ts">
import { Power } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Courts from '@/components/Courts.vue'
import PlayerList from '@/components/PlayerList.vue'
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-10">
    <div class="flex flex-col md:flex-row justify-between mb-12">
      <h1 class="text-4xl flex-1">
        Badminton Group Demo
      </h1>
      <Button variant="outline" class="text-red-500 hover:text-red-600 font-bold border-red-500 mt-4 md:mt-0">
        <Power class="w-4 h-4 mr-2" /> 結束零打
      </Button>
    </div>
    
    

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
