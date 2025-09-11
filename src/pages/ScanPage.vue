<template>
  <qrcode-stream v-if="!detected" @detect="onDetect"></qrcode-stream>
  <div v-else class="text-center q-pa-sm">
    <q-btn
      @click="
        detected = false;
        code = '';
      "
      label="Scan Again"
      icon="refresh"
      color="primary"
      class="text-h4 full-width"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import type { DetectedBarcode } from 'vue-qrcode-reader';

const detected = ref(false);
const code = ref('');

function onDetect(result: DetectedBarcode[]) {
  for (const res of result) {
    if (res.rawValue.startsWith('stsa$')) {
      if (!detected.value) {
        detected.value = true;
        code.value = res.rawValue.substring(5);
        console.log('Detected code:', code.value);
      }
      break;
    }
  }
}
</script>
