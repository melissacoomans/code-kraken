<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="text-center">
          <v-col class="mb-4">
            <h1>Welcom bij code kraken!</h1>
          </v-col>
        </v-row>
        <CodeInput />
      </v-container>
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
