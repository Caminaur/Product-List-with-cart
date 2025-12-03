import { formatNumber } from "../utils/formatNumber";
import { PlusIcon, MinusIcon } from "@/assets/images/SVGIcons";
export const Card = (props) => {
  const { product, addToCart, quantity, decrementItem } = props;

  return (
    <article className="card">
      <figure className="relative w-full ">
        <picture>
          <source media="(min-width: 1440px)" srcSet={product.imageDesktop} />
          <source media="(min-width: 376px)" srcSet={product.imageTablet} />
          <img
            className="rounded-2xl w-full "
            src={product.imageMobile}
            alt={`Product image ${product.name}`}
          />
        </picture>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product.name)}
            className="absolute font-semibold w-38 left-1/2 -bottom-6 -translate-x-1/2 flex gap-2 bg-rose-50 p-3 rounded-full border-rose-300 border-2
            cursor-pointer hover:text-red hover:border-red duration-300"
            aria-label="Add Item to Cart"
          >
            <img src="./images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 flex justify-between items-center w-38 bg-red py-3 px-4 rounded-full">
            <button
              className="cursor-pointer"
              onClick={() => decrementItem(product.name)}
              aria-label={`Decrease quantity of ${product.name}`}
            >
              <MinusIcon className="w-6 h-6 text-rose-50 border-white border-2 rounded-full hover:text-red hover:bg-rose-50 p-1 duration-300" />
            </button>
            <p className="text-rose-50">{quantity}</p>
            <button
              className="cursor-pointer rounded-full"
              aria-label="Add one more Item to Cart"
              onClick={() => addToCart(product.name)}
            >
              <PlusIcon className="w-6 h-6 text-rose-50 border-white border-2 rounded-full hover:text-red hover:bg-rose-50 p-1 duration-300" />
            </button>
            <p className="sr-only" aria-live="polite">
              {`Quantity for ${product.name}: ${quantity}`}
            </p>
          </div>
        )}
      </figure>
      <div className="flex flex-col gap-1 my-6 min-w-0">
        <p className="text-sm">{product.category}</p>
        <h3 className="max-w-2/3 ellipsis">{product.name}</h3>
        <p className="text-red font-semibold">
          $ {formatNumber(product.price)}
        </p>
      </div>
    </article>
  );
};
