const Discord = require('discord.js');
var client = new Discord.Client();
const { token, prefix } = require('./config.json')
const superagent = require("superagent")

const command = require('../..Structures/command');
const ms = require('ms');

module.exports = class extends command {

    async run(message) {
        message.channel.send('My uptime is \'${ms(this.client.uptime, { long: true})]\'')
    }
}
