window.onload = () => {
	
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");
	
	document.addEventListener('keydown', event => {
		changeDirection(event);
	});
	
	const getRandomNumber = ( min = 1, max = 32 ) => {		
		const position = Math.floor( Math.random() * (max - min) + min );
		return position * boxSize;		
	};
	
	//game variables
	const fieldSize = 512;
	const boxSize = 16;
	let level = 1;
	let speed = 1;
	let time = 150;
	
	//snake variables
	let posX = posY = getRandomNumber() / boxSize;
	let speedX = speed;
	let speedY = 0;
	let snakeLength = 4;
	let snake = []; 
	
	//food variables
	const food = {
		foodX: getRandomNumber(),
		foodY: getRandomNumber(),
		value: 1
	};
	
	const bonusFood = {
		foodX: getRandomNumber(),
		foodY: getRandomNumber(),
		value: getRandomNumber(1, 10),
		time: 10
	};
	
	//render field
	const renderField = () => {		
		context.fillStyle = "gray";
		context.fillRect(0, 0, fieldSize, fieldSize);
	};
	
	//render snake
	const renderSnake = () => {
		
		for ( let i = 0; i < snake.length; i++) {			
			if ( posX === snake[i].posX && posY === snake[i].posY ) {				
				alert(`Game Over. Pontuação: ${snakeLength}`);
				snakeLength = 4;				
				renderField();
				posX = posY = getRandomNumber() / 16;				
			}
			i === snake.length - 1 ? context.fillStyle = "yellow" : context.fillStyle = "green";
			context.fillRect( snake[i].posX * boxSize, snake[i].posY * boxSize, boxSize, boxSize);
		};
		
		//add a tail in snake
		snake.push({ 
			posX, 
			posY 
		});
		
		//verify and mantain the snake length
		while(snake.length > snakeLength) {
			snake.shift();
		};
	}
	
	//render food in random place
	const renderFood = () => {		
		context.fillStyle = "red";
		context.fillRect( food.foodX, food.foodY, boxSize, boxSize);
	};
	
	//render bonus food
	const renderBonusFood = () => {		
		context.fillStyle = "blue";
		context.fillRect( bonusFood.foodX, bonusFood.foodY, boxSize, boxSize);
	};
	
	//change snake direction
	const changeDirection = event => {
		
		switch(event.keyCode) {
			case 38:
				speedX = 0;
				speedY = -speed;
				break;
			case 40:
				speedX = 0;
				speedY = speed;
				break;
			case 37:
				speedX = -speed;
				speedY = 0;
				break;
			case 39:
				speedX = speed;
				speedY = 0;
				break;
			default:
				break;
		};
		
	};
	
	const game = () => {
		
		//make snake runs
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
		
		//render field
		renderField();
		
		//render snake		
		renderSnake();
				
		//render food
		renderFood();
		
		if ( snakeLength % 5 === 0 && bonusFood.time > 0 ) {
			renderBonusFood();
			bonusFood.time -= 1;
			
		}
		
		//when eat food
		if ( posX * boxSize === food.foodX && posY * boxSize === food.foodY ) {
			snakeLength += food.value;
			food.foodX = getRandomNumber();
			food.foodY = getRandomNumber();
		};
		
		//when eat bonus food
		if ( posX * boxSize === bonusFood.foodX && posY * boxSize === bonusFood.foodY ) {
			snakeLength += bonusFood.value;
			bonusFood.foodX = getRandomNumber();
			bonusFood.foodY = getRandomNumber();
		};
		
	};
	
	setInterval( () => {		
		game();		
	}, time );
	
};