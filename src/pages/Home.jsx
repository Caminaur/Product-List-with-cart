import React, { useEffect, useEffectEvent, useState } from "react";
import { Card } from "../Components/Card";
import { products } from "../data/products";

function Home() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleAddToCart = (productName) => {
    const quantity = cart[productName] || 0;
    setCart((prevCart) => ({
      ...prevCart,
      [productName]: quantity + 1,
    }));
  };

  const decrementItem = (productName) => {
    const quantity = cart[productName] || 0;
    setCart((prevCart) => ({
      ...prevCart,
      [productName]: quantity - 1,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-3xl">Desserts</h1>
      {products.map((product) => {
        return (
          <Card
            key={product.name}
            product={product}
            quantity={cart[product.name] || 0}
            addToCart={handleAddToCart}
            decrementItem={decrementItem}
          ></Card>
        );
      })}
    </div>
  );
}

export default Home;
