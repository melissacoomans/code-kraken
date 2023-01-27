<template>
  <v-form ref="form" v-model="valid" lazy-validation class="text-center">
    <v-col>
      <!-- Option 1 seperate inputs: each input is clearable, not working: type=number and jumping to next input after inserting a number -->
      <!-- TODO: option to paste code and add to inputs (same as otp input)-->
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

    <!-- Option 2 otp input: Each input is not clearable, focus on validate button is missing, TypeError, after I implemented option 1 I found this component -->
    <!-- <v-otp-input
      length="5"
      :rules="codeRules"
      v-model="chosenInputValues"
      outlined
      required
    ></v-otp-input> -->

    <!-- TODO: focus on validate after input is filled-->
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Clear Form </v-btn>
    <br />
    <br />
    <span v-if="feedbackText">{{ feedbackText }}</span>
    <br />
    <br />
    <!-- TODO: move to separate components -->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Code History </v-expansion-panel-header>
        <v-expansion-panel-content>
          <span v-for="val in storedInputValues" :key="val"> {{ val }}, </span>
          <span v-if="!storedInputValues.length">{{ noCodeHistoryText }}</span>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header> Possible Codes </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template>
            <!-- TODO: create links and add to input -->
            <span v-for="code in possibleCodes" :key="code">
              {{ code }} ,
            </span>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />
    <br />
  </v-form>
</template>

<script>
const REQUIRED = 'code is required';
const CODE_HISTORY = 'Code history';
const WINNER_TEXT = 'Yay you are a winner!!';
const TRY_AGAIN_TEXT = `numbers are correct! Please try again`;
const NO_CODE_HISTORY_TEXT =
  "You haven't tried any numbers yet, please fill in a number";
const NO_CODES_AVAILABLE =
  'No optional codes available, please try again later';

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
    //TODO: fetch code from backend, create json
    winningCode: ['1', '2', '3', '4', '5'],
    feedbackText: '',
    codeRules: [(v) => !!v || REQUIRED],
    inputValuesCombined: '',
    winningCodesCombined: '',
    validatedCodeText: '',
    noCodesText: NO_CODES_AVAILABLE,
    noCodeHistoryText: NO_CODE_HISTORY_TEXT,
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
          //TODO: remove incorrect numbers from possible codes array
        }
        this.feedbackText = `${this.totalCorrect} ` + TRY_AGAIN_TEXT;
        return this.totalCorrect;
      }
    },
    updateCodeHistory: function () {
      if (this.codeHistory) {
        console.log('test');
        return (this.codeHistory = localStorage.getItem(CODE_HISTORY));
      } else {
        return (this.noCodeHistoryText = NO_CODE_HISTORY_TEXT);
      }
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
            break;
          default:
            !this.possibleCodes;
            this.noCodesText = NO_CODES_AVAILABLE;
        }
      }
    },
    filterPossibleCodes: function () {
      // Version 1
      var index = this.possibleCodes.indexOf(this.inputValuesCombined);
      if (index > -1) {
        // Bug: splice doesnt work with numbers above 09999
        this.possibleCodes.splice(index, 1);
      }
      // Version 2
      // for (let i = 0; i < this.possibleCodes.length; i++) {
      //   if (this.inputValuesCombined === this.possibleCodes[i]) {
      //     if (i > -1) {
      //         // Bug: splice doesnt work with numbers above 09999
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
//TODO: add all media queries, for now
.v-input {
  display: inline-block;
  padding: 6px;
  max-width: 15%;
}
.v-text-field.v-text-field--enclosed {
  padding: 6px;
}

// quick solution for mobile
@media only screen and (max-width: 600px) {
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none;
  }
  .v-text-field .v-input__icon--clear {
    display: none;
  }

  .v-input {
    display: inline-block;
    padding: 6px;
    max-width: 20%;
  }
}
@media only screen and (min-width: 600px) {
  .v-input {
    max-width: 12%;
  }
}
</style>
