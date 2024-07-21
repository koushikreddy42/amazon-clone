import {cart,remove_from_cart,updateDeliveryOption} from '../cart.js'
import {products,getProduct} from '../../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js'
export function renderOrderSummary(){
let total_cart_item_container_html = '';
function deliveryOptionhtml(productID,item){
  let total_html='';
  let today = dayjs();
  deliveryOptions.forEach((deliveryOption)=>{
    let pricenum=(deliveryOption.priceCents/100).toFixed(2);
    let pricestring = (deliveryOption.priceCents===0)?'FREE ':`$${pricenum} - `;
    let deliverydate = today.add(deliveryOption.deliveryTime,'days');
    let datestring = deliverydate.format('dddd, MMMM D');
    let isChecked = deliveryOption.id === item.deliveryOptionId;
    total_html+=`
               <div class="delivery-option js-delivery-option"
               data-product-id="${productID}"
               data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                  ${isChecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${productID}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring}Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return total_html;
}


cart.forEach((item)=>{
    let productID=item.productID;
    let matchingItem=getProduct(productID);
    let matchingdeliveryoption=getDeliveryOption(item.deliveryOptionId);
    let today = dayjs();
    let deliverydate = today.add(matchingdeliveryoption.deliveryTime,'days');
    let dateString = deliverydate.format('dddd, MMMM D');
    total_cart_item_container_html+=
    `
    <div class="cart-item-container js-cart-item-container-${productID}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                $${(matchingItem.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-js-delete-link=${productID}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionhtml(productID,item)}
              </div>
            </div>
          </div>
    `
}
)
document.querySelector('.order-summary').innerHTML=total_cart_item_container_html;

document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        let itemID = link.dataset.jsDeleteLink;
        remove_from_cart(itemID);
        let container = document.querySelector(`.js-cart-item-container-${itemID}`);
        container.remove();
        renderPaymentSummary();
    })
})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener(
  'click',()=>{
    let deliveryOptionId = element.dataset.deliveryOptionId;
    let productID=element.dataset.productId;
    if(productID)
    updateDeliveryOption(deliveryOptionId,productID);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}
