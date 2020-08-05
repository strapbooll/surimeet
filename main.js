const { app, BrowserWindow } = require("electron");
const express = require("express");

app.on("ready", function () {
  var ex = express();

  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  ex.get("/whats/:num", function (req, res) {
    var numero = req.params.num;
    var msg = `Oi, tudo bem? Não esquece de preencher o formulário\n Segue o formulário: https://docs.google.com/forms/d/e/1FAIpQLSd78pgKrCs2YkVRZJIy_PhW-qojvVFQ41vEC-t3I61rR1j2tQ/viewform`;
    enviar(numero, msg);
    res.send("enviando Mensagem via whatsapp..");
  });

  function enviar(telefone, mensagem) {
    mainWindow.loadURL(
      "https://web.whatsapp.com/send?phone=" + telefone + "&text=" + mensagem,
      {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
      }
    );
    mainWindow.webContents.executeJavaScript(
      `
      var{ipcRenderer,remote} = require("electron");
      var enviado = false;
      function tempo(){
        var btsend = document.getElementsByClassName("_1U1xa")[0];
        var inputSend = document.getElementsByClassName("_3FRCZ")[1];
        console.log(inputSend);
        if(typeof inputSend !== "undefined" && inputSend.innerText && !enviado){
          btsend.click();enviado=true;}
        else if(enviado){
            ipcRenderer.send("para", {status:true});
        }}
        setInterval(tempo,3000);
      `
    );
    mainWindow.show();
  }
  ex.listen(3400);
});
