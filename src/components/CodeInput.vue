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

    <span v-if="!checkCodes && validateText">{{ validateText }}</span>
    <span v-if="feedbackText">{{ feedbackText }}</span>
  </v-form>
</template>

<script>
export default {
  name: 'CodeInput',

  data: () => ({
    valid: true,
    winningCode: '12345',
    feedbackText: '',
    name: '',
    validateText: '',
    codeRules: [(v) => !!v || 'code is required'],
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    fourthInput: '',
    fifthInput: '',
    combinedInputCodes: '',
  }),
  methods: {
    combineInputCodes: function () {
      this.combinedInputCodes = this.firstInput.concat(
        this.secondInput,
        this.thirdInput,
        this.fourthInput,
        this.fifthInput
      );
    },
    checkCodes: function () {
      if (this.combinedInputCodes === this.winningCode) {
        return (this.feedbackText = 'yay you are a winner');
      } else {
        return (this.feedbackText = 'booo try again!');
      }
    },
    clearForm() {
      this.feedbackText = '';
      this.validatedCodeText = '';
    },
    validate() {
      this.$refs.form.validate();
      this.combineInputCodes();
      this.checkCodes();
      return (this.validatedCodeText =
        `gevalideerd! met cijfers: ` + this.combinedInputCodes);
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
