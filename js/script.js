let canvas = document.getElementById('canvas');
if(document.documentElement.clientWidth > 400){
  canvas.width = 300;
  canvas.height = 300;
}
else{
  canvas.width = document.documentElement.clientWidth;
  canvas.height = canvas.width;
}

let ctx = canvas.getContext("2d");
ctx.fillRect(0, 0 ,canvas.width, canvas.height);



let cfg = {
	mode:1,
	//1 - PENCIL
	//2 - FILLRECT 
	//3 - RECT
	//4 - ERASER
	//5 - LINE
	//6 - TRIANGLE
	//7 - CIRCLE
  painting: false,
	fillStyle:   'black',
	lineCap:     'round',  // butt, square, round
	lineJoin:    'round',  // bevel, round, miter 
	lineWidth:    15,
	strokeStyle: 'white',
};

async function loadModel() {
  model = undefined; 
  model = await tf.loadLayersModel("model/model.json");
}

function setCanvas(){
  ctx.fillStyle = cfg.fillStyle;
  ctx.lineCap = cfg.lineCap;
  ctx.lineJoin = cfg.lineJoin;
  ctx.lineWidth = cfg.lineWidth;
  ctx.strokeStyle = cfg.strokeStyle;
}

setCanvas();
loadModel();

function preprocessCanvas(image) {
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0);
}

$("#recognize").click(async function () {
    // get image data from canvas
    var imageData = canvas.toDataURL();
 
    // preprocess canvas
    let tensor = preprocessCanvas(canvas);
 
    // make predictions on the preprocessed image tensor
    let predictions = await model.predict(tensor).data();
 
    // get the model's prediction results
    let results = Array.from(predictions);
    // console.log(Math.max(...results));
    let i = results.indexOf(Math.max(...results));
    console.log(i);
    alert(`Predicted value is ${i}`);
 
    // display the predictions in chart
    // $("#result_box").removeClass('d-none');
    console.log(results)
    // displayChart(results);
    // displayLabel(results);
});



const start = (e) => {
  // ctx.clearRect(0,0,500,500);
  cfg.painting = true;
	ctx.beginPath();
	ctx.strokeStyle = cfg.strokeStyle;
	ctx.moveTo(e.pageX - (window.innerWidth - canvas.width ) / 2, e.pageY - 100);
  console.log()
	ctx.lineTo(e.pageX - (window.innerWidth - canvas.width ) / 2, e.pageY - 100);
	ctx.stroke();

}

const draw = (e) =>{
  e.preventDefault();
  e.stopPropagation();
  if(!cfg.painting) return
	ctx.lineTo(e.pageX - (window.innerWidth - canvas.width ) / 2, e.pageY - 100);
	ctx.stroke();
}

const finish = (e) =>{
	cfg.painting = false;
	ctx.closePath();
}

//listeners
$("#clear").on("click", function(){
  ctx.fillRect(0, 0 ,canvas.width, canvas.height);
});

$("#canvas").on("mousedown", start); 
$("#canvas").on("mouseup", finish); 
$("#canvas").on("mousemove", draw); 

$("#canvas").on("touchstart", function (e) {
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
});

$("#canvas").on("touchend", function (e) {
  let mouseEvent = new MouseEvent("mouseup");
  canvas.dispatchEvent(mouseEvent);
}); 

$("#canvas").on("touchmove", function (e) {
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}); 

$(window).resize(function(){
  // console.log(document.documentElement.clientWidth)
  if(document.documentElement.clientWidth > 400){
    canvas.width = 300;
    canvas.height = 300;
  }
  else{
    canvas.width = document.documentElement.clientWidth;
    canvas.height = canvas.width;
  }
  let ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0 ,canvas.width, canvas.height);
  setCanvas();
})


$(window).on("load", function(){
  console.log('load');

  //hide loading animation
  $('.loading').hide();

  //show canvas
  $('#canvas').css('display', 'block');
  $('#canvas').show();

  //show buttons
  $('.buttons').css('display', 'flex');
  $('.buttons').show();
})






