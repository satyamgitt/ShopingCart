
let lable = document.getElementById("lable")
let shoped = document.getElementById("shoped")

let basket = JSON.parse(localStorage.getItem("key")) || []

let calculateItems = () => {
    let item = basket.map((value) => value.item)
    document.getElementById("product_count").innerHTML = item.reduce((pre, curr) => { return pre + curr }, 0)
}
calculateItems()

// console.log(shopItems);

let getCardItem = () => {
    if (basket.length !== 0) {

        return (

            shoped.innerHTML = basket.map((x) => {

                let { id, item } = x

                let search = shopItems.find((y) => y.id === id)

                let { img, name, price } = search
                return `
                <div class="cart_items">
                <img width="100" src=${img} alt="" /> 
                <div class="details">
                
                <div class="item_price_X">
                <h2 class="item_price">
                <p>${name}</p>
                <p class="cart_item_price">$${price}</p>
                </h2>
                <p  onClick="removeItem(${id})">X</p>
                </div>
                <div class="item_btn">
                
                <h3 onClick="increment(${id})">+</h3>
                      <h3 id=${id}>
                    ${item}
                      </h3>
                      <h3  onClick="decrement(${id})">-</h3>
                
                </div>
                <h3>$ ${item * price}</h3>
                </div>                                                                                   
               
                </div>
                
                `




            }).join('')

        )

    }
    else {
        shoped.innerHTML = ""
        lable.innerHTML = `
        <h2>Cart is Empty</h2>
       <a href="index.html">
       <button class="Homebtn">Continue Shoping</button>
       </a>
        
        
        `
    }
}
getCardItem()


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
    getCardItem()
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
    getCardItem()
    localStorage.setItem("key", JSON.stringify(basket))


};



let update = (id) => {
    let searchId = basket.find((value) => value.id === id) || []
    let update = document.getElementById(id);
    update.innerHTML = searchId.item;
    calculateItems()
    totalAmount()
};



let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id)
    localStorage.setItem("key", JSON.stringify(basket))
    getCardItem()
    calculateItems()
    totalAmount()
}


let totalAmount = () => {
    if (basket.length !== 0) {
        let total = basket.map((value) => {
            let search = shopItems.find((x) => x.id === value.id)
            return value.item * search.price
        }).reduce((x, y) => x + y, 0)

        return (
            
          lable.innerHTML =  `
            <h2>Total Amount : $${total}</h2>
            <button class="checkout">Checkout</button>
            <button class="removeAll" onClick="removeAll()">Clear Cart</button>
            
            
            `
        )


    } else {

        return
    }
}
totalAmount() 


let removeAll = ()=>{
    basket = []
    localStorage.setItem("key", JSON.stringify(basket))
    getCardItem()
    calculateItems()
}
