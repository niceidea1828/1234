function changeBalance(amount) {
  localStorage.balance_app = +localStorage.balance_app + amount;
  $(".balance").html(localStorage.balance_app);
}

function shuffle(arr) {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randElem(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeBet(amount) {
  let bet;
  if (bet + amount < 0 || bet + amount > +localStorage.balance_app) {
    return;
  }

  bet += amount;
  $(".bet").html(bet);
}
