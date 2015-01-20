function initialize()
{
	var element = document.getElementById('canvas');
	var canvas = element.getContext('2d'); // 2d поддерживается всеми браузерами
	canvas.save();	
	var grad = canvas.createLinearGradient(0, 50, 500, 350);
	
	canvas.fillStyle = 'gelb';
	canvas.strokeStyle = 'green';
	canvas.strokeRect(100,100,120,120); // границы прямоугольника
	canvas.fillRect(110, 110, 100, 100); // закрашенный прямоугольник
	canvas.clearRect(100, 100, 80, 80);
	grad.addColorStop(0.5, 'olive');//позиция, на которой нужно поменять цвет
	grad.addColorStop(0.7, 'yellow');
	canvas.fillStyle = grad;
	canvas.fillRect(10, 10, 100, 100);
	canvas.fillRect(150, 10, 200, 100);
	
	canvas.beginPath();
	canvas.moveTo(200, 200);
	canvas.lineTo(300, 300);
	canvas.lineTo(200, 300);
	
	
	
	canvas.beginPath();
	canvas.moveTo(200, 200);
	canvas.lineTo(300, 300);
	canvas.lineTo(200, 300);
	canvas.clip();
	
	canvas.beginPath();
	for(var f = 0; f < 300; f = f + 10)
	{
		canvas.moveTo(0, f);
		canvas.lineTo(500,f);
	}
	
	
	canvas.closePath();
	canvas.stroke();
	
	canvas.translate(50, 70);
	canvas.font = 'bold 20px verdana';
	canvas.fillText('Test', 100, 30); // не виден, т.к. попал в маску
	canvas.restore(); // обновляет все наши переменные
	canvas.fillText('Test2', 0, 30);
	
	canvas.beginPath();
	//  для окружности:
	var radian = 2*Math.Pi; 
	//var radian = Math.Pi/180*45; // преобразуем градусы в радианы
	canvas.arc = (50, 50, 50, 0, radian, false);//false - против часовой стрелки
	
};
addEventListener('load', initialize);
