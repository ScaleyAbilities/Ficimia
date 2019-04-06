<template>
  <v-container align-content-start class="home">
    <v-layout column mb-4 mt-5 ml-1 id="WELCOME">
      <v-flex>
        <h1>Welcome {{username}}, what would you like to do?</h1>
      </v-flex>
      <v-flex>
        <h1>Current Balance: {{balance}}</h1>
      </v-flex>
    </v-layout>

    <confirm-dialog
        :dialog="error"
        v-on:confirm="error = false"
        command="Error"
        :cancel="false"
        :confirm="true"
        :msg="errorMessage"
      ></confirm-dialog>

    <v-layout align-self-start row class="option" id="ADD-QUOTE">
      <stockSymbol size="xs3 md2" v-on:change="stock['QUOTE'] = $event"></stockSymbol>
      <dollarAmount :dollar="currentPrice" :clearable="false" custLabel="Current Market Price" size="md4" :readonly="true"></dollarAmount>
      <medButton
        msg="GET QUOTE"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(stock['QUOTE'].length != 3)"
        v-on:clicked="execute('QUOTE')"
      ></medButton>
      <dollarAmount custLabel="Add Funds" v-on:change="amount['ADD'] = $event" size=" xs2"></dollarAmount>
      <medButton
        msg="ADD"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['ADD'] == 0 || isNaN(amount['ADD']) || amount['ADD'] == null)"
        v-on:clicked="execute('ADD'), added = true"
      ></medButton>
      <confirm-dialog
        :dialog="added"
        v-on:confirm="added = false"
        command="Add"
        :cancel="false"
        :confirm="true"
        msg="Funds Added"
      ></confirm-dialog>
    </v-layout>

    <v-layout align-self-start row class="option" id="BUY">
      <stockSymbol v-on:change="stock['BUY'] = stock['CANCEL_BUY'] = $event"></stockSymbol>
      <dollarAmount size="md8 xs6" v-on:change="amount['BUY'] = parseFloat($event)"></dollarAmount>
      <medButton
        msg="BUY"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['BUY'] == 0 || isNaN(amount['BUY']) || stock['BUY'].length != 3)"
        v-on:clicked="execute('BUY') & (dialog['BUY'] = true)"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['BUY']"
        v-on:confirm="execute('COMMIT_BUY') & (dialog['BUY'] = false)"
        v-on:cancel="execute('CANCEL_BUY') & (dialog['BUY'] = false)"
        command="Buy"
        msg="Clicking confirm will complete your stock purchase. You have 60s before this will expire."
      ></confirm-dialog>
    </v-layout>

    <v-layout align-self-start row class="option" id="SELL">
      <stockSymbol v-on:change="stock['SELL'] = stock['CANCEL_SELL'] = $event"></stockSymbol>
      <dollarAmount size="md8 xs6" v-on:change="amount['SELL'] = parseInt($event)"></dollarAmount>
      <medButton
        msg="SELL"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['SELL'] == 0 || isNaN(amount['SELL']) || stock['SELL'].length != 3)"
        v-on:clicked="execute('SELL') & (dialog['SELL'] = true)"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['SELL']"
        v-on:confirm="execute('COMMIT_SELL') & (dialog['SELL'] = false)"
        v-on:cancel="execute('CANCEL_SELL') & (dialog['SELL'] = false)"
        command="Sell"
        msg="Clicking confirm will complete your stock sale. You have 60s before this will expire."
      ></confirm-dialog>
    </v-layout>

    <v-layout align-self-start row class="option" id="BUY-TRIGGER">
      <stockSymbol
        v-on:change="stock['SET_BUY_TRIGGER'] = stock['SET_BUY_AMOUNT'] = stock['CANCEL_SET_BUY'] = $event"
      ></stockSymbol>
      <dollarAmount size="md3 xs3" v-on:change="amount['SET_BUY_AMOUNT'] = parseFloat($event)"></dollarAmount>
      <dollarAmount
        size="md3 xs3"
        custLabel="Max. Price"
        v-on:change="amount['SET_BUY_TRIGGER'] = parseFloat($event)"
      ></dollarAmount>
      <medButton
        msg="BUY TRIGGER"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['SET_BUY_AMOUNT'] == 0 || isNaN(amount['SET_BUY_AMOUNT']) || isNaN(amount['SET_BUY_TRIGGER']) || amount['SET_BUY_TRIGGER'] == 0 || stock['SET_BUY_TRIGGER'].length != 3)"
        v-on:clicked="execute('SET_BUY_AMOUNT') & (dialog['SET_BUY_AMOUNT'] = true)"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['SET_BUY_AMOUNT']"
        v-on:confirm="execute('SET_BUY_TRIGGER') & (dialog['SET_BUY_AMOUNT'] = false)"
        v-on:cancel="dialog['SET_BUY_AMOUNT'] = false"
        command="Buy Trigger"
        msg="Clicking confirm will set the current buy trigger. You have 60s before this will expire."
      ></confirm-dialog>
      <medButton
        msg="CANCEL TRIGGER"
        size="xs3 md2"
        color="#eb4d4b"
        :block="true"
        :disabled="(amount['SET_BUY_AMOUNT'] == 0 || isNaN(amount['SET_BUY_AMOUNT']) || isNaN(amount['SET_BUY_TRIGGER']) || amount['SET_BUY_TRIGGER'] == 0 || stock['SET_BUY_TRIGGER'].length != 3)"
        v-on:clicked="dialog['CANCEL_SET_BUY'] = true"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['CANCEL_SET_BUY']"
        v-on:confirm="execute('CANCEL_SET_BUY') & (dialog['CANCEL_SET_BUY'] = false)"
        v-on:cancel="dialog['CANCEL_SET_BUY'] = false"
        command="Cancel Trigger"
        msg="Clicking confirm will cancel current buy trigger."
      ></confirm-dialog>
    </v-layout>

    <v-layout align-self-start row class="option" id="SELL-TRIGGER">
      <stockSymbol
        v-on:change="stock['SET_SELL_TRIGGER'] = stock['SET_SELL_AMOUNT'] = stock['CANCEL_SET_SELL'] = $event"
      ></stockSymbol>
      <dollarAmount size="md3 xs3" v-on:change="amount['SET_SELL_AMOUNT'] = parseInt($event)"></dollarAmount>
      <dollarAmount
        size="md3 xs3"
        custLabel="Min. Price"
        v-on:change="amount['SET_SELL_TRIGGER'] = parseFloat($event)"
      ></dollarAmount>
      <medButton
        msg="SELL TRIGGER"
        size="xs3 md2"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['SET_SELL_AMOUNT'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || amount['SET_SELL_TRIGGER'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || stock['SET_SELL_TRIGGER'].length != 3)"
        v-on:clicked="execute('SET_SELL_AMOUNT') & (dialog['SET_SELL_AMOUNT'] = true)"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['SET_SELL_AMOUNT']"
        v-on:confirm="execute('SET_SELL_TRIGGER') & (dialog['SET_SELL_AMOUNT'] = false)"
        v-on:cancel="dialog['SET_SELL_AMOUNT'] = false"
        command="Sell Trigger"
        msg="Clicking confirm will set the current sell trigger. You have 60s before this will expire."
      ></confirm-dialog>
      <medButton
        msg="CANCEL TRIGGER"
        size="xs3 md2"
        color="#eb4d4b"
        :block="true"
        :disabled="(amount['SET_SELL_AMOUNT'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || amount['SET_SELL_TRIGGER'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || stock['SET_SELL_TRIGGER'].length != 3)"
        v-on:clicked="dialog['CANCEL_SET_SELL'] = true"
      ></medButton>
      <confirm-dialog
        :dialog="dialog['CANCEL_SET_SELL']"
        v-on:confirm="execute('CANCEL_SET_SELL') & (dialog['CANCEL_SET_SELL'] = false)"
        v-on:cancel="dialog['CANCEL_SET_SELL'] = false"
        command="Cancel Trigger"
        msg="Clicking confirm will cancel current sell trigger."
      ></confirm-dialog>
    </v-layout>

    <v-layout align-self-start pt2 row class="option" id="DUMPLOG">
      <medButton
        msg="Generate Dumplog"
        color="#7ed6df"
        :block="true"
        v-on:clicked="execute('DUMPLOG')"
      ></medButton>
      <medButton
        msg="User Summary"
        color="#7ed6df"
        :block="true"
        v-on:clicked="execute('DISPLAY_SUMMARY'), summary = true"
      ></medButton>
      <confirm-dialog
        :dialog="summary"
        v-on:confirm="summary = false"
        command="User Summary"
        :cancel="false"
        :stocks="stocks"
        msg="Your current stocks are:"
      ></confirm-dialog>
    </v-layout>

    <v-layout mt-4 align-self-start class="option" id="LOGOUT">
      <medButton msg="Logout" to="/" color="#eb4d4b" :block="true"></medButton>
    </v-layout>
  </v-container>
</template>

<script>
import medButton from "./medButton.vue";
import stockSymbol from "./stockSymbol.vue";
import dollarAmount from "./dollarAmount.vue";
import stockAmount from "./stockAmount.vue";
import confirmDialog from "./confirmDialog.vue";

export default {
  name: "home",
  url: "http://127.0.0.1:80/api/command",
  components: {
    medButton,
    dollarAmount,
    stockSymbol,
    stockAmount,
    confirmDialog
  },

  mounted() {
    this.execute('DISPLAY_SUMMARY');
  },

  data() {
    return {
      stocks: {},
      balance: 0,
      pending: 0,
      currentPrice: "",
      error: false,
      errorMessage: "",
      command: "",
      filename: "",
      added: false,
      summary: false,
      summaryText: "User Summary loading...",
      stock: {
        QUOTE: "",
        BUY: "",
        CANCEL_BUY: "",
        SELL: "",
        CANCEL_SELL: "",
        SET_BUY_AMOUNT: "",
        SET_BUY_TRIGGER: "",
        SET_SELL_AMOUNT: "",
        SET_SELL_TRIGGER: "",
        CANCEL_SET_BUY: "",
        CANCEL_SET_SELL: ""
      },
      amount: {
        ADD: 0,
        BUY: 0,
        SELL: 0,
        SET_BUY_AMOUNT: 0,
        SET_BUY_TRIGGER: 0,
        SET_SELL_AMOUNT: 0,
        SET_SELL_TRIGGER: 0
      },

      dialog: {
        BUY: false,
        SELL: false,
        SET_BUY_AMOUNT: false,
        SET_SELL_AMOUNT: false,
        CANCEL_SET_BUY: false,
        CANCEL_SET_SELL: false
      }
    };
  },

  computed: {
    username: function() {
      return this.$route.params.username;
    }
  },

  methods: {
    execute(command) {
      var data;
      if (
        command == "COMMIT_BUY" ||
        command == "CANCEL_BUY" ||
        command == "COMMIT_SELL" ||
        command == "CANCEL_SELL" ||
        command == "DISPLAY_SUMMARY"
      ) {
        data = {
          cmd: command,
          usr: this.username
        };
      } else if (command == "ADD") {
        data = {
          cmd: command,
          usr: this.username,
          params: {
            amount: this.amount[command]
          }
        };
      } else if (
        command == "QUOTE" ||
        command == "CANCEL_SET_BUY" ||
        command == "CANCEL_SET_SELL"
      ) {
        data = {
          cmd: command,
          usr: this.username,
          params: {
            stock: this.stock[command]
          }
        };
      } else if (
        command == "BUY" ||
        command == "SELL" ||
        command == "SET_BUY_AMOUNT" ||
        command == "SET_SELL_AMOUNT"
      ) {
        data = {
          cmd: command,
          usr: this.username,
          params: {
            stock: this.stock[command].trim(),
            amount: this.amount[command]
          }
        };
      } else if (
        command == "SET_BUY_TRIGGER" ||
        command == "SET_SELL_TRIGGER"
      ) {
        data = {
          cmd: command,
          usr: this.username,
          params: {
            stock: this.stock[command],
            price: this.amount[command]
          }
        };
      } else if (command == "DUMPLOG") {
        data = {
          cmd: command,
          usr: this.username,
          params: {
            filename: "logs.xml"
          }
        };
      } else {
        alert("Command not recognized");
        return;
      }

      console.log(JSON.stringify(data));

      this.loading = true;

      fetch("http://localhost/api/command", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(r => r.json())
        .then(body => {
          console.log(body);

          if (body.status !== 'ok')
            throw new Error(body.data);

          if (command === 'DUMPLOG') {
            let uriContent = "data:application/octet-stream," + encodeURIComponent(body.data);
            window.open(uriContent, 'log');
          }

          if (command === 'QUOTE') {
            this.currentPrice = body.data[Object.keys(body.data)[0]].toString();
          }

          if (command === 'DISPLAY_SUMMARY') {
            this.balance = body.data.balance;
            this.pending = body.data.pending;
            this.stocks = body.data.stocks;
          }
          
          this.loaded = true;
          this.loadingMessage = "Action complete."

          if (command !== 'DISPLAY_SUMMARY') {
            this.execute('DISPLAY_SUMMARY');
          }
        })
        .catch(error => {
          console.error(error);

          this.errorMessage = error.message;
          this.error = true;
          this.loaded = this.summary = false;
          for (let key of Object.keys(this.dialog)) {
            this.dialog[key] = false;
          }
        });
    }
  }
};
</script>

<style>
@media only screen and (min-width: 1264px) {
  .home {
    max-width: 1264px;
  }
}

h1 {
  color: #95afc0;
  font-family: "Courier New", Courier, monospace;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
