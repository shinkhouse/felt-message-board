var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var lines = [];
var line = "";
var lineTest = "";
var currentY = 0;
$("#text-block").val(
    "Hello there. thanks for checking out my little interactive felt board. feel free to type whatever message you would like. to save your message, right click on felt board and click save image. congrats, you now have an inspring message. #instaspiring"
);
var text = $("#text-block")
    .val()
    .toUpperCase();

const myFont = new FontFace(
    "Montserrat",
    "url(https://fonts.googleapis.com/css?family=Montserrat)"
);

function getCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = "#D9B26F";
    ctx.fillRect(150, 200, 200, 300);
    ctx.shadowBlur = 0;
    ctx.save();
    ctx.fillStyle = "#303030";
    ctx.fillRect(165, 215, 170, 270);
    ctx.save();
    for (var i = 0; i < 270; i += 6) {
        ctx.fillStyle = "#000";
        ctx.fillRect(165, 215 + i, 170, 2);
        ctx.save();
    }
    ctx.save();
}
function setText(setWidth, typeWriter) {
    var width = setWidth;
    var feltBoardHeight = 470;
    var fontSize = 14;
    var words = text.split(" ");
    console.log(text);
    for (var i = 0, len = words.length; i < len; i++) {
        lineTest = line + words[i] + " ";

        // Check total width of line or last word
        if (ctx.measureText(lineTest).width > width) {
            // Calculate the new height
            currentY = 222;
            currentY += lines.length * fontSize + fontSize;

            if (currentY > feltBoardHeight) {
                $("#error-text").text(
                    "Your message is too long. Try changing your font size."
                );
                console.log("Can't display all text.");
            } else {
                lines.push({ text: line, height: currentY });
                line = words[i] + " ";
            }
        } else {
            line = lineTest;
        }
    }

    // Catch last line in-case something is left over
    if (line.length > 0) {
        currentY = 222;
        currentY += lines.length * fontSize + fontSize;
        lines.push({ text: line.trim(), height: currentY });
    }

    // Visually output text
    ctx.clearRect(150, 200, 200, 300);
    getCanvas();
    for (var i = 0, len = lines.length; i < len; i++) {
        ctx.fillStyle = "#fff";
        ctx.font = fontSize + 'px "Montserrat"';
        ctx.fillText(lines[i].text, 175, lines[i].height);
        setTimeout(1000);
    }
}

function changeFeltText() {
    lines = [];
    words = [];
    line = "";
    lineTest = "";
    text = $("#text-block").val().toUpperCase();
    setText(160, false);
}
