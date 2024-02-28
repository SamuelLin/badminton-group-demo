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
import { Pencil, Volume2, X } from 'lucide-vue-next'
import { Court, useCourtsStore } from '@/stores/courts'

const courtsStore = useCourtsStore()

const props = defineProps<{ preview?: boolean, number?: number, data: Court }>()
const { name, players } = props.data
const sortPlayersByLevel = players.slice().sort((a, b) => b.level - a.level)

const isEmptyCourt = computed(() => {
  return players.length === 0
})

function speak() {
  // reset all voice
  window.speechSynthesis?.cancel()

  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance()

  const playersString = sortPlayersByLevel.reduce((acc, player, idx: number) => {
    const seperator = idx === 0 ? '' : ' , '
    return acc + seperator + player.name
  }, '')

  utter.text = `場地 ${name} , ${playersString}. 建議: ${sortPlayersByLevel[0].name}, ${sortPlayersByLevel[1].name} 分開`
  synth.speak(utter)
}

function handleDelete() {
  courtsStore.deleteCourt(name)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        <div class="flex justify-between items-center">
          <div>
            場地 {{ data.name }}
            <Button v-if="!isEmptyCourt" variant="ghost" @click="speak">
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
    <CardContent class="text-center">
      <template v-if="isEmptyCourt">
        <p class="opacity-0">empty</p>
        <p class="opacity-0">empty</p>
        <p class="opacity-0">empty</p>
        <p class="opacity-0">empty</p>
      </template>
      <template v-else>
        <p v-for="player in sortPlayersByLevel" :key="player.name">{{ `${player.name} (${player.level})` }}</p>
      </template>
    </CardContent>
    <CardFooter class="flex justify-between">
      <template v-if="isEmptyCourt">
        <Button class="w-full">上場</Button>
      </template>
      <template v-else>
        <Button variant="ghost">
          <Pencil class="w-4 h-4" />
        </Button>
        <Button>結束</Button>
      </template>
    </CardFooter>
  </Card>
</template>
