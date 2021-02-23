# access QRCode fxxker

generate access QR code.

## How to use

1. `yarn install`
2. edit `config.json`. Usually, keep `width` in the default value.
3. `yarn start`

After running, it will generate an image named `qrcode.png` in project root file.

---

## Tips

I'd suggest you to refresh the QR Code every minute if you want to use it in a long term. 

by the way, below is the original generation method.
```javascript
imgQRCode.prototype.generateImgQRCode = function() {
	var obj = this;
	var target = obj.target;
	var timestamp = Date.parse(new Date());
	var content = window.btoa("pid=" + $.cookie('pid') + "&timestamp=" + timestamp);
	$("#" + this.target).qrcode({
		render : "canvas",               //也可以替换为table
        ecLevel : 'H',                   //识别度  'L', 'M', 'Q' or 'H'
        size : obj.size,                 //二维码大小
        fill : obj.fill,                 //二维码颜色
        background : obj.background,     //背景色
        text : content,                  //二维码内容
        //quiet: 2,                      //边距
        mode : 4,
        mSize : 0.3,                     //图片大小
        mPosX : 0.5,
        mPosY : 0.5,
        label : 'jQuery.qrcode',
        fontname : 'sans',
        fontcolor : '#000',
        image : $('#myLogo')[0],
        typeNumber : -1,                 //计算模式 
	});
};

imgQRCode.prototype.setInterval = function() {
	var timesRun = 0;
	var interval = setInterval(function() {
		timesRun += 1;
		if(timesRun === 60){
			imgQRCode.prototype.clear(interval);
		}
	}, 1000);
	$.cookie('interval', interval);
}
```