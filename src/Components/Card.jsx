import { useState } from "react";

export const Card = (props) => {
  const { product, addToCart, quantity, decrementItem } = props;

  return (
    <article className="">
      <figure className="relative">
        <picture>
          <source media="(min-width: 1440px)" srcSet={product.imageDesktop} />
          <source media="(min-width: 376px)" srcSet={product.imageTablet} />
          <img className="rounded-2xl" src={product.imageMobile} alt="" />
        </picture>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product.name)}
            className="absolute left-1/2 -bottom-6 -translate-x-1/2 flex gap-2 bg-rose-50 p-3 rounded-full border-rose-300 border-2"
          >
            <img src="./images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 flex justify-between items-center w-38 bg-red py-3 px-4 rounded-full border-rose-300 border-2">
            <img
              className="h-4 w-4"
              src="./images/icon-decrement-quantity.svg"
              alt=""
              onClick={() => decrementItem(product.name)}
            />
            <p className="text-rose-50">{quantity}</p>
            <img
              className="h-4 w-4"
              src="./images/icon-increment-quantity.svg"
              alt=""
              onClick={() => addToCart(product.name)}
            />
          </div>
        )}
      </figure>
      <div className="flex flex-col gap-1 my-6">
        <p className="text-sm">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="text-red font-semibold">$ {product.price}</p>
      </div>
    </article>
  );
};
