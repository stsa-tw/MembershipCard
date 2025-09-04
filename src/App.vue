<template>
  <router-view />
</template>

<script setup lang="ts">
import { i18n } from 'src/boot/i18n';
import messages from 'src/i18n';

const locale = window.navigator.language || i18n.global.locale.value;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
i18n.global.locale.value = (Object.keys(messages).includes(locale) ? locale : 'en-US') as any;
</script>
