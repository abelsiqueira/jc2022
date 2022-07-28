<template>
  <div
    class="card-wrapper"
    :style="{ height: cardHeight + 'px' }"
  >
    <v-card
      :class="cardClass"
      :text="title"
      :title="minutesToTime(timeToMinutes(start) + 60 * tzOffset)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { minutesToTime, timeToMinutes } from "../utils/minutes"
const props = defineProps({
  start: { type: String, required: true },
  title: { type: String, required: true },
  height: { type: Number, required: true },
  room: { type: String, required: true },
  tzOffset: { type: Number, default: 0 },
})
const cardClass = props.title == "EMPTY" ? "empty" : props.room
const cardHeight = ref(
  props.height * 10 + Math.floor(props.height / 10 - 1) * 4
)
</script>

<style scoped>
.card-wrapper {
  padding-bottom: 4px;
  padding-right: 4px;
}

.v-card {
  height: 100%;
}

.Green {
  background-color: #bfb;
}
.Red {
  background-color: #fbb;
}
.Purple {
  background-color: #fbf;
}
.Blue {
  background-color: #bbf;
}
.BoF {
  background-color: #bbb;
}
.JuMP {
  background-color: #fdb;
}
.empty {
  visibility: hidden;
}
</style>
