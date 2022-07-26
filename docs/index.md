# Hello VitePress

<div class="columns">
  <div v-for="(room, index) in day1" class="column">
    <h2>{{ index }}</h2>
    <div
      v-for="(title, i) in room.title"
      :class='"card is-size-7 mb-0 " + index'
      :id='index + "-" + room.start[i]'
      :style="{ height: room.height[i] + 'px' }"
    >
      <div class="card-header">
        {{ room.start[i] }}, {{ room.duration[i] }}
      </div>
      <div class="card-content p-1">
        {{ title }}
      </div>
    </div>
  </div>
</div>

<script setup>
import { schedule } from './schedule.json'

const timeToMinutes = (d) => {
  const hh = d.slice(0,2)
  const mm = d.slice(3,5)
  return parseInt(hh) * 60 + parseInt(mm)
}

const minutesToTime = (mm) => {
  const h = Math.floor(mm / 60)
  const hh = h < 10 ? `0${h}` : `${h}`
  mm = mm % 60
  let d = `${hh}:${mm}`
  if (mm == 0) {
    d = d + '0'
  }
  return d
}

const days = schedule.conference.days.slice(8,11)

const roomNames = Object.keys(days[0].rooms)

const day1 = {}
for (const room of roomNames) {
  if (room == 'Sponsored forums') {
    continue
  }
  const roomArray = days[0].rooms[room]
  let currTime = '12:30'
  day1[room] = {
    'color': room == 'Red' ? 'red' : 'white',
    'title': [],
    'start': [],
    'duration': [],
    'height': [],
  }
  for (let i = 0; i < roomArray.length; i++) {
    const talk = roomArray[i]
    if (currTime < talk.start) {
      day1[room].title.push('EMPTY')
      day1[room].start.push(currTime)
      const nextTalkStart = roomArray[i+1].start
      const d = timeToMinutes(nextTalkStart) - timeToMinutes(currTime)
      day1[room].duration.push(d)
      day1[room].height.push(d * 10)
      currTime = minutesToTime(timeToMinutes(currTime) + d)
      console.log(currTime)
    }
    day1[room].title.push(talk.title)
    day1[room].start.push(talk.start)
    day1[room].duration.push(timeToMinutes(talk.duration))
    day1[room].height.push(timeToMinutes(talk.duration) * 10)
    currTime = minutesToTime(timeToMinutes(currTime) + timeToMinutes(talk.duration))
    console.log(currTime)
  }
}
console.log(day1)
</script>

<style>
.container, .content, .content-container {
  width: 1600px !important;
  max-width: 1600px !important;
}
.card-header {
  background-color: #000;
  color: #fff;
}
.Red {
  background-color: #ffaaaa;
}
</style>
