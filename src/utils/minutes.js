export const timeToMinutes = (d) => {
  console.log(d)
  const hh = d.slice(0, 2)
  const mm = d.slice(3, 5)
  return parseInt(hh) * 60 + parseInt(mm)
}

export const minutesToTime = (mm) => {
  const h = Math.floor(mm / 60)
  const hh = h < 10 ? `0${h}` : `${h}`
  mm = mm % 60
  let d = `${hh}:${mm}`
  if (mm == 0) {
    d = d + "0"
  }
  return d
}
