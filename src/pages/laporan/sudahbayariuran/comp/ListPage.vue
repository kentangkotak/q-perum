<template>
  <q-card class="q-mt-sm">
    <q-card-section>
      <!-- Spinner saat loading -->
      <div v-if="store.loading" class="q-pa-md flex flex-center">
        <q-spinner-dots color="primary" size="3em" />
      </div>

      <!-- List data -->
      <div v-else id="laporan-pdf">
        <transition-group name="list" tag="div">
          <q-list v-for="(item, index) in store.items" :key="item.notrans || index" class="q-mb-sm">
            <q-item clickable v-ripple class="bg-grey-1 q-pa-sm rounded-borders">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" size="28px">
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>

              <q-item-section top class="text-left text-caption">
                <div class="column q-gutter-xs">
                  <div>
                    <strong>Notrans:</strong> <span class="text-primary">{{ item.notrans }}</span>
                  </div>
                  <div>
                    <strong>Nama:</strong>
                    <q-badge color="teal" outline class="wrap-text">
                      {{ item.nama }}
                    </q-badge>
                  </div>
                  <div>
                    <strong>Bulan Bayar:</strong> {{ getNamaBulan(item.bulan) }} {{ item.tahun }}
                  </div>
                  <div>
                    <strong>Nominal:</strong>
                    <span class="text-red text-weight-bold"
                      >Rp. {{ formatDouble(item.nominal) }}</span
                    >
                  </div>
                  <div><strong>Cara Bayar:</strong> {{ item.cara_bayar }}</div>
                  <div>
                    <strong>Keterangan:</strong>
                    <span class="wrap-text">{{ item.keterangan }}</span>
                  </div>

                  <div><strong>Tanggal Bayar:</strong> {{ formatTanggal(item.created_at) }}</div>
                </div>
              </q-item-section>
            </q-item>

            <q-separator class="q-mt-xs full-width" />
          </q-list>
        </transition-group>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { formatDouble } from 'src/modules/formatter'
import { useLapPembayaranIuranStore } from 'src/stores/laporan/lappembayaraniuran'
import { getNamaBulan } from 'src/utils/dateHelper'

const store = useLapPembayaranIuranStore()

function formatTanggal(tanggal) {
  if (!tanggal) return '-'
  const date = new Date(tanggal)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.wrap-text {
  word-break: break-word;
  white-space: normal;
}
</style>
