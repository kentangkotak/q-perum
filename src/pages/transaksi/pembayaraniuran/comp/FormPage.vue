<template>
  <div>
    <q-card>
      <q-card-section class="q-pa-sm">
        <div class="column">
          <!-- Baris judul -->
          <div class="row items-center q-gutter-sm">
            <q-btn
              icon="arrow_back"
              @click="emits('back')"
              class="bg-black text-yellow-8"
              size="sm"
              round
            />
            <div class="text-h6 text-weight-bold underline">MASUKKAN PEMBAYARAN</div>
          </div>

          <!-- Baris nomor pembayaran -->
          <div class="row q-mt-xs items-center">
            <div class="col-auto">
              <!-- Spacer kecil agar sejajar dengan tombol -->
            </div>
            <div class="col text-weight-bold text-grey-9" style="font-size: 0.85rem">
              No. Pembayaran :
              <span class="text-primary">{{ store.form.notrans ?? '-' }}</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section style="max-height: 100vh" class="scroll">
          <div class="row">
            <div class="col-8">
              <q-select
                v-model="store.form.bulan"
                round
                dense
                outlined
                label="Pembayaran Bulan"
                :options="bulan"
                option-label="nama"
                option-value="kode"
                emit-value
                map-options
                :rules="[(val) => !!val || 'Nama wajib diisi']"
              />
            </div>
            <div class="col-4 q-pl-sm">
              <q-select
                v-model="store.form.tahun"
                round
                dense
                outlined
                label="Pembayaran Tahun"
                :options="tahunOptions"
                option-label="nama"
                option-value="id"
                emit-value
                map-options
                :rules="[(val) => !!val || 'Nama wajib diisi']"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="store.form.warga_id"
                round
                dense
                outlined
                label="Nama Warga"
                :options="options"
                option-label="name"
                option-value="id"
                emit-value
                map-options
                use-input
                @filter="filterWarga"
                :rules="[(val) => !!val || 'No. Ktp wajib diisi']"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="store.form.jeniskewargaan"
                round
                dense
                outlined
                label="jenis Kewargaan"
                :options="props.iuran"
                option-label="jenis"
                option-value="id"
                emit-value
                map-options
                @update:model-value="(val) => carinominal(val)"
                :rules="[(val) => !!val || 'No. Ktp wajib diisi']"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="store.form.jumlah"
                round
                dense
                outlined
                type="number"
                disable
                label="Jumlah"
                :rules="[(val) => !!val || 'No. Ktp wajib diisi']"
              />
            </div>
            <div class="col-12">
              <q-select
                v-model="store.form.carabayar"
                round
                dense
                outlined
                label="Cara Bayar"
                :options="props.carabayar"
                option-label="label"
                option-value="label"
                emit-value
                map-options
                :rules="[(val) => !!val || 'No. Ktp wajib diisi']"
              />
            </div>
            <div class="col-12">
              <q-input v-model="store.form.keterangan" label="Keterangan" outlined dense autogrow />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section align="right">
          <q-btn label="Simpan" color="dark" type="submit" :loading="store.loading" />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { usePembayaranIuranStore } from 'src/stores/transaksi/pembayaraniuran'
import { onMounted, ref } from 'vue'

const store = usePembayaranIuranStore()
const emits = defineEmits(['back'])

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  bulan: {
    type: Object,
    default: null,
  },
  iuran: {
    type: Object,
    default: null,
  },
  warga: {
    type: Object,
    default: null,
  },
  carabayar: {
    type: Object,
    default: null,
  },
})

if (props.data) {
  store.form.id = props.data?.id
  store.form.nama = props.data?.name
  store.form.nik = props.data?.nik
}

const tahunOptions = [store.form.tahun - 1, store.form.tahun, store.form.tahun + 1]

const options = ref([props.warga])

function filterWarga(val, update) {
  if (val === '') {
    update(() => {
      options.value = props.warga
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()

    options.value = props.warga.filter((v) => v.name.toString().toLowerCase().indexOf(needle) > -1)
  })
}

function carinominal(val) {
  const data = props.iuran.find((v) => v.id === val)
  store.form.jumlah = data.nominal
}

function onSubmit() {
  store.simpan()
}

onMounted(() => {
  store.initReset()
  const stringdulu = store.form.bulan.toString()
  const sasa = props.bulan?.find((v) => v.kode === stringdulu)
  store.form.bulan = sasa.kode
})
</script>
