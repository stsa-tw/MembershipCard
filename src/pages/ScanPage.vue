<template>
  <qrcode-stream v-if="!detected" @detect="onDetect"></qrcode-stream>
  <div v-else class="text-center q-pa-sm">
    <q-btn
      @click="
        detected = false;
        code = '';
        valid = false;
      "
      label="Scan Again"
      icon="refresh"
      color="primary"
      class="text-h4 full-width"
    />
    <q-icon v-if="valid" name="check_circle" color="green" size="200px" class="q-mt-xl" />
    <q-icon v-else name="cancel" color="red" size="200px" class="q-mt-xl" />
    <div v-if="valid" class="text-h4 q-mt-xl">{{ $t('scanPage.validCode') }}</div>
    <div v-else class="text-h4 q-mt-xl">{{ $t('scanPage.invalidCode') }}</div>
    <div v-if="error" class="text-h4 q-mt-xl text-red-500">{{ error }}</div>
    <div v-if="valid" class="text-h5 q-mt-xl">{{ $t('scanPage.name') }}:</div>
    <div v-if="valid" class="text-h6 q-mt-sm">{{ token.name }}</div>
    <div v-if="valid" class="text-h5 q-mt-xl">{{ $t('scanPage.username') }}:</div>
    <div v-if="valid" class="text-h6 q-mt-sm">{{ token.username }}</div>
    <div v-if="valid" class="text-h5 q-mt-xl">{{ $t('scanPage.email') }}:</div>
    <div v-if="valid" class="text-h6 q-mt-sm">{{ token.email }}</div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { QrcodeStream } from 'vue-qrcode-reader';
import type { DetectedBarcode } from 'vue-qrcode-reader';

const detected = ref(false);
const code = ref('');
const valid = ref(false);
const token = ref({} as { name: string; username: string; email: string });
const error = ref('');
const $t = useI18n().t;

async function onDetect(result: DetectedBarcode[]) {
  for (const res of result) {
    if (res.rawValue.startsWith('stsa$')) {
      if (!detected.value) {
        code.value = res.rawValue.substring(5);
        try {
          const response = await axios.get(
            `https://idms.stsa.tw/membership/api/validate_code/${code.value}`,
          );
          valid.value = response.data.valid;
          if (valid.value) {
            token.value = response.data.token;
          }
        } catch (e) {
          console.error('Failed to validate membership code:', e);
          valid.value = false;
          error.value = $t('scanPage.serverError').toString();
        }
        detected.value = true;
      }
      break;
    }
  }
}
</script>
