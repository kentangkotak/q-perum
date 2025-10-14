<template>
  <div class="container">
    <!-- <AppHeder
      title="Master Warga"
      keterangan="Kelola data Warga dengan mudah di halaman ini"
      icon="📋"
    /> -->
    <div class="q-pa-sm fit">
      <ListPage
        v-if="isList"
        @add="
          () => {
            item = null
            isList = false
          }
        "
        @edit="
          (data) => {
            item = data
            isList = false
          }
        "
      />
      <FormPage v-else :data="item" @back="isList = true" />
    </div>
    <AppFooter />
  </div>
</template>
<script setup>
// import AppHeder from 'src/components/common/AppHeder.vue'
import AppFooter from 'src/components/common/AppFooter.vue'
import ListPage from './comp/ListPage.vue'
import FormPage from './comp/FormPage.vue'
import { onMounted, ref } from 'vue'
import { useManggotaStore } from 'src/stores/master/manggota'

const store = useManggotaStore()
const isList = ref(true)
const item = ref(null)

onMounted(() => {
  store.getlist()
})
</script>
