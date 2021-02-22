//PENCIL

const startPencil = (e) => {
	painting = true;
	if(active[0]==false) return;
	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.beginPath();
	ctx2.strokeStyle=paint.strokeStyle;
	ctx2.moveTo(e.pageX, e.pageY - 100);
	ctx2.lineTo(e.pageX, e.pageY - 100);
	ctx2.stroke();

}

const drawPencil = (e) =>{
	if((painting == false)||(active[0] == false)) return;
	ctx2.lineTo(e.pageX, e.pageY - 100);
	ctx2.stroke();
}

const finishPencil = (e) =>{
	painting = false;
	ctx2.closePath();
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}



//FILLRECT
const startFillrect = (e) =>{
	painting = true;
	if(active[1] == false) return;
	startX = e.pageX ;
	startY = e.pageY  - 100;
	ctx1.fillRect(startX, startY , 0, 1);
	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
		
}

const drawFillrect = (e) =>{
	if((painting == false)||(active[1]==false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.fillRect(startX, startY, e.pageX-startX, e.pageY-startY  - 100);
}

const finishFillrect = () =>{
	painting = false;
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}



//RECT
const startRect = (e) =>{
	painting = true;
	if(active[2] == false) return;
	startX = e.pageX;
	startY = e.pageY - 100;
	ctx2.beginPath();
	ctx2.moveTo(e.pageX, e.pageY - 100);
	ctx2.lineTo(e.pageX, e.pageY - 100);
	ctx2.stroke();
	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

const drawRect = (e) =>{
	if((painting == false)||(active[2] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);

	ctx2.beginPath();
	ctx2.moveTo(startX, startY);
	ctx2.lineTo(startX, e.pageY  - 100);
	ctx2.lineTo(e.pageX, e.pageY  - 100);
	ctx2.lineTo(e.pageX, startY);
	ctx2.lineTo(startX, startY);
	ctx2.stroke();
}

const finishRect = () =>{
	painting = false;
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}


//ERASER
const startEraser = (e) =>{
	painting = true;
	if(active[3]==false) return;
	var lastX, lastY;
	startX = e.pageX;
	startY = e.pageY  - 100;
	ctx1.clearRect(startX-paint.lineWidth*3/2, startY-paint.lineWidth*3/2,paint.lineWidth*3,paint.lineWidth*3);
}

const drawEraser = (e) =>{
	if((painting == false)||(active[3] == false)) return;
	lastX = startX, lastY = startY;
	ctx1.clearRect(e.pageX-paint.lineWidth*3/2, e.pageY  - 100-paint.lineWidth*3/2, paint.lineWidth*3, paint.lineWidth*3);

	ctx1.clearRect((lastX+e.pageX)/2-paint.lineWidth*3/2, (lastY+e.pageY - 100)/2-paint.lineWidth*3/2, paint.lineWidth*3, paint.lineWidth*3);
	startX = e.pageX;
	startY = e.pageY -100;;
}

const finishEraser = () =>{
	painting = false;
}


//LINE
const startLine = (e) =>{
	painting = true;
	if(active[4]==false) return;
	startX = e.pageX;
	startY = e.pageY - 100;

	ctx1.beginPath();
	ctx1.moveTo(e.pageX, e.pageY - 100);
	ctx1.lineTo(e.pageX, e.pageY - 100);
	ctx1.stroke();

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);

}

const drawLine = (e) => {
	if((painting == false)||(active[4] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.beginPath();
	ctx2.moveTo(startX, startY );
	ctx2.lineTo(e.pageX, e.pageY - 100);
	ctx2.stroke();
}

const finishLine = () => {
	painting = false;

	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);
	
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas2.width, canvas2.height);
}


//TRIANGLE
const startTriangle = (e) =>{
	painting = true;
	if(active[5]==false) return;
	startX = e.pageX;
	startY = e.pageY-100;

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

const drawTriangle = (e) =>{
	if((painting == false)||(active[5]==false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);

	ctx2.beginPath();
	ctx2.moveTo(startX, e.pageY - 100);
	ctx2.lineTo((e.pageX+startX)/2, startY);
	ctx2.lineTo(e.pageX, e.pageY - 100);
	ctx2.lineTo(startX, e.pageY - 100);
	ctx2.stroke();
}

const finishTriangle = (e) =>{
	painting = false;
	
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas2.width, canvas2.height);
}




//CIRLCE
const startCircle = (e) => {
	painting = true;
	if(active[6]==false) return;
	startX = e.pageX;
	startY = e.pageY - 100;

	ctx3.drawImage(canvas1,0,0);
	ctx1.clearRect(0,0,canvas2.width, canvas2.height);
}

const drawCircle = (e) => {
	if((painting == false)||(active[6] == false)) return;
	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx2.beginPath();
	ctx2.arc((e.pageX-startX)/2+startX,(e.pageY-100-startY)/2+startY,
		Math.abs(((e.pageX-startX)/2+(e.pageY-100-startY)/2)/2), 0,10*Math.PI);
	ctx2.stroke();
}

const finishCircle = () =>{
	painting = false;
	
	ctx1.drawImage(canvas3,0,0);
	ctx1.drawImage(canvas2,0,0);

	ctx2.clearRect(0,0,canvas2.width, canvas2.height);
	ctx3.clearRect(0,0,canvas3.width, canvas3.height);
}
