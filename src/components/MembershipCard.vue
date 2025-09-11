<template>
  <q-card class="q-ma-sm bordered card">
    <q-img src="card_bg.png" alt="Membership background" ref="card" />
    <transition
      enter-active-class="animated fadeIn slower"
      leave-active-class="animated fadeOut slower"
    >
      <img class="watermark" v-if="watermark" src="card_stsa.png" alt="Membership watermark" />
    </transition>
    <qrcode-svg
      v-if="code && !error"
      :value="code"
      level="H"
      class="qrcode"
      background="#00000000"
      :gradient="true"
      gradient-start-color="#305a7b"
      gradient-end-color="#8b1c21"
      :size="qrSize"
      :dummy="qrSize"
    />
    <q-btn v-if="error" class="errorMsg text-center q-pa-none" flat stack @click="relog">
      <q-icon name="error" color="red" :size="`${qrSize * 0.3}px`" />
      <div
        class="text-black"
        :style="`font-size: ${qrSize * 0.1}px; line-height: ${qrSize * 0.15}px`"
      >
        條碼載入失敗，<br />請點此重新登入
      </div>
    </q-btn>
    <div
      class="absolute-bottom text-white text-center"
      style="text-align: right; margin: min(4vw, 40px)"
    >
      <div style="font-size: min(5vw, 60px)">{{ props.name }}</div>
      <div style="font-size: min(2.5vw, 30px)">會員</div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { QrcodeSvg } from 'qrcode.vue';
import { useQuasar } from 'quasar';
import { signIn, signOut } from 'src/boot/oauth';
import type { ComponentPublicInstance } from 'vue';
import { computed, ref, useTemplateRef, watch } from 'vue';

const $q = useQuasar();
const mobileScale = computed(() => Math.min($q.screen.height / $q.screen.width - 0.2, 1.5));
const watermark = ref(true);
const card = useTemplateRef<ComponentPublicInstance>('card');
const qrSize = ref(0);
const props = defineProps<{
  name: string;
  code: string;
  error: boolean;
}>();
watch(card, calcQRSize, { deep: true });
window.addEventListener('resize', calcQRSize);

function watermarkAnimation() {
  setTimeout(() => {
    watermark.value = false;
    setTimeout(() => {
      watermark.value = true;
      watermarkAnimation();
    }, 1000);
  }, 1250);
}

function calcQRSize() {
  if (card.value) {
    const el = card.value.$el;
    qrSize.value = Math.max(el.offsetWidth, el.offsetHeight) * 0.35;
  }
}

async function relog() {
  console.log('Re-logging in...');
  await signOut();
  console.log('Signed out, signing in again...');
  signIn();
  console.log('Sign-in initiated.');
}

watermarkAnimation();
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 1196px;
  height: 100%;
  border-radius: 3vw !important;
  position: relative;
}
.watermark {
  position: absolute;
  bottom: 0;
  right: 0;
}
.qrcode {
  background-color: transparent;
  position: absolute;
  left: 60.2%;
  top: 13.5%;
  scale: 0.8;
}
.errorMsg {
  position: absolute;
  left: 65.5%;
  top: 24.5%;
}
@media (orientation: portrait) {
  .card {
    transform: rotate(90deg);
    scale: v-bind('mobileScale');
  }
}
</style>
