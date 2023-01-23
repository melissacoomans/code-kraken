<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <!-- <v-col cols="12" sm="6" md="3"> -->
    <v-col cols="5" sm="5" md="2">
      <!-- maxlength werkt niet icm number, daarom gekozen voor text. TODO: nog oplossing voor alleen numbers en overspringen naar volgende input -->
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
    inputValuesCombined: '',
    winningCodesCombined: '',
    validatedCodeText: '',
    totalCorrect: 0,
  }),
  methods: {
    combineInputValues: function () {
      if (this.inputValues[0] !== (null || undefined)) {
        return (this.inputValuesCombined = this.inputValues[0].concat(
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
      if (this.inputValuesCombined === this.winningCodesCombined) {
        return (this.feedbackText = 'yay you are a winner');
      } else {
        this.totalCorrect = 0;
        for (var i = 0; i < 5; i++) {
          if (this.inputValues[i] === this.winningCode[i]) {
            this.totalCorrect++;
          }
        }
        this.validatedCodeText = `gevalideerd! met cijfers: ${this.inputValuesCombined}`;
        this.feedbackText = `je hebt er ${this.totalCorrect} goed! probeer het nog een keer`;
        return this.totalCorrect;
      }
    },
    clearForm() {
      this.feedbackText = undefined;
      this.validatedCodeText = undefined;
    },
    validate() {
      this.$refs.form.validate();
      this.combineInputValues();
      this.checkCodes();
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
