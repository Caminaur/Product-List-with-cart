import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import { products } from "../data/products";
import { Cart } from "../Components/Cart";
import React from "react";
import { formatNumber } from "../utils/formatNumber";
import { getItemTotal } from "../utils/getItemTotal";

function Home() {
  const [cart, setCart] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (orderConfirmed) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [orderConfirmed]);

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    setCart([]);
    setOrderConfirmed(false);
  };

  const getTotal = () =>
    formatNumber(
      cart.reduce(
        (acc, item) => acc + getItemTotal(item.quantity, item.price),
        0
      )
    );

  const getCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const getItemAmount = (name) =>
    cart.find((a) => a.name === name)?.quantity ?? 0;

  const handleAddToCart = (productName) => {
    const product = products.find((p) => p.name === productName);
    const price = product?.price ?? 0;
    const thumbnail = product.imageThumbnail;

    // verify if product in cart
    let newProduct = cart.find((p) => p.name === productName);
    if (!newProduct) {
      // new product
      newProduct = {
        name: productName,
        price: price,
        quantity: 1,
        thumbnail: thumbnail,
      };
      setCart((prev) => [...prev, newProduct]);
    }
    // edit old one
    else {
      setCart((prev) =>
        prev.map((item) => {
          if (item.name === productName) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        })
      );
    }
  };

  const decrementItem = (productName) => {
    const currentItem = cart.find((d) => d.name === productName);
    if (currentItem.quantity === 1) {
      setCart((prevCart) => prevCart.filter((w) => w.name !== productName));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const removeCartItem = (name) => {
    setCart((prevCart) => prevCart.filter((p) => p.name !== name));
  };

  return (
    <>
      <div className="container">
        <h1 className="text-3xl">Desserts</h1>
        {products.map((product) => {
          return (
            <Card
              key={product.name}
              product={product}
              quantity={getItemAmount(product.name)}
              addToCart={handleAddToCart}
              decrementItem={decrementItem}
            />
          );
        })}
        <Cart
          count={getCount()}
          cart={cart}
          removeItem={removeCartItem}
          orderConfirmed={handleConfirmOrder}
          total={getTotal()}
        />
        {orderConfirmed ? (
          <>
            <div className="h-screen w-screen fixed top-0 left-0 bg-black/40"></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-confirmed-title"
              aria-describedby="order-confirmed-description"
              className="h-4/5 w-full bg-rose-50 rounded-t-2xl fixed left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-start p-4 gap-6"
            >
              <img
                src="/images/icon-order-confirmed.svg"
                alt=""
                aria-hidden="true"
              />
              <div>
                <h2
                  id="order-confirmed-title"
                  className="text-3xl font-bold text-shadow-rose-900 pr-18 mb-2"
                >
                  Order Confirmed
                </h2>
                <h4 className="text-rose-500" id="order-confirmed-description">
                  We hope you enjoy your food!
                </h4>
              </div>
              <div className="w-full bg-rose-100 rounded-md">
                <div
                  className="overflow-scroll max-h-60 px-4"
                  role="list"
                  aria-label="Order items"
                >
                  {cart.map((item, id) => (
                    <React.Fragment key={item.name}>
                      <div
                        className="flex justify-between py-4 gap-2 border-b-rose-300 border-b"
                        role="listitem"
                      >
                        <img
                          className="h-12 rounded-md"
                          src={item.thumbnail}
                          alt=""
                        />
                        <div className="flex flex-col w-full justify-between gap-1">
                          <h3
                            className="text-rose-900 font-semibold text-sm"
                            id={`item-name-${id}`}
                          >
                            {item.name}
                          </h3>
                          <div
                            className="flex font-semibold gap-2.5 text-sm"
                            id={`item-info-${id}`}
                          >
                            <p className="text-red text-sm">{item.quantity}x</p>
                            <p className="text-rose-300 text-sm">
                              @ ${formatNumber(item.price)}
                            </p>
                          </div>
                        </div>
                        <p className="text-rose-900 font-semibold">
                          $
                          {formatNumber(
                            getItemTotal(item.quantity, item.price)
                          )}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-between gap-2 w-full p-4 bg-rose-100 rounded-md items-center">
                  <p className="text-rose-500 font-semibold">Order Total </p>
                  <p className="text-rose-900 font-bold text-3xl">
                    ${getTotal()}
                  </p>
                </div>
              </div>
              <button
                className="flex w-full justify-center items-center bg-red py-3 px-4 rounded-full text-rose-50 text-md mt-auto"
                onClick={() => handleStartNewOrder()}
                aria-label="Start a new order"
              >
                Start New Order
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Home;
