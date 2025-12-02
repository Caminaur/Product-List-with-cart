import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import { products } from "../data/products";
import { Cart } from "../Components/Cart";
import { formatNumber } from "../utils/formatNumber";
import { getItemTotal } from "../utils/getItemTotal";
import { OrderConfirmedModal } from "../Components/OrderConfirmedModal";

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
        <div className="lg:basis-3/4">
          <h1 className="text-3xl mb-8">Desserts</h1>
          <div className="w-full flex flex-col flex-wrap gap-8 sm:flex-row items-center">
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
          </div>
        </div>
        <Cart
          count={getCount()}
          cart={cart}
          removeItem={removeCartItem}
          orderConfirmed={handleConfirmOrder}
          total={getTotal()}
        />
        {orderConfirmed ? (
          <OrderConfirmedModal
            cart={cart}
            total={getTotal()}
            handleStartNewOrder={handleStartNewOrder}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Home;
