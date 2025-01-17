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
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePlayersStore, Player } from '@/stores/players'
import { useCourtsStore } from '@/stores/courts'
import { Pencil, Plus, UserRoundPlus, UserRoundX } from 'lucide-vue-next'
import getLevelColor from '@/lib/getLevelColor'

const playersStore = usePlayersStore()
const courtsStore = useCourtsStore()
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

function updatePlayer() {
  if (editedPlayerData.value) {
    const editedPlayer = {
      ...editedPlayerData.value,
      name: newPlayerName.value,
      level: newPlayerLevel.value
    }    
    playersStore.updatePlayer(editedPlayer)
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

// Choose court dialog -------- start
const courtId = ref('')

function addToCourt(player: Player) {
  playersStore.updatePlayer({
    ...player,
    onCourt: courtId.value
  })
  courtId.value = ''
}

function handleDialogClose(isOpen: Boolean) {
  if (!isOpen) {
    courtId.value = ''
  }
}
// Choose court dialog -------- end

function checkPlayerStatus(courtId: string | boolean | undefined) {
  return courtsStore.courts.find(c => c.id === courtId)
}
</script>

<template>
  <div class="col-span-2">
    <div class="text-right">
      <Dialog v-model:open="isDialogOpen">
        <DialogTrigger as-child>
          <Button class="self-end">
            加入玩家
            <UserRoundPlus class="w-4 h-4 ml-2" />
          </Button>
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
            <Button type="submit" :disabled="!isValid" @click="isEdit ? updatePlayer() : addPlayer()">
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
          <TableHead class="w-[100px]">狀態</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="player in playersStore.players" :key="player.id">
          <TableCell class="font-medium">
            {{ player.name }}
          </TableCell>
          <TableCell>
            <div 
              class="text-center rounded-lg border border-stone-100" 
              :style="{ backgroundColor: getLevelColor(player.level) }"
            >
              {{ player.level }}
            </div>
          </TableCell>
          <TableCell>{{ player.gamesPlayed }}</TableCell>
          <TableCell>
            <div 
              class="w-8 h-4 rounded-lg" 
              :class="checkPlayerStatus(player.onCourt) ? 'bg-lime-500' : 'bg-gray-300'"
            ></div>
          </TableCell>
          <TableCell>
            <Dialog @update:open="handleDialogClose">
              <DialogTrigger as-child>
                <Button variant="ghost" class="ml-2">
                  <Plus class="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>加入場地</DialogTitle>
                  <DialogDescription>
                    選擇上場場地或加入預覽球場
                  </DialogDescription>
                </DialogHeader>
                <RadioGroup v-model="courtId">
                  <div 
                    v-for="court in courtsStore.previewCourts" 
                    :key="court.id" 
                    class="flex items-center space-x-2"
                  >
                    <RadioGroupItem :id="court.id" :value="court.id" :disabled="court.id === player.onCourt" />
                    <Label :for="court.id">{{ court.name }}</Label>
                  </div>
                  <div 
                    v-for="court in courtsStore.courts" 
                    :key="court.id" 
                    class="flex items-center space-x-2"
                  >
                    <RadioGroupItem :id="court.id" :value="court.id" :disabled="court.id === player.onCourt" />
                    <Label :for="court.id">{{ court.name }}</Label>
                  </div>
                </RadioGroup>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button type="submit" :disabled="!courtId" @click="addToCourt(player)">
                      加入場地
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="ghost" class="ml-2" @click="openEdit(player.id)">
              <Pencil class="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="ghost" class="ml-2 text-red-700">
                  <UserRoundX class="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>你確定要刪除 {{ player.name }} ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    如果在正在場上的球員被消除，剩下的球員也不會完成場次
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction 
                    class="bg-red-700 hover:bg-red-800" 
                    @click="deletePlayer(player.id)"
                  >
                    刪除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </TableCell>
        </TableRow>

        <TableRow v-if="playersStore.players.length === 0">
          <TableCell :colSpan="4" class="text-center">無玩家</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
