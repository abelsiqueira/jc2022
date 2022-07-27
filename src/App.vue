<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <span> What is your time zone: </span>
          <v-slider
            v-model="tzOffset"
            min="-12"
            max="12"
            step="1"
          />
          <v-text-field
            v-model="tzOffset"
            hide-details
            density="compact"
            type="number"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row no-gutters>
        <v-col
          v-for="(room, index) in day1"
          :key="index"
          cols="12"
          sm="2"
        >
          <h2>{{ index }}</h2>
          <talk-card
            v-for="(title, i) in room.title"
            :key="i"
            :height="room.height[i]"
            :room="index"
            :start="room.start[i]"
            :title="title"
            :tz-offset="tzOffset"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { schedule } from "./schedule.json"
import { ref } from "vue"
import TalkCard from "./components/TalkCard.vue"
import { minutesToTime, timeToMinutes } from "./utils/minutes"

const days = schedule.conference.days.slice(8, 11)
const tzOffset = ref(0)

const roomNames = Object.keys(days[0].rooms)

const day1 = {}
for (const room of roomNames) {
  if (room == "Sponsored forums") {
    continue
  }
  const roomArray = days[0].rooms[room]
  let currTime = "12:30"
  day1[room] = {
    color: room == "Red" ? "red" : "white",
    title: [],
    start: [],
    duration: [],
    height: [],
  }
  for (let i = 0; i < roomArray.length; i++) {
    const talk = roomArray[i]
    if (currTime < talk.start) {
      day1[room].title.push("EMPTY")
      day1[room].start.push(currTime)
      const nextTalkStart = talk.start
      const d = timeToMinutes(nextTalkStart) - timeToMinutes(currTime)
      day1[room].duration.push(d)
      day1[room].height.push(d)
      currTime = minutesToTime(timeToMinutes(currTime) + d)
    }
    day1[room].title.push(talk.title)
    day1[room].start.push(talk.start)
    day1[room].duration.push(timeToMinutes(talk.duration))
    day1[room].height.push(timeToMinutes(talk.duration))
    currTime = minutesToTime(
      timeToMinutes(currTime) + timeToMinutes(talk.duration)
    )
  }
}
</script>

<style scoped>
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
</style>
