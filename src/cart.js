let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCardItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, itemQuantity } = x;
        let search = shopItemsData.find((y) => y.id == id) || [];
        let { prodId, name, desc, price, img } = search;
        // let priceNum =  parseFloat(price.replace(/[^0-9]/g,""));
        // let total = itemQuantity * priceNum;
        // let ifExists = basket.find((item) => item.id == id) || {};
        return `
        <div id=prod-${prodId} class="cartCard">
          <img src="${img}" alt="" />
          <div class="details">
              <div class="top-row">
                <h3 class="item-name">${name}</h3>
                <h2 class="price">$ ${price}</h2>
                <i onclick="removeItem(${id})" class="ri-close-large-fill"></i>
              </div>
              <button class="addSubButton">
                <i onclick="decr(${id})" class="ri-subtract-fill"></i>            
                <div id=${id} class=""quantity>
                  ${itemQuantity === undefined ? 0 : itemQuantity}
                </div>
                <i onclick="incr(${id})" class="ri-add-large-line"></i>
              </button>
              <h3>$ ${itemQuantity*price}</h3>
          </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML=``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
          <button class="HomeBtn">Home</button>
      </a>
    `;
  }
};

generateCardItems();

let calculateCart = () => {
  const total = basket.reduce((acc, x) => {
    return acc + x.itemQuantity;
  }, 0);
  const cartQuantity = document.getElementById("cartQuantity");
  cartQuantity.innerHTML = total;
};

let incr = (prodId) => {
  let ifExists = basket.find((item) => {
    return item.id === prodId;
  });

  if (ifExists === undefined) {
    basket.push({
      id: prodId,
      itemQuantity: 1,
    });

    // update((id = prodId), (quantity = 1));
  } else {
    ifExists.itemQuantity += 1;

    // let { id, itemQuantity } = ifExists;
    // update(id, itemQuantity);
  }

  generateCardItems();
  updateItem(prodId);
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
};

let decr = (prodId) => {
  let ifExists = basket.find((item) => {
    return item.id === prodId;
  });

  if (ifExists == undefined) {
    return;
  } else if (ifExists.itemQuantity === 0) {
    return;
  } else {
    ifExists.itemQuantity -= 1;
  }
  
  updateItem(prodId);
  basket = basket.filter((x)=> x.itemQuantity != 0 );
  generateCardItems();
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
};

let updateItem = (prodId) => {
  let ifExists = basket.find((item) => {
    return item.id === prodId;
  });
  // console.log(ifExists.itemQuantity);
  let quantity = ifExists.itemQuantity;
  let elem = document.getElementById(prodId);
  elem.innerHTML = quantity;
  calculateCart();
  totalBill();
};

let removeItem = (id) => {
  basket = basket.filter((x)=> x.id != id); 
  generateCardItems();
  totalBill();
  localStorage.setItem("data", JSON.stringify(basket));
  calculateCart();

}

let totalBill = () => {
  if (basket.length !== 0) {
    let amounts = basket.map((x) => {
      let { id, itemQuantity } = x;
      let search = shopItemsData.find((y) => y.id == id) || [];
      let { prodId, name, desc, price, img } = search;
      return (itemQuantity*price);
  }).reduce((acc,x)=>acc+x,0);
  console.log(amounts)
  label.innerHTML = `<h2>Total bill : $${amounts}</h2>
  <button onclick="checkOut()" class="checkout">Checkout</button>
  <button onclick="clearCart()" class="clearCart">Clear Cart</button>
  `
}
  else{
    return
  }
}

let checkOut = () =>{


};
let clearCart = () => {
  basket.splice(0, basket.length);
  calculateCart();
  generateCardItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

calculateCart();
totalBill();
