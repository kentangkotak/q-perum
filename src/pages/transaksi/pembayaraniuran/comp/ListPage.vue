<template>
  <div align="center">
    <div class="row q-gutter-none">
      <div class="col-12">
        <div class="card">
          <div class="q-pa-sm bg-white">
            <div class="row items-center justify-between">
              <div class="col text-h6 text-weight-bold">
                <q-icon name="local_atm" /> Data Pembayaran Warga
              </div>
              <div class="col-auto">
                <q-btn
                  icon="add"
                  class="text-yellow-8"
                  tooltip="Tambah Data"
                  color="grey-10"
                  round
                  size="sm"
                  @click="emits('add')"
                />
              </div>
            </div>

            <!-- Input cari data -->
            <div class="q-mt-xxs">
              <q-input
                dense
                outlined
                v-model="store.params.q"
                clearable
                label="Cari Data"
                class="full-width"
                @update:model-value="store.getlist()"
              >
                <template v-slot:prepend>
                  <q-icon name="search" size="xs" />
                </template>
              </q-input>
            </div>
            <div class="row q-mt-xs q-gutter-xs">
              <div class="col-7">
                <q-select
                  v-model="store.params.bulan"
                  round
                  dense
                  outlined
                  label="Bulan"
                  :options="props.bulan"
                  option-label="nama"
                  option-value="id"
                  emit-value
                  map-options
                  @update:model-value="store.getlist()"
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
                  @update:model-value="store.getlist()"
                />
              </div>
            </div>
          </div>

          <q-separator class="q-mt-xs full-width" />

          <div v-if="store.loading" class="q-pa-md flex flex-center">
            <q-spinner-dots color="primary" size="3em" />
          </div>

          <div v-else>
            <transition-group name="list" tag="div">
              <q-list v-for="(item, index) in store.items" :key="index" class="full-width">
                <q-item clickable v-ripple class="q-mb-xxs">
                  <q-item-section avatar> {{ index + 1 }}. </q-item-section>

                  <q-item-section top class="text-left" style="font-size: x-small">
                    <q-item-label class="q-mt-sm text-weight-bold" lines="1">
                      Notrans :<span class="text-primary"> {{ item?.notrans }} </span>
                    </q-item-label>
                    <q-item-label lines="1">
                      Nama :
                      <q-badge color="teal" outline>
                        {{ item?.nama }}
                      </q-badge>
                    </q-item-label>
                    <q-item-label lines="1">
                      Bulan Bayar : {{ getNamaBulan(item?.bulan) }} {{ item?.tahun }}
                    </q-item-label>
                    <q-item-label lines="1">
                      Nominal :<span class="text-red text-weight-bold">
                        Rp. {{ formatDouble(item?.nominal) }}
                      </span>
                    </q-item-label>
                    <q-item-label lines="1"> Cara Bayar : {{ item?.cara_bayar }} </q-item-label>
                    <q-item-label lines="1"> Keterangan : {{ item?.keterangan }} </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="emits('hapus', item)"
                      />
                      <q-btn
                        size="12px"
                        flat
                        dense
                        round
                        icon="edit"
                        @click="emits('edit', item)"
                      />
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator class="q-mt-xs full-width" />
              </q-list>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDouble } from 'src/modules/utils'
import { usePembayaranIuranStore } from 'src/stores/transaksi/pembayaraniuran'
import { getNamaBulan } from 'src/utils/dateHelper'
const store = usePembayaranIuranStore()
const emits = defineEmits(['add', 'edit', 'hapus'])
const props = defineProps({
  bulan: {
    type: Object,
    default: null,
  },
})
const tahunOptions = [store.form.tahun - 1, store.form.tahun, store.form.tahun + 1]
</script>
