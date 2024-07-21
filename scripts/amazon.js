import {products} from '../data/products.js'
import {cart,add_to_cart,cart_quantity} from './cart.js'

let totalhtml='';
products.forEach(
    (product)=>{
        totalhtml+=
        `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>
        `;
    }
);
document.querySelector('.products-grid').innerHTML=totalhtml;

document.querySelectorAll('.add-to-cart-button').forEach(
  (button_pointer)=>{
    button_pointer.addEventListener('click',()=>{
        add_to_cart(button_pointer);
        cart_quantity();
    })
  }
)

cart_quantity();  //because we dont want 0 in cart quantity HTML when page gets refreshed