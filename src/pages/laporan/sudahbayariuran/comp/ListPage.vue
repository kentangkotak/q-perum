<template>
  <q-card class="q-mt-sm">
    <!-- Spinner saat loading -->
    <div v-if="store.loading" class="q-pa-md flex flex-center">
      <q-spinner-dots color="primary" size="3em" />
    </div>

    <!-- List data -->
    <div v-else>
      <transition-group name="list" tag="div">
        <q-list
          v-for="(item, index) in store.items"
          :key="item.notrans || index"
          class="full-width"
        >
          <q-item clickable v-ripple class="q-mb-xxs">
            <q-item-section avatar> {{ index + 1 }}. </q-item-section>

            <q-item-section top class="text-left" style="font-size: x-small">
              <q-item-label class="q-mt-sm text-weight-bold" lines="1">
                Notrans :
                <span class="text-primary"> {{ item.notrans }} </span>
              </q-item-label>

              <!-- Detail lainnya (aktifkan bila perlu) -->

              <q-item-label lines="1">
                Nama :
                <q-badge color="teal" outline>{{ item.nama }}</q-badge>
              </q-item-label>
              <q-item-label lines="1">
                Bulan Bayar : {{ getNamaBulan(item.bulan) }} {{ item.tahun }}
              </q-item-label>
              <q-item-label lines="1">
                Nominal :
                <span class="text-red text-weight-bold">
                  Rp. {{ formatDouble(item.nominal) }}
                </span>
              </q-item-label>
              <q-item-label lines="1"> Cara Bayar : {{ item.cara_bayar }} </q-item-label>
              <q-item-label lines="1"> Keterangan : {{ item.keterangan }} </q-item-label>
              <q-item-label lines="1">
                Di Bayar Pada Tanggal : {{ formatTanggal(item.created_at) }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-xs full-width" />
        </q-list>
      </transition-group>
    </div>
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
