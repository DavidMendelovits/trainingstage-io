export const state = () => ({
  userVideo: [],
  inputModal: false,
  split: false,
  instruction: false
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
  },
  TOGGLE_SPLIT(state) {
    state.split = !(state.split)
  },
  TOGGLE_INSTRUCTION(state) {
    state.instruction = !(state.instruction)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { error }) {
  }
}
