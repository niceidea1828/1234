if (!localStorage.list_p9) {
  localStorage.list_p9 = JSON.stringify(["1"]);
}

let balance = +localStorage.balance_p9;
$(".balance").text(balance);

let bought = JSON.parse(localStorage.list_p9);
let selectedPlane = localStorage.selected_p9;

let shopItems = [
  { name: "1", price: 250 },
  { name: "2", price: 1000 },
  { name: "3", price: 1200 }
];

shopItems.forEach((item) => {
  item.bought = bought.includes(item.name);
  item.selected = item.name == selectedPlane;
});

renderCards();

window.onload = () => {
  $(".wrapper").removeClass("hidden");
};

function renderCards() {
  $(".shop").html("");

  shopItems.forEach((item) => {
    let cardHtml = `
              <div class="card" data-name="${item.name}">
                  <div class="card_top block">
                  <img src="../png/shine${+item.name}.png" alt="" class="card_pic" />
                  </div>

                  ${getCardBtnHTML(item)}
              </div>
          `;

    $(".shop").append(cardHtml);

    function getCardBtnHTML(item) {
      if (!item.bought) {
        return `
                      <div class="card_btn block">
                          <div>BUY</div>
                          <div>${item.price}</div>
                      </div>
                      `;
      } else {
        return `
                  <div class="card_btn block">
                      <div>${item.selected ? "Selected" : "Select"}</div>
                  </div>
                  `;
      }
    }
  });

  $(".card_btn").click(function () {
    let btnIndex = $(".card_btn").index($(this));
    let shopItem = shopItems[btnIndex];

    if (!shopItem.bought) {
      if (balance < shopItem.price) {
        return;
      }

      changeBalance(-shopItem.price);
      shopItem.bought = true;
      localStorage.list_p9 = JSON.stringify([...JSON.parse(localStorage.list_p9), shopItem.name]);
      renderCards();
      console.log(shopItems);
    } else if (!shopItem.selected) {
      localStorage.selected_p9 = shopItem.name;
      shopItems.forEach((item) => (item.selected = false));
      shopItem.selected = true;
      renderCards();
    }
  });
}

function changeBalance(amount) {
  localStorage.balance_p9 = +localStorage.balance_p9 + amount;
  $(".balance").html(localStorage.balance_p9);
}
