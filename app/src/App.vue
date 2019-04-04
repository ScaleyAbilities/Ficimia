<template>
  <div id="app">
    <h1 v-show=!hide>Login</h1><h1 v-show=hide>Enter Command</h1>
    <input v-show=hide v-model="command" placeholder="Enter command"> <br>
    <button v-show=hide v-on:click="execute()">Execute command</button>
    <input v-show=!hide v-model="username" placeholder="John Appleseed"> <br>
    <button v-show=!hide v-on:click="hide = !hide">Login</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  url: 'http://127.0.0.1:80/api/command',
  data() {
    return {
      hide: false,
      username: '',
      command: ''
    }
  },
  methods: {
    execute() {
      var cmd = this.command.toUpperCase().split(" ");
      var data;
      if(cmd[0] == "COMMIT_BUY" || cmd[0] == "CANCEL_BUY" || cmd[0] == "COMMIT_SELL" || cmd[0] == "CANCEL_SELL" || cmd[0] == "DISPLAY_SUMMARY"){
        data = {
          "cmd": cmd[0],
          "usr": this.username,
        }
      } else if(cmd[0] == "ADD"){
        data = {
          "cmd": cmd[0],
          "usr": this.username,
          "params": {
              'amount': cmd[1]
          }
        }
      } else if(cmd[0] == "QUOTE" || cmd[0] == "CANCEL_SET_BUY" || cmd[0] == "CANCEL_SET_SELL"){
        data = {
          'cmd': cmd[0],
          'usr': this.username,
          'params': {
              'stock': cmd[1]
          }
        }
      } else if(cmd[0] == "BUY" || cmd[0] == "SELL" || cmd[0] == "SET_BUY_AMOUNT" || cmd[0] == "SET_SELL_AMOUNT"){
        data = {
          'cmd': cmd[0],
          'usr': this.username,
          'params': {
              'stock': cmd[1],
              'amount': cmd[2]
          }
        }
      } else if(cmd[0] == "SET_BUY_TRIGGER" || cmd[0] == "SET_SELL_TRIGGER"){
        data = {
            'cmd': cmd[0],
            'usr': this.username,
            'params': {
                'stock': cmd[1],
                'price': cmd[2]
            }
        }
      } else if(cmd[0] == "DUMPLOG"){
        if(cmd.length == 2){
          data = {
            'cmd': cmd[0],
            'usr': null,
            'params': {
                'filename': cmd[1]
            }
          }
        } else if(cmd.length == 3)
          data = {
            'cmd': cmd[0],
            'usr': cmd[1],
            'params': {
                'filename': cmd[2]
            }
          }
      } else {
        alert("Command not recognized")
        return
      }
      if(data.cmd == "ADD" || data.cmd == "BUY" || data.cmd == "COMMIT_BUY" || data.cmd == "CANCEL_BUY" || data.cmd == "COMMIT_SELL" || data.cmd == "CANCEL_SELL" || data.cmd == "SET_BUY_AMOUNT" || data.cmd == "SET_BUY_TRIGGER" || data.cmd == "CANCEL_SET_BUY" || data.cmd == "SET_SELL_AMOUNT" || data.cmd == "SET_SELL_TRIGGER" || data.cmd == "CANCEL_SELL_TRIGGER"){
          console.log(JSON.stringify(data))
          fetch("http://localhost:5000/api/command", {
          method: 'POST',
          json: JSON.stringify(data), 
          headers:{
            'Content-Type': 'application/json'
          }
        }).catch(error => console.error('Error:', error));
      } else if(data.cmd == "QUOTE" || data.cmd == "DUMPLOG" || data.cmd == "DISPLAY_SUMMARY"){
          fetch("http://localhost:5000/api/command", {
            method: 'GET',
            json: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
          }
        }).then(response => alert('Responce:', response.json()))
        .catch(error => console.error('Error:', error));
      }
    }
  }
}
</script>

<style>
#app {
  /* put some fancy css here */
}
</style>
