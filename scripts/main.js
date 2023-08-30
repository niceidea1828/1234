if (!localStorage.balance_p9) {
  localStorage.balance_p9 = 5000;
}

if (!localStorage.selected_p9) {
  localStorage.selected_p9 = "1";
}

if (!localStorage.level_p9) {
  localStorage.level_p9 = 1;
}

$(".balance").html(localStorage.balance_p9);
