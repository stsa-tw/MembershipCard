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
        flat
        no-caps
        color="primary"
        :label="$t('common.signIn')"
        class="signIn text-h5"
        @click="signIn"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MembershipCard from 'src/components/MembershipCard.vue';
import { signedIn, signedInUser, signIn, signingIn } from 'src/boot/oauth';
import { ref, onMounted, computed } from 'vue';
import { Dark } from 'quasar';
import axios from 'axios';

const code = ref('');
const bg = computed(() => (Dark.isActive ? '#121212' : 'white'));

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
  // background-image: linear-gradient(to right, $primary, $secondary);
  background: transparent;
  padding: 0.5rem 1rem;
  background-image:
    linear-gradient(90deg, v-bind(bg), v-bind(bg)), linear-gradient(90deg, $primary, $secondary);
  background-clip: padding-box, border-box;
  background-origin: border-box;
  border: 3px solid transparent;
  border-radius: 1.75rem;
  font-family: 'Roboto', sans-serif;
}
</style>
