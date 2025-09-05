<template>
  <q-page class="row items-center justify-evenly">
    <MembershipCard v-if="signedIn" :name="signedInUser!.profile!.name!" :code="code" />
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const code = ref('');

onMounted(async () => {
  await fetchMembershipCode();
});

async function fetchMembershipCode() {
  setTimeout(() => {
    void fetchMembershipCode();
  }, 250 * 1000);
  if (signedIn.value && signedInUser.value) {
    const response = await axios.get(`https://idms.stsa.tw/membership/api/get_code`, {
      headers: {
        Authorization: `Bearer ${signedInUser.value.access_token}`,
      },
    });
    code.value = response.data.code;
  }
}
</script>

<style scoped lang="scss">
.signIn {
  background: linear-gradient(to right, $primary, $secondary) !important;
}
</style>
