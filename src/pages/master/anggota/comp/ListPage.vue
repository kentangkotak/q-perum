<template>
  <div align="center">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="q-pa-none q-gutter-sm bg-white flex items-center justify-between">
            <div class="col-6 q-pa-none text-h6 text-weight-bold">
              <q-icon name="people" /> Daftar Warga
            </div>
            <div class="col q-pa-none">
              <q-input
                dense
                outlined
                v-model="store.params.q"
                clearable
                @update:model-value="store.getlist()"
              >
                <template v-slot:prepend>
                  <q-icon name="search" size="xs" />
                </template>
              </q-input>
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
          <q-separator class="q-mt-xs full-width" />
          <div v-if="store.loading" class="q-pa-md">
            <q-spinner-dots color="primary" size="3em" />
          </div>
          <div v-else>
            <transition-group name="list" tag="div">
              <q-list v-for="(item, index) in store.items" :key="index" class="full-width">
                <q-item clickable v-ripple class="q-mb-sm">
                  <q-item-section avatar style="width: 35px !important; min-width: 25px !important">
                    <q-icon name="people" color="black" size="20px" />
                  </q-item-section>

                  <q-item-section top class="text-left" style="font-size: x-small">
                    <q-item-label class="q-mt-sm text-weight-bold" lines="1">
                      Nama : {{ item.name }}
                    </q-item-label>
                    <q-item-label lines="1">
                      No. KTP :
                      <q-badge color="teal" outline>
                        {{ item.nik }}
                      </q-badge>
                    </q-item-label>
                    <!-- <q-item-label lines="1">
                      Password :
                      <q-badge color="teal" outline>
                        {{ show ? item.pass : '*'.repeat(item.pass.length) }}
                      </q-badge>
                      <q-btn flat dense icon="visibility" @click="show = !show" />
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section side style="width: 60px">
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn
                        size="xs"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="emits('hapus', item)"
                      />
                      <q-btn size="xs" flat dense round icon="edit" @click="emits('edit', item)" />
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
// import { ref } from 'vue'
import { useManggotaStore } from 'src/stores/master/manggota'

const store = useManggotaStore()

// const show = ref(false)

const emits = defineEmits(['add', 'edit', 'hapus'])

// function onRefresh() {
//   console.log('Refresh clicked')
// }

// function dialog() {
//   store.dialog = true
// }
</script>

<style></style>
