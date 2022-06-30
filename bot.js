// IMPORTS
import "dotenv/config";
import tmi from "tmi.js";
import axios from "axios";

// BOT SETUP
const botClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.BOT_USER,
    password: process.env.BOT_TOKEN,
  },
  channels: ["effortlessdev"],
});

// BOT CONNECT
botClient.connect();
botClient.on("connected", () => {
  console.log("BOT Connected");
});

const prefix = "[BOT] ";

// BOT COMMANDS
botClient.on("message", async (channel, user, message, self) => {
  try {
    if (self) return;
    const arr = message.split(" ");
    if (arr[0] === "!dadjoke") {
      await axios
        .get("https://icanhazdadjoke.com/", {
          headers: {
            Accept: "application/json",
            "User-Agent": "effortlessdev",
          },
        })
        .then((res) => {
          botClient.say(channel, prefix + `${res.data.joke} LUL LUL LUL`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (arr[0] === "!yomomma") {
      await axios
        .get("https://api.yomomma.info/")
        .then((res) => {
          botClient.say(channel, prefix + `${res.data.joke} LUL LUL LUL`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (arr[0] === "!chucknorris") {
      await axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((res) => {
          botClient.say(channel, prefix + `${res.data.value} LUL LUL LUL`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (err) {
    console.log(err);
  }
});
