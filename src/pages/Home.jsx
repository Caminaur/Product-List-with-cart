import { useState } from "react";
import { Card } from "../Components/Card";
import { products } from "../data/products";
import { Cart } from "../Components/Cart";

function Home() {
  const [cart, setCart] = useState([]);

  const getCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const getItemAmount = (name) =>
    cart.find((a) => a.name === name)?.quantity ?? 0;

  const handleAddToCart = (productName) => {
    const product = products.find((p) => p.name === productName);
    const price = product?.price ?? 0;

    // verify if product in cart
    let newProduct = cart.find((p) => p.name === productName);
    if (!newProduct) {
      // new product
      newProduct = { name: productName, price: price, quantity: 1 };
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
      <Cart count={getCount()} cart={cart} removeItem={removeCartItem} />
    </div>
  );
}

export default Home;
