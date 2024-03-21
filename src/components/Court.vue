<script setup lang="ts">
import { computed } from 'vue'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Volume2, X } from 'lucide-vue-next'
import { Court, useCourtsStore } from '@/stores/courts'
import { usePlayersStore, Player } from '@/stores/players'

const courtsStore = useCourtsStore()
const playersStore = usePlayersStore()

const props = defineProps<{ preview?: boolean, number?: number, data: Court }>()
const { id, name } = props.data

const sortPlayersByLevel = computed(() => 
  playersStore.players.filter(p => p.onCourt === id).slice().sort((a, b) => b.level - a.level)
)

const isCourtFull = computed(() => {  
  return sortPlayersByLevel.value.length === 4
})

const isCourtEmpty = computed(() => {
  return sortPlayersByLevel.value.length === 0
})

function speak() {
  // reset all voice
  window.speechSynthesis?.cancel()

  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance()

  const playersString = sortPlayersByLevel.value.reduce((acc, player, idx: number) => {
    const seperator = idx === 0 ? '' : ' , '
    return acc + seperator + player.name
  }, '')

  utter.text = `場地 ${name} , ${playersString}. 建議: ${sortPlayersByLevel.value[0].name}, ${sortPlayersByLevel.value[1].name} 分開`
  synth.speak(utter)
}

function handleDelete() {
  courtsStore.deleteCourt(id)

  playersStore.players.forEach(p => {
    if (p.onCourt === id) {
      playersStore.updatePlayer({
        ...p,
        onCourt: false,
      })
    }
  })
}

function goOnField() {
  // 從預覽球場一開始
  const previewId = courtsStore.previewCourts[0].id
  const preview2Id = courtsStore.previewCourts[1].id
  const players = playersStore.players.filter(p => p.onCourt === previewId)

  if (players.length < 4) return

  playersStore.players.forEach(p => {
    if (p.onCourt === previewId) {
      playersStore.updatePlayer({
        ...p,
        onCourt: id,
      })
    } else if (p.onCourt === preview2Id) {
      playersStore.updatePlayer({
        ...p,
        onCourt: previewId,
      })
    }
  })
}

function finishCourt() {
  playersStore.players.forEach(p => {
    if (p.onCourt === id) {
      playersStore.updatePlayer({
        ...p,
        onCourt: false,
        gamesPlayed: p.gamesPlayed + 1
      })
    }
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
  <Card class="flex flex-col">
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <div>
            場地 {{ data.name }}
            <Button v-if="isCourtFull" variant="ghost" @click="speak">
              <Volume2 class="w-4 h-4" />
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="ghost">
                <X class="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>你確定要刪除球場?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction class="bg-red-700 hover:bg-red-800" @click="handleDelete">刪除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="text-center flex-1 min-h-20">
      <div v-for="player in sortPlayersByLevel" :key="player.name" class="flex items-center justify-center gap-1">
        <p class="min-w-28">{{ `${player.name} (${player.level})` }}</p>
        <Button variant="ghost" class="text-red-700" @click="removePlayer(player)">
          <X class="w-3 h-3" />
        </Button>
      </div>
    </CardContent>
    <CardFooter class="flex justify-between">
      <template v-if="isCourtEmpty">
        <Button class="w-full" @click="goOnField">上場</Button>
      </template>
      <template v-else>
        <div></div>
        <Button :disabled="!isCourtFull" @click="finishCourt">結束</Button>
      </template>
    </CardFooter>
  </Card>
</template>
