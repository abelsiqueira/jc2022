export const timeToMinutes = (d) => {
  const hh = d.slice(0, 2)
  const mm = d.slice(3, 5)
  return parseInt(hh) * 60 + parseInt(mm)
}

export const minutesToTime = (mm) => {
  const h = Math.floor(mm / 60)
  const hh = h < 10 ? `0${h}` : `${h}`
  mm = mm % 60
  let d = `${hh}:`
  if (mm < 10) {
    d += "0" + mm
  } else {
    d += mm
  }
  return d
}
