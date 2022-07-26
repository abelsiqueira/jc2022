# Hello VitePress

<div class="columns">
  <div v-for="(room, index) in day1" class="column">
    <h2>{{ index }}</h2>
    <div
      v-for="(title, i) in room.title"
      :class='"card is-size-7 mb-1 " + index + " my-height-" + room.duration[i]'
      :id='index + "-" + room.start[i]'
      :style="{ top: room.top[i] + 'px', position: 'inherit' }"
    >
      <div class="card-header">
        {{ room.start[i] }}, {{ room.duration[i] }}
      </div>
      <div class="card-content">
        {{ title }}
      </div>
    </div>
  </div>
</div>

<script setup>
import { schedule } from './schedule.json'

const durationToMinutes = (d) => {
  const hh = d.slice(0,2)
  const mm = d.slice(3,5)
  return parseInt(hh) * 60 + parseInt(mm)
}

const days = schedule.conference.days.slice(8,11)

const roomNames = Object.keys(days[0].rooms)

const day1 = {}
for (const room of roomNames) {
  if (room == 'Sponsored forums') {
    continue
  }
  const roomArray = days[0].rooms[room]
  day1[room] = {
    'color': room == 'Red' ? 'red' : 'white',
    'title': roomArray.map(x => x.title),
    'start': roomArray.map(x => x.start),
    'duration': roomArray.map(x => durationToMinutes(x.duration)),
    'top': roomArray.map(x => (durationToMinutes(x.start) - durationToMinutes('12:30')) * 3)
  }
}
console.log(day1)
</script>

<style>
.container, .content, .content-container {
  width: 1600px !important;
  max-width: 1600px !important;
}

.Red {
  background-color: #ffaaaa;
}

.my-height-10 {
  height: 100px;
}
.my-height-30 {
  height: 309px;
}
.my-height-90 {
  height: 935px;
}
</style>
