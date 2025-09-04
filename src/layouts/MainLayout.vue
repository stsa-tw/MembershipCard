<style scoped lang="scss">
.navbar {
  background: linear-gradient(to right, $primary, $secondary) !important;
}
</style>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="navbar" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <img src="logo.png" />
          </q-avatar>
          {{ $t('navBar.title') }}
        </q-toolbar-title>
        <q-btn v-if="signedIn" @click="signOut" :label="$t('common.signOut')" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" :label="$t('navBar.card')" />
        <q-route-tab to="/scan" :label="$t('navBar.scan')" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { signOut, signedIn } from '../boot/oauth';
</script>
