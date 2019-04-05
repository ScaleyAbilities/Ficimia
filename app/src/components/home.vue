<template>
  <v-container align-content-start id="home">
    <v-layout pb-3 mb-3>
      <h1>Welcome {{username}}, what would you like to do?</h1>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol v-on:change="stock['BUY'] = $event"></stockSymbol>
      <dollarAmount v-on:change="amount['BUY'] = parseFloat($event)"></dollarAmount>
      <medButton
        msg="BUY"
        size="sm3"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['BUY'] == 0 || isNaN(amount['BUY']) || stock['BUY'].length != 3)"
        v-on:clicked="execute('BUY')"
      ></medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol v-on:change="stock['SET_BUY_AMOUNT'] = $event"></stockSymbol>
      <dollarAmount v-on:change="amount['SET_BUY_AMOUNT'] = parseFloat($event)"></dollarAmount>
      <dollarAmount
        custLabel="Max. Price"
        v-on:change="amount['SET_BUY_TRIGGER'] = parseFloat($event)"
      ></dollarAmount>
      <medButton
        msg="BUY TRIGGER"
        size="sm3"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['SET_BUY_AMOUNT'] == 0 || isNaN(amount['SET_BUY_AMOUNT']) || isNaN(amount['SET_BUY_TRIGGER']) || amount['SET_BUY_TRIGGER'] == 0 || stock['SET_BUY_AMOUNT'].length != 3)"
        v-on:clicked="execute('SET_BUY_AMOUNT')"
      ></medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol v-on:change="stock['SELL'] = $event"></stockSymbol>
      <stockAmount v-on:change="amount['SELL'] = parseInt($event)"></stockAmount>
      <medButton 
        msg="SELL" 
        size="sm3" 
        color="#2ecc71" 
        :block="true"
        :disabled="(amount['SELL'] == 0 || isNaN(amount['SELL']) || stock['SELL'].length != 3)" 
        v-on:clicked="execute('SELL')">
      </medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol v-on:change="stock['SET_SELL_AMOUNT'] = $event"></stockSymbol>
      <stockAmount v-on:change="amount['SET_SELL_AMOUNT'] = parseInt($event)"></stockAmount>
      <dollarAmount
        custLabel="Min. Price"
        v-on:change="amount['SET_SELL_TRIGGER'] = parseFloat($event)"
      ></dollarAmount>
      <medButton
        msg="SELL TRIGGER"
        size="sm3"
        color="#2ecc71"
        :block="true"
        :disabled="(amount['SET_SELL_AMOUNT'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || amount['SET_SELL_TRIGGER'] == 0 || isNaN(amount['SET_SELL_AMOUNT']) || stock['SET_SELL_AMOUNT'].length != 3)"
        v-on:clicked="execute('SET_SELL_AMOUNT')"
      ></medButton>
    </v-layout>
    <v-layout class="option">
      <medButton msg="Logout" to="/" color="#eb4d4b" :block="true"></medButton>
    </v-layout>
  </v-container>
</template>

<script>
import medButton from "./medButton.vue";
import stockSymbol from "./stockSymbol.vue";
import dollarAmount from "./dollarAmount.vue";
import stockAmount from "./stockAmount.vue";
export default {
  name: "home",
  url: "http://127.0.0.1:80/api/command",
  components: {
    medButton,
    dollarAmount,
    stockSymbol,
    stockAmount
  },

  data() {
    return {
      command: "",
      filename: "",
      stock: {
        BUY: "",
        SELL: "",
        SET_BUY_AMOUNT: "",
        SET_BUY_TRIGGER: "",
        SET_SELL_AMOUNT: "",
        SET_SELL_TRIGGER: ""
      },
      amount: {
        BUY: 0,
        SELL: 0,
        SET_BUY_AMOUNT: 0,
        SET_BUY_TRIGGER: 0,
        SET_SELL_AMOUNT: 0,
        SET_SELL_TRIGGER: 0
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
            stock: this.stock[command],
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
            filename: this.filename
          }
        };
      } else {
        alert("Command not recognized");
        return;
      }

      console.log(JSON.stringify(data));
      fetch("http://localhost/api/command", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(error => console.error("Error:", error));
    }
  }
};
</script>

<style>
#home {
  padding: 10%;
}

h1 {
  color: #95afc0;
  font-family: "Courier New", Courier, monospace;
}
</style>
