<script lang="ts" setup generic="T = unknown">
const promise = ref<Promise<T>>()
const isOpen = ref<boolean>(false)

let resolver: (result: T) => void
let rejecter: (reason: unknown) => void

const open = (): Promise<T> => {
  const value = toValue(promise)
  if (value) {
    return value
  }

  promise.value = new Promise((resolve, reject) => {
    isOpen.value = true
    resolver = resolve
    rejecter = reject
  })

  return toValue(promise)!
}

const resolve = (result: T) => {
  resolver(result)
  isOpen.value = false
  promise.value = undefined
}

const reject = (reason: unknown) => {
  rejecter(reason)
  isOpen.value = false
  promise.value = undefined
}

defineExpose({ open, resolve, reject })

</script>
<template>
  <section v-if="isOpen" class="fixed z-999 inset-0 overflow-y-auto">
    <slot :resolve="resolve" :reject="reject" />
  </section>
</template>