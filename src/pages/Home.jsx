import { useState } from "react";
import { Card } from "../Components/Card";
import { products } from "../data/products";
import { Cart } from "../Components/Cart";

function Home() {
  const [cart, setCart] = useState({});

  const getCartItems = () => {
    return Object.entries(cart).map(([name, quantity]) => {
      const product = products.find((p) => p.name === name);
      const price = product?.price ?? 0;
      return { name: name, quantity: quantity, price: price };
    });
  };

  const getCount = () => {
    if (cart == undefined) return 0;

    let total = 0;
    for (const dessert in cart) {
      const element = cart[dessert];
      if (!Object.hasOwn(cart, dessert)) continue;
      total += element;
    }

    return total;
  };

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
          />
        );
      })}
      <Cart count={getCount()} cartItems={getCartItems()} />
    </div>
  );
}

export default Home;
