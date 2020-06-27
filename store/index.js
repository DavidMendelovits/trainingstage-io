export const state = () => ({
  userVideo: [],
  inputModal: false
})

export const mutations = {
  PUSH_VIDEO (state, blob) {
    state.userVideo.push(blob)
  },
  DELETE_VIDEO(state, index) {
    state.userVideo.splice(index, 1)
  },
  TOGGLE_INPUT(state) {
    state.inputModal = !(state.inputModal)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { error }) {
  }
}
