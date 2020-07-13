export const play = (player, state) => {
  state.isPaused = false
  player.play()
}
export const pause = (player, state) => {
  state.isPaused = true
  player.pause()
}
export const togglePlayPause = (player, state) => {
    (state.isPaused)
    ? play(player, state)
    : pause(player, state)
}
export const seekBackward = (player,state, offset) => {
  console.log('<- for real')
  player.currentTime -= offset
  pause(player, state)
}

export const seekForward = (player, state, offset) => {
  console.log('-> for real')
  player.currentTime += offset
  pause(player, state)
}

export const setTime = (player, to) => {
  player.currentTime = to
}

export const setPlaybackRate = (player, to) => {
  player.playbackRate = to
}

export const getZone = (middleX, middleY, inX, inY) => {
  if (Math.abs(inX - middleX) <= 40 && Math.abs(inY - middleY) <= 40) {
    return (0)
  }
  const top = (inY < middleY)
  const left = (inX < middleX)
  if (top) {
    return (left) ? 1 : 2
  } else {
    return (left) ? 3 : 4
  }
}

export const handleTouch = (e, player, state) => {
  console.log('handleTouch', state)
  const face = (e.touches) ? e.touches[0] : e
  const videoBorderInfo = e.target.getBoundingClientRect()
  const middleY = videoBorderInfo.y + (videoBorderInfo.height / 2)
  const middleX = videoBorderInfo.x + (videoBorderInfo.width / 2)
  const zone = getZone(middleX, middleY, face.clientX, face.clientY)

  if (!zone) {
   (player.paused)
      ? play(player, state)
      : pause(player, state)
  } else if (zone % 2 === 0) {
    seekForward(player, state, state.frame)
  } else {
    seekBackward(player, state, state.frame)
  }
}

