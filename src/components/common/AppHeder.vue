<template>
  <div
    class="q-py-sm q-mb-md bg-blue-grey-10 text-white shadow-3"
    style="border-radius: 0 0 35px 35px"
  >
    <div class="text-h7 text-weight-bold">{{ icon }} {{ title }}</div>

    <div class="text-caption q-ml-md">{{ keterangan }}</div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Judul',
  },
  keterangan: {
    type: String,
    default: 'Keterangan',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>
