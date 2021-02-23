const QRCode = require("qrcode");
const fs = require("fs");
const {createCanvas, loadImage} = require("canvas");

async function createQRCode(studentId, centerImage, width) {
    // generate content of the QR code
    const originContent = "pid=" + studentId + "&timestamp=" + Date.parse(new Date().toString());
    const parsedContent = new Buffer.from(originContent).toString("base64");

    // create canvas to contain qr code. the last param is options
    const cvs = createCanvas(1, 1);
    const url = await QRCode.toCanvas(cvs, parsedContent, {
        type: "png",
        width: width,
        margin: 1,
        errorCorrectionLevel: "H",
        color: {
            dark: "#3bb265",
            light: "#ffffff"
        },
    });

    // create canvas to contain logo
    const canvas = createCanvas(url.width, url.height);
    const ctx = canvas.getContext("2d");
    const img = await loadImage(centerImage);

    // draw qr code and logo
    ctx.drawImage(url, 0, 0, url.width, url.height, 0, 0, url.width, url.height)
    ctx.drawImage(img, (url.width - img.width) / 2, (url.height - img.height) / 2, img.width, img.height);

    // save canvas as png file
    const data = canvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer.from(data, "base64");
    fs.writeFileSync("qrcode.png", buf)
}

// get config value from config file
const config = JSON.parse(fs.readFileSync("config.json").toString())
const studentId = config["student_id"];
const width = config["width"]

_ = createQRCode(studentId, "assert/qr-center-icon.png", width)
