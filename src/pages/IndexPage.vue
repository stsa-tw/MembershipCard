<template>
  <q-page class="row items-center justify-evenly">
    <MembershipCard
      v-if="signedIn"
      :name="signedInUser!.profile!.name!"
      :code="signedInUser!.access_token!"
    />
    <div v-else>
      <div v-if="signingIn" class="text-h5">
        <q-spinner class="q-mr-sm" />
        <span>{{ $t('common.signingIn') }}</span>
      </div>
      <q-btn
        v-else
        :label="$t('common.signIn')"
        class="signIn text-white text-h5"
        @click="signIn"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MembershipCard from 'src/components/MembershipCard.vue';
import { signedIn, signedInUser, signIn, signingIn } from 'src/boot/oauth';
</script>

<style scoped lang="scss">
.signIn {
  background: linear-gradient(to right, $primary, $secondary) !important;
}
</style>
