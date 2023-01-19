<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <!-- <v-col cols="12" sm="6" md="3"> -->
    <v-col>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="firstInput"
        pattern="[0-9]{1}"
        maxlength="1"
        max="1"
        outlined
        clearable
        required
      ></v-text-field>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="secondInput"
        pattern="[0-9]{1}"
        maxlength="1"
        max="1"
        outlined
        clearable
        required
      ></v-text-field>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="thirdInput"
        pattern="[0-9]{1}"
        maxlength="1"
        max="1"
        outlined
        clearable
        required
      ></v-text-field>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="fourthInput"
        pattern="[0-9]{1}"
        maxlength="1"
        max="1"
        outlined
        clearable
        required
      ></v-text-field>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="fifthInput"
        pattern="[0-9]{1}"
        maxlength="1"
        max="1"
        outlined
        clearable
        required
      ></v-text-field>
    </v-col>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Clear Form </v-btn>

    <span v-if="validatetext">{{ validatetext }}</span>
  </v-form>
</template>

<script>
export default {
  name: 'CodeInput',

  data: () => ({
    valid: true,
    name: '',
    validatetext: '',
    codeRules: [(v) => !!v || 'code is required'],
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    fourthInput: '',
    fifthInput: '',
    // combinedInputCode: this.firstInput.concat(
    //   this.secondInput,
    //   this.thirdInput,
    //   this.fourthInput,
    //   this.fifthInput
    // ),
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      // this.combinedInputCode();
      // return (this.validatetext =
      //   `gevalideerd! met cijfers: ` + this.combinedInputCode);
      return (this.validatetext =
        `gevalideerd! met cijfers: ` + this.firstInput);
    },
    reset() {
      this.$refs.form.reset();
      return (this.validatetext = '');
    },
  },
};
</script>
