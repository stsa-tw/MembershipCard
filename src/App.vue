<template>
  <router-view />
</template>

<script setup lang="ts">
import { i18n } from 'src/boot/i18n';
import messages from 'src/i18n';
import { LocalStorage, Dark } from 'quasar';

const locale = window.navigator.language || i18n.global.locale.value;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
i18n.global.locale.value = (Object.keys(messages).includes(locale) ? locale : 'en-US') as any;

if (LocalStorage.has('dark')) {
  if (LocalStorage.getItem<boolean>('dark')) {
    Dark.set(true);
  } else {
    Dark.set(false);
  }
} else {
  Dark.set('auto');
}
</script>
