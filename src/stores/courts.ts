import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export interface Court {
  id: string,
  name: string
}

export const useCourtsStore = defineStore('courts', {
  state: () => {
    const courts = ref<Court[]>([
      {
        id: uuidv4(),
        name: 'A'
      }
    ])

    const previewCourts = ref<Court[]>([
      {
        id: uuidv4(),
        name: '預覽球場一'
      },
      {
        id: uuidv4(),
        name: '預覽球場二'
      }
    ])

    function addCourt(name: string) {
      courts.value.push({
        id: uuidv4(),
        name
      })
    }

    function deleteCourt(id: string) {
      courts.value = courts.value.filter((court) => court.id !== id)
    }

    return {
      courts,
      previewCourts,
      addCourt,
      deleteCourt
    }
  }
})
