import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Player {
  name: string
  level: number
}

export interface Court {
  name: string
  players: Player[]
}

export const useCourtsStore = defineStore('courts', {
  state: () => {
    const courts = ref<Court[]>([
      {
        name: 'A',
        players: []
      }
    ])

    function addCourt(court: Court) {
      courts.value.push(court)
    }

    function deleteCourt(name: string) {
      courts.value = courts.value.filter((court) => court.name !== name)
    }

    return {
      courts,
      addCourt,
      deleteCourt
    }
  }
})
