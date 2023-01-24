<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col class="mb-4">
            <h1>Crack the code!</h1>
          </v-col>
        </v-row>
        <CodeInput />
        <OptionalCodes />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CodeInput from './components/CodeInput';
import OptionalCodes from './components/OptionalCodes.vue';

export default {
  name: 'App',

  components: {
    CodeInput,
    OptionalCodes,
  },

  data: () => ({
    //
  }),
};
</script>
