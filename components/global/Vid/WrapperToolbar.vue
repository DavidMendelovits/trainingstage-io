<template>
  <div class="card" v-hotkey="keymap">
    <nav class="level is-mobile">
      <div class="level-left">
        <!-- <div class="level-item">
          <WrapperToolbarButton icon="icon-rocket" />
        </div> -->

        <div class="level-item" @click="overlayInstructions">
          <WrapperToolbarButton icon="icon-question" />
        </div>
        <div class="level-item" @click="promptUserInput">
          <WrapperToolbarButton icon="icon-paper-clip" />
        </div>
          <div class="level-item">
            <span class="tag is-medium" @click="changeSpeed('slow')">
              -
            </span>
            <span class="icon is-medium">
              <i class="icon-speedometer"></i>
              {{ frameRate }}
            </span>
            <span class="tag is-medium" @click="changeSpeed('fast')">
              +
            </span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item tag is-large">
          <button class="button" v-on:click="toggleSplit">
            <span class="icon" >
              <i v-show="!state.split" class="icon-frame" />
              <i class="icon-frame" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref, computed, reactive } from '@vue/composition-api'
import { useContext } from 'nuxt-composition-api'
export default {
  props: {
    frameRate: {
      type: Number,
      default: 1
    }
  },
  setup (props, {emit}) {
    const state = reactive({
      split: false,
      frame: 'icon-frame'
    })
    const { store } = useContext()

    const changeSpeed = (to) => {
      emit('change', to)
    }
    const promptUserInput = () => {
      console.log('promptuserInput')
      emit('paperclip')
      // store.commit('TOGGLE_INPUT')
    }
    const toggleSplit = () => {
      store.commit('TOGGLE_SPLIT')
      if (!(state.split = !state.split)) {

      } else {

      }
    }

    const keymap = computed(() => {
      return {
        '[': () => changeSpeed('slow'),
        ']': () => changeSpeed('fast')
      } 
    })

    const overlayInstructions = () => {
      console.log('overlayInstruction')
      emit('question')

      store.commit('TOGGLE_INSTRUCTION')
    }

    return {
      state,
      promptUserInput,
      toggleSplit,
      overlayInstructions,
      changeSpeed,
      keymap
    }
  },
  methods: {
  }
}
</script>
