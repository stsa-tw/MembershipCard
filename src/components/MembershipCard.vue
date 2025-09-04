<template>
  <q-card class="q-ma-sm bordered card">
    <q-img src="card_bg.png" alt="Membership background" />
    <transition
      enter-active-class="animated fadeIn slower"
      leave-active-class="animated fadeOut slower"
    >
      <img class="watermark" v-if="watermark" src="card_stsa.png" alt="Membership watermark" />
    </transition>
    <vue-qrcode
      :options="{
        errorCorrectionLevel: 'Q',
        width: 0,
        color: {
          dark: '#000000ff',
          light: '#ffffff00',
        },
      }"
      :value="props.code"
      tag="svg"
      class="qrcode"
    ></vue-qrcode>
    <div class="absolute-bottom text-white" style="text-align: right; margin: min(4vw, 40px)">
      <div style="font-size: min(5vw, 60px)">{{ props.name }}</div>
      <div style="font-size: min(2.5vw, 30px)">會員</div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const mobileScale = Math.min($q.screen.height / $q.screen.width - 0.2, 1.5);
const watermark = ref(true);
// const cardRef = ref();
// const qrWidth = computed(() => {
//   return 0;
// });
const props = defineProps<{
  name: string;
  code: string;
}>();

function watermarkAnimation() {
  setTimeout(() => {
    watermark.value = false;
    setTimeout(() => {
      watermark.value = true;
      watermarkAnimation();
    }, 1000);
  }, 1250);
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
  left: 55.5%;
  top: 5.9%;
  scale: 0.8;
}
@media (orientation: portrait) {
  .card {
    transform: rotate(90deg);
    scale: v-bind('mobileScale');
  }
}
</style>
