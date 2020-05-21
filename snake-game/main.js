window.onload = () => {
	
	document.addEventListener('keydown', event => {
		changeDirection(event);
	});
	
	const getRandomPosition = ( min = 1, max = 32 ) => {
		
		const position = Math.floor( Math.random() * (max - min) + min );
		return position * boxSize;
		
	};
	
	const renderField = () => {		
		context.fillStyle = "gray";
		context.fillRect(0, 0, fieldSize, fieldSize);
	};
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	//game variables
	const fieldSize = 512;
	const boxSize = 16;
	let level = 1;
	
	//snake variables
	let posX = posY = getRandomPosition() / boxSize;
	let speedX = 1;
	let speedY = 0;
	let snakeLength = 1;
	let snake = []; 
	
	//food variables
	let foodX = getRandomPosition();
	let foodY = getRandomPosition();
	
	
	setInterval( () => {
		
		posX += speedX;
		posY += speedY;
		
		//when reach field border
		if ( posX === fieldSize / boxSize ) {
			posX = 0;
		}
		if ( posX === -1 ) {
			posX = fieldSize / boxSize;
		}
		if ( posY === fieldSize / boxSize ) {
			posY = 0;
		}
		if ( posY === -1 ) {
			posY = fieldSize / boxSize;
		}
		
		//console.log(`Posição atual cobra = (x, y) => (${posX}, ${posY})`);
		//console.log(`Posição atual food = (x, y) => (${foodX}, ${foodY})`);
		
		//render field
		renderField();
		
		//render snake
		//context.fillStyle = "green";
		//context.fillRect(posX * boxSize, posY * boxSize, boxSize, boxSize);
		
		//console.log(snake);
		
		for ( let i = 0; i < snake.length; i++) {
			
			if ( posX === snake[i].posX && posY === snake[i].posY ) {
				
				console.log(`Head position: (${posX}, ${posY}`); 
				console.log(`Render position: (${snake[i].posX}, ${snake[i].posY})`);
				
				alert(`Game Over. Pontuação: ${snakeLength}`);
				snakeLength = 10;
				posX = posY = getRandomPosition() / 16;
				renderField();
			}
			
			i === snake.length - 1 ? context.fillStyle = "yellow" : context.fillStyle = "green";
			context.fillRect( snake[i].posX * boxSize, snake[i].posY * boxSize, boxSize, boxSize );
			
			console.log(`Head position: (${posX}, ${posY}`); 
			console.log(`Render position: (${snake[i].posX}, ${snake[i].posY})`);
			
		};
		
		snake.push({ 
			posX, 
			posY 
		});
		
		while(snake.length > snakeLength) {
			snake.shift();
		};
				
		//render food
		context.fillStyle = "red";
		context.fillRect( foodX, foodY, boxSize, boxSize);
		
		//when eat food
		if ( posX * boxSize === foodX && posY * boxSize === foodY ) {
			snakeLength += 1;
			foodX = getRandomPosition();
			foodY = getRandomPosition();
		};
		
		//change speed game
		if ( snakeLength % 10 === 0 ) {
			level = snakeLength / 10;
		};
		
	console.log(`Snake length = ${snakeLength}`);
		
	}, 500 );
	
	const changeDirection = event => {
		
		switch(event.keyCode) {
			case 38:
				speedX = 0;
				speedY = -1;
				break;
			case 40:
				speedX = 0;
				speedY = 1;
				break;
			case 37:
				speedX = -1;
				speedY = 0;
				break;
			case 39:
				speedX = 1;
				speedY = 0;
				break;
			default:
				break;
		};
		
	};
	
};