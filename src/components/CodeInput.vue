<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <!-- <v-col cols="12" sm="6" md="3"> -->
    <v-col>
      <v-text-field
        :counter="1"
        :rules="codeRules"
        v-model="input1"
        type="number"
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
        v-model="input2"
        type="number"
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
        v-model="input3"
        type="number"
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
        v-model="input4"
        type="number"
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
        v-model="input5"
        type="number"
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
    <span>eerdere submitted codes: </span>
    <span v-for="code in submittedCodes" :key="code">{{ code }}</span>

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
    winningCodesCombined: '',
    submittedCodes: ['99999'],
    winningCode: ['1', '2', '3', '4', '5'],
    feedbackText: null,
    name: null,
    validateText: null,
    codeRules: [(v) => !!v || 'code is required'],
    inputCodesCombined: '',
    validatedCodeText: '',
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
  }),
  methods: {
    combineInputCodes: function () {
      this.inputCodesCombined = this.input1.concat(
        this.input2,
        this.input3,
        this.input4,
        this.input5
      );
    },
    combineWinningCode: function () {
      this.winningCodesCombined = this.winningCode[0].concat(
        this.winningCode[1],
        this.winningCode[2],
        this.winningCode[3],
        this.winningCode[4]
      );
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
      this.combineInputCodes();
      this.checkCodes();
      return (this.validatedCodeText =
        `gevalideerd! met cijfers: ` + this.inputCodesCombined);
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
