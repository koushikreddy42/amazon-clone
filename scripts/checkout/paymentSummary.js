import {cart,cart_quantity} from '../cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js';
export function renderPaymentSummary(){
    let totalProductPrice = 0;
    let totalShippingPrice = 0;
    cart.forEach((item)=>{
        let productID = item.productID;
        let product = getProduct(productID);
        let deliveryOption = getDeliveryOption(item.deliveryOptionId);
        totalProductPrice+=product.priceCents * item.quantity;
        totalShippingPrice+=deliveryOption.priceCents;
    });
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity+=item.quantity;
      });
    const totalBeforeTaxCents = totalProductPrice+totalShippingPrice;
    const taxCents = totalBeforeTaxCents* 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML=`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${(totalProductPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(totalShippingPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML;

    document.querySelector('.checkout-header-middle-section').innerHTML=
    `
    Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)
    `
}