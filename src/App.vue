<template>
  <v-app>
    <v-main>
    <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome bij code kraken!
        </h1>
        </v-col>
    </v-row>
  </v-container>
      <CodeInput/>
    </v-main>
  </v-app>
</template>

<script>
import CodeInput from './components/CodeInput';

export default {
  name: 'App',

  components: {
    CodeInput,
  },

  data: () => ({
    //
  }),
};
</script>
