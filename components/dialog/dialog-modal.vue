<script lang="ts" setup generic="T = unknown">
const dialog = ref<HTMLDialogElement>()
const promise = ref<Promise<T>>()

let resolver: (result: T) => void
let rejecter: (reason: unknown) => void

const open = (): Promise<T> => {
  const value = toValue(promise)
  if (value) {
    return value
  }

  promise.value = new Promise((resolve, reject) => {
    toValue(dialog)?.showModal()
    resolver = resolve
    rejecter = reject
  })

  return promise.value
}

const resolve = (result: T) => {
  resolver(result)
  toValue(dialog)?.close()
  promise.value = undefined
}

const reject = (reason: unknown) => {
  rejecter(reason)
  toValue(dialog)?.close()
  promise.value = undefined
}

defineExpose({ open, resolve, reject })

const handleDialogClick = (e) => {
  if (e.target === e.currentTarget) {
    reject(undefined)
  }
}

</script>
<template>
  <dialog ref="dialog" class="max-w-full ma-auto pa-6 bg-dark-600 rounded-7 shadow-lg shadow-dark-300 text-[#d4d4d4]" @click="handleDialogClick">
    <slot :resolve="resolve" :reject="reject" />
  </dialog>
</template>