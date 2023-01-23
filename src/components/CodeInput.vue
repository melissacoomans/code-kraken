<template>
  <!-- oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" -->
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <!-- <v-col cols="12" sm="6" md="3"> -->
    <v-col>
      <v-text-field
        v-for="index in 5"
        :key="index"
        :counter="1"
        :rules="codeRules"
        :maxlength="1"
        v-model="inputValues[index - 1]"
        type="text"
        pattern="[0-9]{1}"
        outlined
        clearable
        required
      ></v-text-field>
    </v-col>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Clear Form </v-btn>
    <br />
    <br />
    <span v-if="validatedCodeText">{{ validatedCodeText }}</span>
    <br />
    <br />
    <span v-if="feedbackText">{{ feedbackText }}</span>
    <br />
    <br />
    <span>winnende code: {{ winningCodesCombined }}</span>
    <br />
    <br />
    <!-- <span>eerdere submitted codes: </span>
    <span v-for="code in submittedCodes" :key="code">{{ code }}</span> -->

    <!-- <span v-for="number in winningCode" :key="number">{{ number }}</span> -->
  </v-form>
</template>

<script>
export default {
  name: 'CodeInput',
  created() {
    this.combineWinningCode();
  },
  data: () => ({
    valid: true,
    submittedCodes: ['99999'],
    inputValues: [],
    winningCode: ['1', '2', '3', '4', '5'],
    feedbackText: '',
    validateText: '',
    codeRules: [(v) => !!v || 'code is required'],
    inputCodesCombined: '',
    winningCodesCombined: '',
    validatedCodeText: '',
  }),
  methods: {
    submitForm() {
      this.inputValues.forEach((element) => console.log(element));
    },
    combineInputCodes: function () {
      if (this.inputValues[0] !== (null || undefined)) {
        return (this.inputCodesCombined = this.inputValues[0].concat(
          this.inputValues[1],
          this.inputValues[2],
          this.inputValues[3],
          this.inputValues[4]
        ));
      }
    },
    combineWinningCode: function () {
      if (this.winningCode) {
        return (this.winningCodesCombined = this.winningCode[0].concat(
          this.winningCode[1],
          this.winningCode[2],
          this.winningCode[3],
          this.winningCode[4]
        ));
      }
    },
    checkCodes: function () {
      if (this.inputCodesCombined === this.winningCodesCombined) {
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
      this.submitForm();
      this.combineInputCodes();
      this.checkCodes();
      return (this.validatedCodeText = `gevalideerd! met cijfers: ${this.inputValues} = ${this.inputCodesCombined}`);
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
