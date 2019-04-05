<template>
  <v-container align-content-start id="home">
    <v-layout pb-6>
      <h1> Welcome {{username}}, what would you like to do? </h1>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol></stockSymbol>
      <dollarAmount></dollarAmount>
      <medButton msg="BUY" size="sm3" color="#2ecc71" :block="true" v-on:clicked="counter += 1"></medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol></stockSymbol>
      <dollarAmount></dollarAmount>
      <medButton msg="BUY TRIGGER" size="sm3" color="#2ecc71" :block="true" v-on:click="execute()"></medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol></stockSymbol>
      <stockAmount></stockAmount>
      <medButton msg="SELL" size="sm3" color="#2ecc71" :block="true" v-on:click="execute()"></medButton>
    </v-layout>
    <v-layout align-self-start row class="option">
      <stockSymbol></stockSymbol>
      <stockAmount></stockAmount>
      <medButton msg="SELL TRIGGER" size="sm3" color="#2ecc71" :block="true" v-on:click="execute()"></medButton>
    </v-layout>
    <v-layout class="option">
      <medButton msg="Logout" to="/" color="#eb4d4b" :block="true" v-on:click="execute()"></medButton>
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
      hide: false,
      counter: 0,
    };
  },

  computed: {
    username: function() {
      return this.$route.params.username;
      },
  },

  methods: {
    execute(cmd) {
      var command = cmd;
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
          cmd: cmd[0],
          usr: this.username,
          params: {
            amount: cmd[1]
          }
        };
      } else if (
        cmd[0] == "QUOTE" ||
        cmd[0] == "CANCEL_SET_BUY" ||
        cmd[0] == "CANCEL_SET_SELL"
      ) {
        data = {
          cmd: cmd[0],
          usr: this.username,
          params: {
            stock: cmd[1]
          }
        };
      } else if (
        cmd[0] == "BUY" ||
        cmd[0] == "SELL" ||
        cmd[0] == "SET_BUY_AMOUNT" ||
        cmd[0] == "SET_SELL_AMOUNT"
      ) {
        data = {
          cmd: cmd[0],
          usr: this.username,
          params: {
            stock: cmd[1],
            amount: cmd[2]
          }
        };
      } else if (cmd[0] == "SET_BUY_TRIGGER" || cmd[0] == "SET_SELL_TRIGGER") {
        data = {
          cmd: cmd[0],
          usr: this.username,
          params: {
            stock: cmd[1],
            price: cmd[2]
          }
        };
      } else if (cmd[0] == "DUMPLOG") {
        if (cmd.length == 2) {
          data = {
            cmd: cmd[0],
            usr: null,
            params: {
              filename: cmd[1]
            }
          };
        } else if (cmd.length == 3)
          data = {
            cmd: cmd[0],
            usr: cmd[1],
            params: {
              filename: cmd[2]
            }
          };
      } else {
        alert("Command not recognized");
        return;
      }
      if (
        data.cmd == "ADD" ||
        data.cmd == "BUY" ||
        data.cmd == "COMMIT_BUY" ||
        data.cmd == "CANCEL_BUY" ||
        data.cmd == "COMMIT_SELL" ||
        data.cmd == "CANCEL_SELL" ||
        data.cmd == "SET_BUY_AMOUNT" ||
        data.cmd == "SET_BUY_TRIGGER" ||
        data.cmd == "CANCEL_SET_BUY" ||
        data.cmd == "SET_SELL_AMOUNT" ||
        data.cmd == "SET_SELL_TRIGGER" ||
        data.cmd == "CANCEL_SELL_TRIGGER"
      ) {
        console.log(JSON.stringify(data));
        fetch("http://localhost:5000/api/command", {
          method: "POST",
          json: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }).catch(error => console.error("Error:", error));
      } else if (
        data.cmd == "QUOTE" ||
        data.cmd == "DUMPLOG" ||
        data.cmd == "DISPLAY_SUMMARY"
      ) {
        fetch("http://localhost:5000/api/command", {
          method: "GET",
          json: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => alert("Responce:", response.json()))
          .catch(error => console.error("Error:", error));
      }
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
  font-family: 'Courier New', Courier, monospace;
}
</style>
