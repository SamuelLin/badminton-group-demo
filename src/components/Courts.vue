<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Court from '@/components/Court.vue'
import { useCourtsStore } from '@/stores/courts'
import { Plus } from 'lucide-vue-next'

const courtsStore = useCourtsStore()

const newCourtName = ref('')

const isDuplicateCourtName = computed(() => {
  return courtsStore.courts.findIndex(c => c.name.toLowerCase() === newCourtName.value.trim()) > -1
})

function handleAddCourt() {
  courtsStore.addCourt({
    name: newCourtName.value,
    players: []
  })
  newCourtName.value = ''
}
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
    <Court v-for="court in courtsStore.courts" :key="court.name" :data="court"/>
    <Dialog>
      <DialogTrigger as-child>
        <div 
          class="
            flex 
            justify-center 
            items-center 
            rounded-lg 
            outline-dashed 
            outline-2 
            outline-gray-300 
            text-gray-300
            p-6
            cursor-pointer
          "
        >
          <Plus class="w-6 h-6 mr-1" /> 新增場地
        </div>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增場地</DialogTitle>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              名稱
            </Label>
            <Input id="name" v-model.trim="newCourtName" class="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button :disabled="!newCourtName || isDuplicateCourtName" @click="handleAddCourt">
              新增
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
