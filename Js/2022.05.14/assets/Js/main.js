let addBtn = document.querySelectorAll('.add-basket')

// addBtn.forEach(x => {
//     console.log(parseFloat(x.previousElementSibling.innerText));
// })


isExist();
AddToBasket();

addBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        addBasket(this)


    })
})

function getProduct(fruit) {
    return {
        id: fruit.parentElement.parentElement.dataset.id,
        name: fruit.previousElementSibling.previousElementSibling.innerText,
        src: fruit.parentElement.parentElement.children[0].src,
        count: 1,
        price: parseFloat(fruit.previousElementSibling.innerText)
    }
}

function addBasket(fruit) {
    isExist();
    let basket = JSON.parse(localStorage.getItem('fruitBasket'));
    let basketItem = getProduct(fruit);
    if (basket.find(b => b.id == basketItem.id) == undefined) {
        basket.push(basketItem)
    } else {
        basket.find(b => b.id == basketItem.id).count++;
    }
    localStorage.setItem("fruitBasket", JSON.stringify(basket))
    AddToBasket();
}


function AddToBasket() {
    isExist();
    let basket = JSON.parse(localStorage.getItem('fruitBasket'));
    let totalCount = 0;
    let totalBaketPrice = 0;
    basketItems.innerHTML = "";
    basket.forEach(x => {
        let { id, name, src, count, price } = x
        totalCount += count;
        totalBaketPrice += count * price;
        basketItems.innerHTML +=
            `<tr data-id=${id}>
            <td class="w-25">
              <img src="${src}" class="card-img-top">
            </td>
            <td class="h3">${name}</td>
            <td class="h3">${price} ₼</td>
            <td class="h3 " id="count" ><i class="fa-solid fa-minus minus" style="cursor:pointer;"></i>&nbsp; ${count}&nbsp; <i class="fa-solid fa-plus plus" style="cursor:pointer;"></i>&nbsp;</td>
            <td class="h3">${price*count} ₼</td>
            <td >
                 
                  
                  <i class="fa-solid fa-xmark delete " style="font-size:20px; padding-top:5px; cursor:pointer;"></i>
                   
            </td>
      </tr>`;
    })
    fruitCount.innerText = totalCount;
    total.innerText = totalBaketPrice + ' ' + '₼';
}

let deleteItem = document.querySelectorAll('.delete')
deleteItem.forEach(x => {
    x.addEventListener('click', function() {
        isExist();
        let basket = JSON.parse(localStorage.getItem('fruitBasket'));
        let currentId = x.parentNode.parentNode.dataset.id
        let filtered = basket.filter(b => b.id !== currentId);
        localStorage.setItem("fruitBasket", JSON.stringify(filtered))

        AddToBasket();

    })
})



let minus = document.querySelectorAll('.minus');
let plus = document.querySelectorAll('.plus');


minus.forEach(x => {
    x.addEventListener('click', function() {
        isExist();
        let basket = JSON.parse(localStorage.getItem('fruitBasket'));
        let currentId = x.parentNode.parentNode.dataset.id
        if (basket.find(b => b.id == currentId)) {
            if (basket.find(b => b.id == currentId).count > 0)
                basket.find(b => b.id == currentId).count--;
            else {
                basket.filter(b => b.id !== currentId);
            }
        }
        localStorage.setItem("fruitBasket", JSON.stringify(basket))

        AddToBasket();
    })
})

plus.forEach(x => {
    x.addEventListener('click', function() {
        isExist();

        let basket = JSON.parse(localStorage.getItem('fruitBasket'));
        let currentId = x.parentNode.parentNode.dataset.id
        if (basket.find(b => b.id == currentId)) {
            basket.find(b => b.id == currentId).count++;
        }
        localStorage.setItem("fruitBasket", JSON.stringify(basket))
        AddToBasket();
    })
})





function isExist() {
    if (!localStorage.getItem("fruitBasket")) {
        localStorage.setItem("fruitBasket", JSON.stringify([]))
    }
}