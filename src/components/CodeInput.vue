<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <!-- <v-col cols="12" sm="6" md="3"> -->
    <v-col>
      <!-- maxlength werkt niet icm number, daarom gekozen voor text. TODO: nog oplossing voor alleen numbers en overspringen naar volgende input -->
      <v-text-field
        v-for="index in 5"
        :key="index"
        :rules="codeRules"
        :maxlength="1"
        v-model="chosenInputValues[index - 1]"
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
    storedInputValues: [],
    chosenInputValues: [],
    winningCode: ['1', '2', '3', '4', '5'],
    feedbackText: '',
    codeRules: [(v) => !!v || 'code is required'],
    inputValuesCombined: '',
    winningCodesCombined: '',
    validatedCodeText: '',
    totalCorrect: 0,
  }),
  methods: {
    combineInputValues: function () {
      if (this.chosenInputValues[0] !== (null || undefined)) {
        return (this.inputValuesCombined = this.chosenInputValues[0].concat(
          this.chosenInputValues[1],
          this.chosenInputValues[2],
          this.chosenInputValues[3],
          this.chosenInputValues[4]
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
        return (this.feedbackText = 'yay you are a winner!!');
      } else {
        this.totalCorrect = 0;
        for (var i = 0; i < 5; i++) {
          if (this.chosenInputValues[i] === this.winningCode[i]) {
            this.totalCorrect++;
          }
        }
        this.feedbackText = `je hebt er ${this.totalCorrect} goed! probeer het nog een keer`;
        return this.totalCorrect;
      }
    },
    storeInputCodes: function () {
      if (window.localStorage) {
        this.storedInputValues.push(this.inputValuesCombined);
        localStorage.setItem('Code history', this.storedInputValues);
      } else {
        return;
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
      this.storeInputCodes();
      if (this.inputValuesCombined !== '') {
        this.validatedCodeText = `gevalideerd! met cijfers: ${this.inputValuesCombined}`;
      }
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
<style lang="scss">
.v-input {
  display: inline-block;
  padding: 6px;
  // max-width: 5%;
  max-width: 20%;
}
.v-text-field.v-text-field--enclosed {
  padding: 6px;
}
</style>
