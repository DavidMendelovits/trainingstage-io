<template>
  <div class="parent" @click="cycleThrough">
    <div class="instruction">
      <figure class="instruction image is-centered is-128x128" :id="`${step}`">
        <img :src="`instructions/${step}.png`" :class="`has-ratio`">
      </figure>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, useContext } from 'nuxt-composition-api'
export default {
  props: {
    needed: {
    }
  },
  setup (props) {
    const state = reactive({
      step: 0,
      steps: ['playpause', 'leftward', 'rightward'],
      focus: 'playpause',
      directions: ['container', 'level-left', 'level-right']
    })
    const { store } = useContext()
    const cycleThrough = () => {
      state.step = (state.step + 1) % 3
      if (state.step === 0) {
        store.commit('TOGGLE_INSTRUCTION')
      }
    }
    const step = computed(() => {
      return state.steps[state.step]
    })
    const direction = computed(() => {
      return state.directions[state.step]
    })
    const reverse = computed(() => {
      return (state.step === 1)
        ? state.directions[2]
        : state.directions[1]
    })

    const mask = (idx) => {
      console.log('idx', idx, 'step', state.step)
      return (!(idx === state.step))
        ? 'visibility: hidden;'
        : ''
    }

    const reveal = computed(() => {
      let i = 0
      const steps = []
      while (i < 3) {
        if (state.step == i) {
          steps.push(state.steps[state.step])
        } else {
          steps.push(null)
        }
        i += 1
      }
      return steps
    })

    return {
      state,
      cycleThrough,
      step,
      direction,
      reverse,
      reveal,
      mask
    }
  }
}
</script>

<style scoped>
.parent {
  position: absolute;
  z-index: 10;
  object-fit: contain;
}
.instruction {
  display: grid;
  z-index: 10;
  object-fit: contain;
}

#leftward {
  position: inherit;
  justify-self: start;
  /* left: 10%; */
}
#rightward {
  position: inherit;
  justify-self: end;
  /* right: 10%; */
}
#playpause {
  position: inherit;
  justify-self: center;
  /* left: 50%; */
}
#mid {
  align-self: center;
}
</style>
