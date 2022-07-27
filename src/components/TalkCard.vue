<template>
  <v-card
    :class="title == 'EMPTY' ? '' : room"
    :style="{ height: height * 10 + 'px' }"
    :title="minutesToTime(timeToMinutes(start) + 60 * tzOffset)"
    :text="title"
  />
</template>

<script setup>
import { minutesToTime, timeToMinutes } from "../utils/minutes"
defineProps({
  start: { type: String, required: true },
  title: { type: String, required: true },
  height: { type: Number, required: true },
  room: { type: String, required: true },
  tzOffset: { type: Number, default: 0 },
})
</script>
