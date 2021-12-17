import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: string[] = [];
  xIsnext: boolean = true;
  winner: string = '';

  constructor() {}
  
  //on program initialization, call newGame to start the game.
  ngOnInit() {
    this.newGame();
  }

  //set initial game state
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = "undetermined";
    this.xIsnext = true;
  }

  //TS getter to ID current player
  get player() {
    return this.xIsnext ? 'X' : 'O';
  }

  //event handler for when user clicks on a button to make a move
  makeMove(idx: number) {
    if (!this.squares[idx]) { // if square isn't already used
      this.squares.splice(idx, 1, this.player); //splice in the player to the board array
      this.xIsnext = !this.xIsnext; //toggle next player
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return "undetermined";
  }
}
