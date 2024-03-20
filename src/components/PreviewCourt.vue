<script setup lang="ts">
import { computed } from 'vue'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePlayersStore, Player } from '@/stores/players'
import { selectPlayers } from '@/lib/selectPlayers'
import { X } from 'lucide-vue-next'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const playersStore = usePlayersStore()
const previewPlayers = computed(() => playersStore.players.filter(p => p.onCourt === props.data.id))

function handleGenerate(id: string) {
  const players = selectPlayers(playersStore.players)

  players.forEach(p => {
    playersStore.updatePlayer({
      ...p,
      onCourt: id
    })
  })
}

function removePlayer(player: Player) {
  playersStore.updatePlayer({
    ...player,
    onCourt: false
  })
}
</script>

<template>
  <Card class="mb-4">
    <CardHeader>
      <CardTitle>
        {{ data.name }}
      </CardTitle>
    </CardHeader>
    <CardContent class="text-center">
      <template v-if="previewPlayers.length === 0">
        <Button @click="handleGenerate(data.id)">Generate</Button>
      </template>
      <template v-else>
        <div v-for="player in previewPlayers" :key="player.name" class="flex items-center justify-center gap-1">
          <p class="min-w-28">{{ `${player.name} (${player.level})` }}</p>
          <Button variant="ghost" class="text-red-700" @click="removePlayer(player)">
            <X class="w-3 h-3" />
          </Button>
        </div>
      </template>
    </CardContent>
    <CardFooter class="flex justify-between">
    </CardFooter>
  </Card>
</template>
