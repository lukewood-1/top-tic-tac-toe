const gameBoard = ( function(){
  const board = [];
	board.length = 9;

	const clean = () => board.forEach((i, v) => board[v] = undefined);

  const winQuote = winnerPos => `${winnerPos} won the whole thing! If you bet with your opponent on the side, collect your winnings!`;

	const viewBoard = () => console.log(board);
  
	const win = function(){
 if(board[0] && board[0] === board[1] && board[1] === board[2]){ //1-3
		gameManager.setBoxShadow(0);
		gameManager.setBoxShadow(1);
		gameManager.setBoxShadow(2);
    return winQuote(board[0])
 }
 else if (board[0] && board[0] === board[3] && board[3] === board[6]){ //1-7
		gameManager.setBoxShadow(0);
		gameManager.setBoxShadow(3);
		gameManager.setBoxShadow(6);
    return winQuote(board[0]);
	} 
 else if(board[0] && board[0] === board[4] && board[4] === board[8]){ //1-9
		gameManager.setBoxShadow(0);
		gameManager.setBoxShadow(4);
		gameManager.setBoxShadow(8);
    return winQuote(board[0]);
  }
  else if(board[1] && board[1] === board[4] && board[4] === board[7]){ //2-8
		gameManager.setBoxShadow(1);
		gameManager.setBoxShadow(4);
		gameManager.setBoxShadow(7);
    return winQuote(board[1]);
  }
  else if(board[2] && board[2] === board[4] && board[4] === board[6]){ //3-7
		gameManager.setBoxShadow(2);
		gameManager.setBoxShadow(4);
		gameManager.setBoxShadow(6);
    return winQuote(board[2]);
  }
  else if(board[2] && board[2] === board[5] && board[5] === board[8]){ //3-9
		gameManager.setBoxShadow(2);
		gameManager.setBoxShadow(5);
		gameManager.setBoxShadow(8);
    return winQuote(board[2]);
  }
  else if(board[3] && board[3] === board[4] && board[4] === board[5]){ //4-6
		gameManager.setBoxShadow(3);
		gameManager.setBoxShadow(4);
		gameManager.setBoxShadow(5);
    return winQuote(board[3]);
  }
  else if(board[6] && board[6] === board[7] && board[7] === board[8]){ //7-9
		gameManager.setBoxShadow(6);
		gameManager.setBoxShadow(7);
		gameManager.setBoxShadow(8);
    return winQuote(board[6])
  }
	else if(!board.includes(undefined)){
		return `It's a... DRAW?! C'mon now, run it back! Somebody gotta win this!`
	}
    else return `The game is still open! Who's gonna win?`
  };
  
  const updateBoard = function(player, pos){
    board[pos] = player;
  };

  return {updateBoard, win, viewBoard, clean}
})();

const Player = function (name){
  this.name = name;
  this.mark = function (boardPos) {
		return gameBoard.updateBoard(this.name, boardPos)
	};
	this.markNought = function (pos) {
		pos.textContent = 'O';
		pos.style.fontFamily = 'eraserregular';
		pos.style.fontSize = '4rem';
	};
	this.markCross = function (pos) {
		pos.textContent = 'X';
		pos.style.fontFamily = 'eraserregular';
		pos.style.fontSize = '4rem';
	}
  return {name, mark, markNought, markCross}
};


const gameManager = ( function (){
//cache nodes
	const player1Name = document.querySelector('#player-name-1');
	const player2Name = document.querySelector('#player-name-2');
	const player1Color = document.querySelector('#player-clr-1');
	const player2Color = document.querySelector('#player-clr-2');
	const body = document.querySelector('body');
	const boardPiece = document.querySelectorAll('.board-piece');
	const bottomMessage = document.querySelector('.bottom-message-board');
	const topMessage = document.querySelector('.top-message-board');
	const newGameBtn = document.querySelector('.new-game');
	
	
//methods for the DOM
	
//paint screen with player colors
	const paintSides = function(){

		player1Color.addEventListener('input', e => {
			body.style.setProperty('--player-1-clr', e.target.value);
		});

		player2Color.addEventListener('input', e => {
			body.style.setProperty('--player-2-clr', e.target.value);
		});
	};

//Give player objects a user-specified name
	const player1 = Player('player1');
	const player2 = Player('player2');
	const defineNames = () => {
		player1Name.addEventListener('change', e => {
			player1.name = e.target.value.slice(0, 1).toUpperCase()+e.target.value.slice(1).toLowerCase();
		});
		player2Name.addEventListener('change', e => {
			player2.name = e.target.value.slice(0, 1).toUpperCase()+e.target.value.slice(1).toLowerCase();
		});
	};

// Mark board places on the UI
	const markUI = () => {
		let turn = 0;
		for(let i = 0; i < boardPiece.length; i++){
			boardPiece[i].addEventListener('click', function (e) {
				if(turn === 0){
					boardPiece[i].style.backgroundColor = body.style.getPropertyValue('--player-1-clr');
					player1.mark(i);
					player1.markNought(boardPiece[i]);
					topMessage.textContent = gameBoard.win();
					bottomMessage.textContent = randomQuote();
					turn++;
				} else if (turn === 1){
					boardPiece[i].style.backgroundColor = body.style.getPropertyValue('--player-2-clr');
					player2.mark(i);
					player2.markCross(boardPiece[i]);
					topMessage.textContent = gameBoard.win();
					bottomMessage.textContent = randomQuote();
					turn--;
				}
			},
			{once: true}) 
		}
	};

//Highlight checks used to win a game
	const setBoxShadow = boardPos => {
		boardPiece[boardPos].style.boxShadow = 'inset 0 0 3rem -1rem #fff, 0 0 1rem #fff';
		boardPiece[boardPos].style.zIndex = '1';
	}


// random quotes about strategy for the bottom message board
	const randomQuote = () => {
		const quotePool = [`The essence of strategy is choosing what not to do." — Michael E. Porter`,
		`In real life, strategy is actually very straightforward. You pick a general direction and implement like hell." — Jack Welch`,
		`The competitor to be feared is one who never bothers about you at all, but goes on making his own business better all the time." — Henry Ford`,
		`However beautiful the strategy, you should occasionally look at the results." — Sir Winston Churchill`,
		`"Strategy is not the consequence of planning, but the opposite: its starting point." — Henry Mintzberg`,
		`Winning should be at the heart of every strategy." — A.G. Lafley & Roger L. Martin`,
		`"Culture eats strategy for breakfast." — Peter Drucker`,
		`"Transient advantage is the new normal." — Rita Gunther McGrath`,
		`"By failing to prepare, you are preparing to fail." — Benjamin Franklin`,
		`"If you don't know where you are going, you'll end up someplace else." — Yogi Berra`,
		`"If you're competitor-focused, you have to wait until there is a competitor doing something. Being customer-focused allows you to be more pioneering." — Jeff Bezos`,
		`Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win." — Sun Tzu`,
		`“A goal without a plan is just a wish.” — Antoine de Saint-Exupéry`,
		`"Someone is sitting in the shade today because someone planted a tree a long time ago." — Warren Buffett`,
		`"Strategy is buying a bottle of fine wine when you take a lady out for dinner. Tactics is getting her to drink it."`];
	const rng = Math.floor(Math.random() * quotePool.length);
		return quotePool[rng]
	};

//restart the game
	const restartBtn = () => {
		const restartGame = () => {
			player1Name.textContent = '';
			player2Name.textContent = '';
			body.style.setProperty('--player-1-clr', '#444');
			body.style.setProperty('--player-2-clr', '#444');
			gameBoard.clean();

		// repaint board pieces
			boardPiece.forEach( (value, i) => {
			value.style.removeProperty('background');
			value.textContent = i+1;
			value.style.fontFamily = 'Helvetica, sans-serif';
			value.style.fontSize = '2.5rem';
			value.style.removeProperty('box-shadow');
			value.style.removeProperty('z-index');
			markUI();
			});

		// Reset Message Boards
			topMessage.textContent = '';
			bottomMessage.textContent = '';
		};
		
		newGameBtn.addEventListener('click', restartGame);
	};

	return {defineNames, paintSides, markUI, randomQuote, setBoxShadow, restartBtn}
})();
gameManager.defineNames();
gameManager.paintSides();
gameManager.markUI();
gameManager.restartBtn();
