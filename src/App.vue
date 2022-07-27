<template>
  <section class="section">
    <!-- <div class="container is-fullhd"> -->
    <v-row no-gutters>
      <v-col v-for="(room, index) in day1" :key="index" cols="12" sm="2">
        <h2>{{ index }}</h2>
        <v-card
          v-for="(title, i) in room.title"
          :id="index + '-' + room.start[i]"
          :key="i"
          :class="title == 'EMPTY' ? '' : index"
          :style="{ height: room.height[i] * 10 + 'px' }"
          :title="room.start[i]"
          :text="title"
        />
      </v-col>
    </v-row>
    <!-- </div> -->
  </section>
</template>

<script setup>
import { schedule } from "./schedule.json"

const timeToMinutes = (d) => {
  const hh = d.slice(0, 2)
  const mm = d.slice(3, 5)
  return parseInt(hh) * 60 + parseInt(mm)
}

const minutesToTime = (mm) => {
  const h = Math.floor(mm / 60)
  const hh = h < 10 ? `0${h}` : `${h}`
  mm = mm % 60
  let d = `${hh}:${mm}`
  if (mm == 0) {
    d = d + "0"
  }
  return d
}

const days = schedule.conference.days.slice(8, 11)

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