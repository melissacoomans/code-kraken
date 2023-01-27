<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <v-col>
      <!-- TODO: MAXLENGTH DOESNT WORK WITH TYPE=NUMBER FOR NOW TYPE=TEXT -->
      <!-- TODO: JUMP TO NEXT INPUT AFTER INSERTING ONE DIGID IN INPUT -->
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
    <span v-if="feedbackText">{{ feedbackText }}</span>
    <br />
    <br />
    <!-- TODO: MOVE TO SEPARATE COMPONENT -->
    <span><b>This is your code history: </b></span>
    <br />
    <!-- <span> {{ codeHistory }}</span>  -->
    <span> {{ storedInputValues }}</span>
    <br />
    <br />
    <!-- TODO: MAKE LIST PRETTIER: OPTION TO OPEN AND CLOSE -->
    <!-- TODO: LINK FOR EACH CODE TO FILL INPUT WITH FIRST POSSIBLE CODE IN THE LIST -->
    <!-- TODO: MOVE TO SEPARATE COMPONENT -->
    <span><b>All possible options: </b></span>
    <br />
    <span> {{ possibleCodes }}</span>
  </v-form>
</template>

<script>
export const CODE_HISTORY = 'Code history';
export const WINNER_TEXT = 'Yay you are a winner!!';
export const TRY_AGAIN_TEXT = `numbers are correct! Please try again`;

export default {
  name: 'CodeInput',
  created() {
    this.combineWinningCode();
    this.updateCodeHistory();
    this.getAllPossibleCodes();
    this.filterPossibleCodes();
  },
  data: () => ({
    valid: true,
    storedInputValues: [],
    chosenInputValues: [],
    codeHistory: '',
    possibleCodes: [],
    //TODO: FETCH WINNING CODE FROM BACKEND
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
        return (this.feedbackText = WINNER_TEXT);
      } else {
        this.totalCorrect = 0;
        for (var i = 0; i < 5; i++) {
          if (this.chosenInputValues[i] === this.winningCode[i]) {
            this.totalCorrect++;
          }
          //TODO: REMOVE INCORRECT NUMBERS FROM POSSIBLE CODES ARRAY
        }
        this.feedbackText = `${this.totalCorrect} ` + TRY_AGAIN_TEXT;
        return this.totalCorrect;
      }
    },
    updateCodeHistory: function () {
      return (this.codeHistory = localStorage.getItem(CODE_HISTORY));
    },
    getAllPossibleCodes: function () {
      for (let i = 0; i <= 99999; i++) {
        switch (true) {
          case i.toString().length === 1:
            this.possibleCodes.push('0000' + i);
            break;
          case i.toString().length === 2:
            this.possibleCodes.push('000' + i);
            break;
          case i.toString().length === 3:
            this.possibleCodes.push('00' + i);
            break;
          case i.toString().length === 4:
            this.possibleCodes.push('0' + i);
            break;
          case i.toString().length === 5:
            this.possibleCodes.push(i);
        }
      }
    },
    filterPossibleCodes: function () {
      // VERSION 1
      var index = this.possibleCodes.indexOf(this.inputValuesCombined);
      if (index > -1) {
        // BUG: SPLICE DOESNT WORK WITH NUMBERS ABOVE 09999
        this.possibleCodes.splice(index, 1);
      }
      // VERSION 2
      // for (let i = 0; i < this.possibleCodes.length; i++) {
      //   if (this.inputValuesCombined === this.possibleCodes[i]) {
      //     if (i > -1) {
      //       // BUG: SPLICE DOESNT WORK WITH NUMBERS ABOVE 09999
      //       this.possibleCodes.splice(i, 1);
      //     }
      //     break;
      //   }
      // }
    },
    storeInputCodes: function () {
      if (window.localStorage) {
        this.storedInputValues.push(this.inputValuesCombined);
        localStorage.setItem(CODE_HISTORY, this.storedInputValues);
      }
    },
    clearForm() {
      this.feedbackText = undefined;
      this.validatedCodeText = undefined;
    },
    validate() {
      this.$refs.form.validate();
      this.combineInputValues();
      this.storeInputCodes();
      this.checkCodes();
      this.filterPossibleCodes();
      this.updateCodeHistory();
    },
    reset() {
      this.clearForm();
      this.$refs.form.reset();
    },
  },
};
</script>
<style lang="scss">
//TODO: MEDIA QUERIES FOR MOBILE, TABLET AND DESKTOP
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
