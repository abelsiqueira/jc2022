<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          What is your time zone:
          <v-slider
            v-model="tzOffset"
            min="-12"
            max="12"
            step="1"
          />
          <v-text-field v-model="tzOffset" />
        </v-col>

        <v-spacer></v-spacer>

        <v-col>
          <v-tabs
            v-model="selectedDay"
            background-color="primary"
          >
            <v-tab
              v-for="day in Object.keys(schedulePerDay)"
              :key="day"
              :value="day"
            >
              {{ day }}
            </v-tab>
          </v-tabs>
          <br />
          Cutoff time: {{ minutesToTime(cutOffTime + tzOffset * 60) }} (Warning:
          this can break time alignment)
          <v-slider
            v-model="cutOffTime"
            min="540"
            max="1230"
            step="10"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-window v-model="selectedDay">
        <v-window-item
          v-for="(thisSchedule, schIndex) in schedulePerDay"
          :key="schIndex"
          :value="schIndex"
        >
          <v-row no-gutters>
            <v-col
              v-for="(room, index) in thisSchedule"
              :key="index"
              cols="12"
              sm="2"
            >
              <h2>{{ index }}</h2>
              <div
                v-for="(title, i) in room.title"
                :key="i"
              >
                <talk-card
                  v-if="timeToMinutes(room.start[i]) >= cutOffTime"
                  :height="room.height[i]"
                  :room="index"
                  :start="room.start[i]"
                  :title="title"
                  :tz-offset="tzOffset"
                />
              </div>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
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
const cutOffTime = ref(9 * 60)

const roomNames = Object.keys(days[0].rooms)
const schedulePerDay = {}
const selectedDay = ref(days[0].date)

for (const day of days) {
  schedulePerDay[day.date] = {}
  const thisDay = schedulePerDay[day.date]
  let dayStart = "23:59"
  for (const room of roomNames) {
    if (timeToMinutes(day.rooms[room][0].start) < timeToMinutes(dayStart)) {
      dayStart = day.rooms[room][0].start
    }
  }
  for (const room of roomNames) {
    if (room == "Sponsored forums") {
      continue
    }
    const roomArray = day.rooms[room]
    let currTime = dayStart
    thisDay[room] = {
      color: room == "Red" ? "red" : "white",
      title: [],
      start: [],
      duration: [],
      height: [],
    }
    for (let i = 0; i < roomArray.length; i++) {
      const talk = roomArray[i]
      if (currTime < talk.start) {
        thisDay[room].title.push("EMPTY")
        thisDay[room].start.push(currTime)
        const nextTalkStart = talk.start
        const d = timeToMinutes(nextTalkStart) - timeToMinutes(currTime)
        thisDay[room].duration.push(d)
        thisDay[room].height.push(d)
        currTime = minutesToTime(timeToMinutes(currTime) + d)
      }
      thisDay[room].title.push(talk.title)
      thisDay[room].start.push(talk.start)
      thisDay[room].duration.push(timeToMinutes(talk.duration))
      thisDay[room].height.push(timeToMinutes(talk.duration))
      currTime = minutesToTime(
        timeToMinutes(currTime) + timeToMinutes(talk.duration)
      )
    }
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

.v-tab--selected {
  background-color: #66a;
}
</style>
