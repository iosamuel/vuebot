/*
 * @author: Samuel Burbano
 * @version: 1.0
 */

const tmi = require("tmi.js");
require("dotenv").config();

const blacklist = ["svelte", "react", "angular"];
const whitelist = ["vue"];
const saluteslist = ["hola", "buenas", "saludos"];

const client = new tmi.client({
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: process.env.CHANNELS_NAME.split(",")
});

function sendMessage(target, text, list, message) {
  list.some(t => {
    const includes = text.replace(/ /g, "").includes(t);
    if (includes) client.say(target, message);
    return text.includes(t);
  });
}

client.on("message", (target, context, msg, self) => {
  if (self) return;

  const text = msg.toLowerCase();

  sendMessage(
    target,
    text,
    blacklist,
    `@${context.username} NotLikeThis Shame! - Vue es el unico verdadero framework! PogChamp`
  );

  sendMessage(
    target,
    text,
    whitelist,
    `@${context.username} SeemsGood Veo una persona de cultura. Tu si sabes! 💚`
  );

  sendMessage(target, text, saluteslist, `@${context.username} Vuenas! 💚`);
});

client.on("connected", (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.connect();
