require("dotenv").config();
const client = require("twilio")(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function send_message(name, number) {
  await client.messages
    .create({
      body: `Oi ${name}, tudo bem?

    Esse é um lembrete automático relacionado à próxima reunião semanal.
    
    Segue o formulário: ${process.env.URL}`,

      from: `whatsapp:+${number}`,
      to: `whatsapp:+${process.env.SENDER}`,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err))
    .done();
}

async function main() {
  for (var i = 0; i < process.env.NAMES.split(" ").length; i++) {
    send_message(
      process.env.NAMES.split(" ")[i],
      process.env.NUMBERS.split(" ")[i]
    );

    await sleep(5000);
  }
}

main();
