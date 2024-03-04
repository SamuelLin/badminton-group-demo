<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePlayersStore, Player } from '@/stores/players'
import { Pencil } from 'lucide-vue-next'

const playersStore = usePlayersStore()

const isDialogOpen = ref(false)
const newPlayerName = ref('')
const newPlayerLevel = ref(0)
const editedPlayerData = ref<Player | undefined>(undefined)

const isEdit = computed(() => {
  return editedPlayerData.value !== undefined
})

const isDuplicatePlayerName = computed(() => {
  return playersStore.players.findIndex(p => p.name.toLowerCase() === newPlayerName.value) > -1
})

const isValid = computed(() => {
  const isNameEmpty = newPlayerName.value === ''
  const isOutLevel = newPlayerLevel.value <= 0 || newPlayerLevel.value > 18

  if (isEdit.value) {
    const isDuplicate = playersStore.players.findIndex(p => p.id !== editedPlayerData.value?.id && p.name === newPlayerName.value) > -1
    if (isDuplicate || isNameEmpty || isOutLevel) return false
    return true
  }
  

  return !isDuplicatePlayerName.value && !isNameEmpty && !isOutLevel
})

watch(isDialogOpen, (v) => {
  if (!v) {
    newPlayerName.value = ''
    newPlayerLevel.value = 0
    editedPlayerData.value = undefined
  }
})

function addPlayer() {
  playersStore.addPlayer(newPlayerName.value, newPlayerLevel.value)
  isDialogOpen.value = false
}

function editPlayer() {
  if (editedPlayerData.value) {
    const editedPlayer = {
      ...editedPlayerData.value,
      name: newPlayerName.value,
      level: newPlayerLevel.value
    }    
    playersStore.editPlayer(editedPlayer)
    isDialogOpen.value = false
  } 
}

function deletePlayer(name: string) {
  playersStore.deletePlayer(name)
}

function openEdit(id: string) {
  const player: Player | undefined = playersStore.players.find(p => p.id === id)

  if (player) {
    editedPlayerData.value = player
    newPlayerName.value = player.name
    newPlayerLevel.value = player.level
    isDialogOpen.value = true
  }
}
</script>

<template>
  <div>
    <div class="text-right">
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button class="self-end">加入玩家</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{{ isEdit ? '修改玩家' : '加入玩家' }}</DialogTitle>
            <DialogDescription>
              {{ isEdit ? '' : '新增玩家到玩家列表，完成時點擊加入' }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                名稱
              </Label>
              <Input id="name" class="col-span-3" v-model.trim="newPlayerName" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="level" class="text-right">
                等級
              </Label>
              <Input id="level" type="number" :max="18" :min="1" class="col-span-3" v-model="newPlayerLevel" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" :disabled="!isValid" @click="isEdit ? editPlayer() : addPlayer()">
              {{ isEdit ? '儲存' : '加入' }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            姓名
          </TableHead>
          <TableHead class="w-[100px]">級別</TableHead>
          <TableHead class="w-[100px]">上場數</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="player in playersStore.players" :key="player.id">
          <TableCell class="font-medium">
            {{ player.name }}
          </TableCell>
          <TableCell>{{ player.level }}</TableCell>
          <TableCell>{{ player.gamesPlayed }}</TableCell>
          <TableCell>
            <Button variant="ghost" class="text-red-700">skip</Button>
            <Button variant="ghost" class="ml-2" @click="deletePlayer(player.id)">離開</Button>
            <Button variant="ghost" class="ml-2" @click="openEdit(player.id)">
              <Pencil class="w-3 h-3" />
            </Button>
          </TableCell>
        </TableRow>

        <TableRow v-if="playersStore.players.length === 0">
          <TableCell :colSpan="4" class="text-center">無玩家</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
