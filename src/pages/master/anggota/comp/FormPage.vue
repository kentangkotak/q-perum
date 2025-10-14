<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 items-center">
          <div class="row">
            <div class="col-2">
              <q-btn
                icon="arrow_back"
                @click="emits('back')"
                class="bg-black text-yellow-8"
                size="sm"
                round
              />
            </div>
            <div class="col-10">
              <span class="text-weight-bold underline">TAMBAH ANGGOTA</span>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-form @submit="onSubmit">
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="store.form.nama"
                round
                dense
                outlined
                label="Nama Lengkap"
                :rules="[(val) => !!val || 'Nama wajib diisi']"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="store.form.nik"
                round
                dense
                outlined
                label="No. KTP"
                :rules="[(val) => !!val || 'No. Ktp wajib diisi']"
              />
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
import { useManggotaStore } from 'src/stores/master/manggota'

const store = useManggotaStore()
const emits = defineEmits(['back'])

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

if (props.data) {
  store.form.id = props.data?.id
  store.form.nama = props.data?.name
  store.form.nik = props.data?.nik
}

function onSubmit() {
  store.simpan()
}
</script>
