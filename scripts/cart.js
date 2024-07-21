export let cart =JSON.parse(localStorage.getItem('cart'))
|| [];

function saveToStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function add_to_cart(button_pointer)
{
  const productID = button_pointer.dataset.productId;
      let matchingItem;
      cart.forEach((item)=>
      {
        if(item.productID === productID)
        matchingItem=item;
      })
      if(matchingItem)
       { matchingItem.quantity++;}
        else{
          cart.push({
            deliveryOptionId:'1',
            productID : productID,
            quantity:1,
          });
        }
  saveToStorage();
}

export function cart_quantity()
{
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
      });
    document.querySelector('.cart-quantity').innerHTML=cartQuantity;
}

export function remove_from_cart(itemID)
{
  let index;
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].productID===itemID)
            index=i;
        }
        cart.splice(index,1);
  saveToStorage();
}


export function updateDeliveryOption(deliveryOptionId,productID)
{
  let matchingItem;
  cart.forEach((items)=>{
    if(items.productID===productID)
    matchingItem=items;
  })
  matchingItem.deliveryOptionId=deliveryOptionId;

  saveToStorage(); 
}