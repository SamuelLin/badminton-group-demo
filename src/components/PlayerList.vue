<script setup lang="ts">
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const players = [
    { name: 'player 1', level: 7, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 2', level: 3, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 3', level: 5, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 4', level: 6, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 5', level: 8, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 6', level: 4, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 7', level: 11, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 8', level: 6, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 9', level: 2, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
    { name: 'player 10', level: 5, gamesPlayed: 0, playersMatched: {}, onCourt: '' },
  ];
</script>

<template>
  <div>
    <div class="text-right">
      <Dialog>
        <DialogTrigger as-child>
          <Button class="self-end">加入玩家</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>加入玩家</DialogTitle>
            <DialogDescription>
              新增玩家到玩家列表，完成時點擊加入
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                名稱
              </Label>
              <Input id="name" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="level" class="text-right">
                等級
              </Label>
              <Input id="level" type="number" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              加入
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
        <TableRow v-for="player in players" :key="player.name">
          <TableCell class="font-medium">
            {{ player.name }}
          </TableCell>
          <TableCell>{{ player.level }}</TableCell>
          <TableCell>{{ player.gamesPlayed }}</TableCell>
          <TableCell>
            <Button variant="ghost" class="text-red-700">skip</Button>
            <Button variant="ghost" class="ml-2">離開</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
