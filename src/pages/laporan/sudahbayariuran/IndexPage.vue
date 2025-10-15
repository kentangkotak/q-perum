<template>
  <div v-if="storebulan.items.length === 0" class="q-pa-md flex flex-center">
    <q-spinner-dots color="primary" size="3em" align="center" />
  </div>
  <div v-else class="q-pa-sm">
    <FormPencarian :bulan="storebulan.items" />
    <ListPage />
  </div>
</template>
<script setup>
import { useBulanStore } from 'src/stores/master/bulan'
import FormPencarian from './comp/FormPencarian.vue'
import ListPage from './comp/ListPage.vue'
import { onMounted } from 'vue'

const storebulan = useBulanStore()

onMounted(() => {
  storebulan.getlist()
  // store.params.bulan = sasa.kode
})
</script>
