document.addEventListener('DOMContentLoaded', () => {
  const board   = document.getElementById('board');
  const cells   = [...document.querySelectorAll('.cell')];
  const status  = document.getElementById('status');
  const reset   = document.getElementById('reset');

  let current   = 'X';
  let gameOver  = false;
  const state   = Array(9).fill('');

  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  function checkWinner(){
    for(const combo of wins){
      const [a,b,c]=combo;
      if(state[a] && state[a]===state[b] && state[a]===state[c]){
        combo.forEach(i=>cells[i].classList.add('winner'));
        status.textContent='الفائز: ${state[a]}';
        gameOver=true;
        return;
      }
    }
    if(!state.includes('')){
      status.textContent='تعادل!';
      gameOver=true;
    }
  }

  function handleClick(e){
    const idx=e.target.dataset.index;
    if(state[idx]||gameOver) return;

    state[idx]=current;
    e.target.textContent=current;

    checkWinner();
    if(!gameOver){
      current=current==='X'?'O':'X';
    status.textContent =' دور: ${current}';
    }
  }

  function resetGame(){
    state.fill('');
    cells.forEach(c=>{c.textContent='';c.classList.remove('winner');});
    current='X';
    gameOver=false;
    status.textContent='دور: X';
  }

  cells.forEach(c=>c.addEventListener('click',handleClick));
  reset.addEventListener('click',resetGame);
});