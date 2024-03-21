import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export interface Player {
  id: string,
  name: string
  level: number, // 羽球等級
  gamesPlayed: number, // 已上場次數
  playersMatched?: string[], // 對戰過的人
  onCourt?: boolean | string // 是否在場上打球, 有的話就是球場 id,
}

export const usePlayersStore = defineStore('players', {
  state: () => {
    const players = ref<Player[]>([
      { id: 'sadf', name: 'player 1', level: 7, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf1', name: 'player 2', level: 3, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf2', name: 'player 3', level: 5, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf3', name: 'player 4', level: 6, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf4', name: 'player 5', level: 8, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf5', name: 'player 6', level: 4, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf6', name: 'player 7', level: 11, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf7', name: 'player 8', level: 6, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf8', name: 'player 9', level: 2, gamesPlayed: 0, playersMatched: [], onCourt: false },
      { id: 'sadf9', name: 'player 10', level: 5, gamesPlayed: 0, playersMatched: [], onCourt: false },
    ])

    function addPlayer(name: string, level: number) {
      players.value.push({
        id: uuidv4(),
        name,
        level,
        gamesPlayed: 0,
        playersMatched: [],
        onCourt: false
      })
    }

    function deletePlayer(id: string) {
      players.value = players.value.filter((p) => p.id !== id)
    }

    function updatePlayer(editedPlayer: Player) {
      const index = players.value.findIndex(p => p.id === editedPlayer.id)
      players.value[index] = {
        ...players.value[index],
        ...editedPlayer
      }
    }

    return {
      players,
      addPlayer,
      deletePlayer,
      updatePlayer
    }
  }
})
