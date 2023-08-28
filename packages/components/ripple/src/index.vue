<script lang="ts" setup>
import {
  reactive,
  watchEffect,
  onUnmounted,
  ref,
  getCurrentInstance,
  onMounted,
  computed,
} from 'vue'
import { RippleStyle, rippleProps } from './ripple'
import { addUnit } from '../../../utils/dom'
import { TinyColor } from '@ctrl/tinycolor'
const props = defineProps(rippleProps)

const ripplesArr = reactive<RippleStyle[]>([])
const duration = ref<number>(600)
const parent = getCurrentInstance()?.parent
let bounce: NodeJS.Timeout | null = null
let listener: EventListener | null = null

const color = computed(() => new TinyColor(props.color).tint(70).toString())

const addRipple = (event: MouseEvent) => {
  const target = <HTMLElement>event.currentTarget
  const rect = target.getBoundingClientRect()
  const size = Math.max(target.clientWidth, target.clientHeight)
  const radius = size / 2

  const x = props.center ? 0 : event.clientX - rect.left - radius
  const y = props.center ? 0 : event.clientY - rect.top - radius
  ripplesArr.push({ x, y, size })
}

const clear = () => {
  if (bounce) {
    clearTimeout(bounce)
    bounce = null
  }
}

watchEffect(() => {
  if (ripplesArr.length > 0) {
    clear()

    bounce = setTimeout(() => {
      ripplesArr.length = 0
      clear()
    }, duration.value * 4)
  }
})

onMounted(() => {
  if (parent) {
    listener = parent.proxy?.$el.addEventListener('mousedown', addRipple)
  }
})
onUnmounted(() => {
  clear()
  if (listener) {
    parent?.proxy?.$el.removeEventListener(listener)
    listener = null
  }
})
defineExpose({ addRipple })
</script>

<script lang="ts">
export default {
  name: 'FuRipple',
}
</script>

<template>
  <span class="fn-ripple-root">
    <span
      v-for="(ripple, index) of ripplesArr"
      :key="`ripple_${index}`"
      :style="{
        top: addUnit(ripple.y),
        left: addUnit(ripple.x),
        width: addUnit(ripple.size),
        height: addUnit(ripple.size),
        '--fn-ripple-color': color,
      }"
      class="fn-ripple"
    ></span>
  </span>
</template>