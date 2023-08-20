let isCouponAdded = false;
let couponName = null;
function addToCart(name, price) {
  const empty = document.getElementById("empty");
  const badge = document.getElementById("cart-count");
  const calculationEntry = document.getElementById("cart");
  const count = calculationEntry.childElementCount;
  if (count > 0) {
    badge.classList.remove("hidden");
    badge.innerText = count;
  }

  empty.classList.add("hidden");
  addCartEntry(name);
  const totalPrice = getTextElementValueById("total-price");
  const inTotal = totalPrice + price;
  discountedAmount = (inTotal * 0.2).toFixed(2);
  setTextElementValueById("total-price", inTotal.toFixed(2));
  if (isCouponAdded) {
    setTextElementValueById("discount", discountedAmount);
    setTextElementValueById("total", (inTotal - discountedAmount).toFixed(2));
  } else {
    setTextElementValueById("total", inTotal.toFixed(2));
  }
}

function couponSubmit() {
  const coupon = getInputFieldValueById("coupon");
  const totalPrice = getTextElementValueById("total-price");

  console.log(coupon);
  if (coupon === "SELL200") {
    if (totalPrice < 200) {
      const error = document.getElementById("error");
      const p = document.createElement("p");
      error.innerHTML = `                <p class="text-sm text-red-400">Min requirements not met.</p>
    `;
      error.appendChild(p);
    } else {
      const totalPrice = getTextElementValueById("total-price");
      const coupon = document.getElementById("couponName");
      couponName = "SELL200";
      coupon.classList.remove("hidden");
      coupon.innerText = "SELL200";
      isCouponAdded = true;
      discountedAmount = (totalPrice * 0.2).toFixed(2);

      setTextElementValueById("discount", discountedAmount);
      setTextElementValueById(
        "total",
        (totalPrice - discountedAmount).toFixed(2)
      );

      const error = document.getElementById("error");
      const p = document.createElement("p");
      error.innerHTML = `                <p class="text-sm text-green-400">Coupon added successfully.</p>
    `;
      error.appendChild(p);
    }
  } else {
    const error = document.getElementById("error");
    const p = document.createElement("p");
    error.innerHTML = `                <p class="text-sm text-red-400">Coupon is not valid. Try Another.</p>
    `;
    error.appendChild(p);
  }
}
function addCartEntry(name) {
  const calculationEntry = document.getElementById("cart");

  const count = calculationEntry.childElementCount;

  const p = document.createElement("p");
  p.classList.add("my-4");
  p.classList.add("font-semibold");
  p.innerHTML = `${count}. ${name} `;

  calculationEntry.appendChild(p);
}
function showMore() {
  const show = document.getElementById("show-more");
  const moreItems = document.getElementById("hidden");
  show.classList.add("hidden");
  moreItems.classList.remove("hidden");
}
function clearTheCart() {
  isCouponAdded = false;
  setTextElementValueById("total-price", 0);
  setTextElementValueById("discount", 0);
  setTextElementValueById("total", 0);
  const error = document.getElementById("error");
  const badge = document.getElementById("cart-count");

  const cart = document.getElementById("cart");
  const coupon = document.getElementById("couponName");
  coupon.classList.add("hidden");
  badge.classList.add("hidden");
  error.innerHTML = ``;
  cart.innerHTML = `<p id="empty" class="text-red-500 text-xl font-bold">
  Your Cart Is Empty Now.
</p>`;
}
