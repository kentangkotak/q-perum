<template>
  <div v-if="storebulan.items.length === 0" class="q-pa-md flex flex-center">
    <q-spinner-dots color="primary" size="3em" align="center" />
  </div>
  <div v-else class="q-pa-sm">
    <FormPencarian :bulan="storebulan.items" />

    <!-- Tombol Export PDF -->
    <q-btn
      label="Export PDF"
      icon="picture_as_pdf"
      color="primary"
      class="q-mt-sm q-mb-sm full-width"
      @click="exportToPDF"
    />

    <!-- Tampilan interaktif -->
    <ListPage />

    <!-- Versi PDF tersembunyi -->
    <div style="display: none">
      <LaporanPDF
        ref="pdfRef"
        :items="store.items"
        :bulanx="store.params.bulan"
        :tahun="store.params.tahun"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import html2pdf from 'html2pdf.js'
import { useBulanStore } from 'src/stores/master/bulan'
import { useLapPembayaranIuranStore } from 'src/stores/laporan/lappembayaraniuran'
import FormPencarian from './comp/FormPencarian.vue'
import ListPage from './comp/ListPage.vue'
import LaporanPDF from './comp/LaporanPDF.vue'
import { getNamaBulan } from 'src/utils/dateHelper'

const storebulan = useBulanStore()
const store = useLapPembayaranIuranStore()
const pdfRef = ref(null)

onMounted(() => {
  storebulan.getlist()
})

function exportToPDF() {
  const element = pdfRef.value?.$el
  if (!element) return

  const namaBulan = getNamaBulan(store.params.bulan)
  const tahun = store.params.tahun

  const filename = `Kas_${namaBulan}_${tahun}.pdf`

  html2pdf()
    .set({
      margin: 0.5,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    })
    .from(element)
    .save()
}
</script>
