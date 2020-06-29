<template>
  <div @drop.prevent="updateSourceVid" @dragover.prevent>
    <!-- <WrapperToolbar v-on:paperclick="togglePaperclip"/>
    <WrapperInput :active="paperclip" v-on:input="handleIn" /> -->
    <Player
      v-if="!embed"
      :src="source"
      :key="toggle"
    />
    <div v-if="embed">
      <Embed
        :value="videoEmbed"
        :key="!toggle"
      />
    </div>
  </div>
</template>
