export const state = () => ({
  userVideo: []
})

export const mutations = {
  PUSH_VIDEO (state, blob) {
    state.userVideo.push(blob)
  },
  DELETE_VIDEO(state, index) {
    state.userVideo.splice(i, 1)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { error }) {
  }
}
