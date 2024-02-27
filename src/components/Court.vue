<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Volume2 } from 'lucide-vue-next'

const props = defineProps<{ preview?: boolean, number: number }>()

function speak() {
  // reset all voice
  window.speechSynthesis?.cancel()

  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance()

  utter.text = `場地 ${props.number}. Samuel 與 Durant, 對上,  Terry 與 Nina. 建議: Durant, Terry 分開`
  synth.speak(utter)
}
</script>

<template>
  <Card >
    <CardHeader>
      <CardTitle>
        {{ preview ? '預覽' : '場地' }} {{ number }}
        <Button v-if="!preview" variant="ghost" @click="speak">
          <Volume2 class="w-4 h-4" />
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent class="text-center">
      <p>AAA(4) & BBB(2)</p>
      <p>vs</p>
      <p>CCC(4) & DDD(2)</p>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="ghost">
        <Pencil class="w-4 h-4" />
      </Button>
      <Button>結束</Button>
    </CardFooter>
  </Card>
</template>
