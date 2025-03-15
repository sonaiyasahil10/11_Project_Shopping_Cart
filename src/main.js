let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateItems = () => {
  return (shop.innerHTML = shopItemsData
    .map((itemData) => {
      let { id, name, desc, price, img } = itemData;
      let ifExists = basket.find((item) => item.id == id) || {};
      return `
    <div id=prod-${id} class="item">
        <img src="${img}" alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="priceQuantity">
            <h2 class="price">$ ${price}</h2>
            <button class="addSubButton">
              <i onclick="decr(${id})" class="ri-subtract-fill"></i>            
              <div id=${id} class=""quantity>
                 ${
                   ifExists.itemQuantity === undefined
                     ? 0
                     : ifExists.itemQuantity
                 }
              </div>
              <i onclick="incr(${id})" class="ri-add-large-line"></i>
            </button>
          </div>
        </div>
      </div>`;
    })
    .join(""));
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

  localStorage.setItem("data", JSON.stringify(basket));
  updateItem(prodId);
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

    // if (ifExists.itemQuantity === 0) {
    //     let removalId = ifExists.id;
    //     let removeIndex = basket.findIndex((item) => {
    //         return item.id === removalId;
    //     });
    //     basket.splice(removeIndex, 1);
    // }

    // let { id, itemQuantity } = ifExists;
    // update(id, itemQuantity);
  }

  updateItem(prodId);
  basket = basket.filter((x)=> x.itemQuantity != 0 );
  localStorage.setItem("data", JSON.stringify(basket));
        
  // console.log(basket);
};

let calculateCart = () => {
  const total = basket.reduce((acc, x) => {
    return acc + x.itemQuantity;
  }, 0);
  const cartQuantity = document.getElementById("cartQuantity");
  cartQuantity.innerHTML = total;
};

// let update = (id, quantity) => {
//     let elem = document.getElementById(id);
//     elem.innerHTML = quantity;
// };

let updateItem = (prodId) => {
  let ifExists = basket.find((item) => {
    return item.id === prodId;
  });
  // console.log(ifExists.itemQuantity);
  let quantity = ifExists.itemQuantity;
  let elem = document.getElementById(prodId);
  elem.innerHTML = quantity;
  calculateCart();
};

generateItems();
calculateCart();