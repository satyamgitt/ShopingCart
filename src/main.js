let main = document.getElementById("main");
let product_count = document.getElementById("product_count");
let input = document.getElementById("input")
let error = document.getElementById("error")
// console.log(form);



let basket = JSON.parse(localStorage.getItem("key")) || []

// search functionality
input.addEventListener("keyup", (e) => {
  let searchValue = e.target.value.toLowerCase();

  let op = shopItems.filter((value) => {
    return value.name.toLowerCase().includes(searchValue)
  })
  getData(op);
})





let getData = (shopItems) => {
  return (main.innerHTML = shopItems
    .map((data) => {
      let { id, name, price, desc, img } = data;

      let searchId = basket.find((value) => value.id === id) || []

      let {item} = searchId
      // console.log(searchId);

      return `
    
    <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="" />
    <div class="details">
      <h3>${name}</h3>
      ${desc}
      <div class="last">
        <div class="amount">$ ${price}</div>
        <div class="btn">
          <h3  onClick="increment(${id})">+</h3>
          <h3 id=${id}>
          ${item === undefined ? 0 : item}
          </h3>
          <h3  onClick="decrement(${id})">-</h3>
        </div>
      </div>
    </div>
  </div>

  
    
    `;
    })
    .join(""));
};

getData(shopItems);




let increment = (id) => {
  let searchId = basket.find((value) => value.id === id);
  if (searchId === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    searchId.item++;
  }
  update(id);
  localStorage.setItem("key", JSON.stringify(basket))
};

let decrement = (id) => {
  let searchId = basket.find((value) => value.id === id)

  if (searchId === undefined) return;
  else if (searchId.item === 0) return;
  else {
    searchId.item--;
  }


  update(id);
  basket = basket.filter((value) => value.item !== 0)
  localStorage.setItem("key", JSON.stringify(basket))


};



let update = (id) => {
  let searchId = basket.find((value) => value.id === id) || []
  let update = document.getElementById(id);
  update.innerHTML = searchId.item;
  calculateItems()
};


let calculateItems = () => {

  let item = basket.map((value) => value.item)
  document.getElementById("product_count").innerHTML = item.reduce((pre, curr) => { return pre + curr }, 0)


}

calculateItems()


