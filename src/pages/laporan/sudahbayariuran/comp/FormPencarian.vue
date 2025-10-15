<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-bold text-center">Laporan Yang Sudah Bayar Iuran</div>
      <q-separator />
      <div class="row q-gutter-xs q-mt-sm">
        <div class="col-7">
          <q-select
            v-model="store.params.bulan"
            round
            dense
            outlined
            label="Bulan"
            :options="props.bulan"
            option-label="nama"
            option-value="kode"
            emit-value
            map-options
            @update:model-value="store.setParams"
          />
        </div>
        <div class="col-4">
          <q-select
            v-model="store.params.tahun"
            round
            dense
            outlined
            label="Tahun"
            :options="tahunOptions"
            option-label="nama"
            option-value="id"
            emit-value
            map-options
            @update:model-value="store.setParams"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useLapPembayaranIuranStore } from 'src/stores/laporan/lappembayaraniuran'
import { onMounted } from 'vue'
// import { onMounted } from 'vue'

const store = useLapPembayaranIuranStore()

const props = defineProps({
  bulan: {
    type: Object,
    default: null,
  },
})

const tahunOptions = [store.params.tahun - 1, store.params.tahun, store.params.tahun + 1]

onMounted(() => {
  const stringdulu = store.params.bulan.toString()
  const sasa = props.bulan?.find((v) => v.kode === stringdulu)
  console.log('sasa', sasa)
  store.params.bulan = sasa.kode
  console.log('sasa', sasa, store.params.bulan)
})
</script>
