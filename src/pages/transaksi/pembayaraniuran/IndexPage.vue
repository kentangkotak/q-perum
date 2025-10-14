<template>
  <div class="container">
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
        :warga="store.items"
        :bulan="storeBulan.items"
      />
      <FormPage
        v-else
        :data="item"
        @back="isList = true"
        :bulan="storeBulan.items"
        :iuran="storeiuran.items"
        :warga="store.items"
        :carabayar="carabayar"
      />
    </div>
    <AppFooter />
  </div>
</template>
<script setup>
import AppFooter from 'src/components/common/AppFooter.vue'
import ListPage from './comp/ListPage.vue'
import FormPage from './comp/FormPage.vue'
import { onMounted, ref } from 'vue'
import { useManggotaStore } from 'src/stores/master/manggota'
import { useBulanStore } from 'src/stores/master/bulan'
import { useNominalIuranStore } from 'src/stores/master/nominaliuran'
import { usePembayaranIuranStore } from 'src/stores/transaksi/pembayaraniuran'

const store = useManggotaStore()
const storeBulan = useBulanStore()
const storeiuran = useNominalIuranStore()
const storepembayaran = usePembayaranIuranStore()
const isList = ref(true)
const item = ref(null)

const carabayar = [
  { label: 'Tunai', value: 1 },
  { label: 'Transfer', value: 2 },
]

onMounted(() => {
  store.getlist()
  storeBulan.getlist()
  storeiuran.getlist()
  storepembayaran.getlist()
})
</script>
