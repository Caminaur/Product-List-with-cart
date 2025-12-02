import clsx from "clsx";
import React from "react";
import { formatNumber } from "../utils/formatNumber";
export const Cart = (props) => {
  const { count, cart, removeItem } = props;
  const getItemTotal = (quantity, price) => {
    return parseFloat(price) * parseFloat(quantity); // meter un format
  };
  const getTotal = () =>
    formatNumber(
      cart.reduce(
        (acc, item) => acc + getItemTotal(item.quantity, item.price),
        0
      )
    );
  return (
    <div
      className={clsx(
        "w-full bg-white flex flex-col p-8 shadow-lg rounded-lg gap-2",
        {
          "items-center gap-4 text-center aspect-square justify-between":
            count === 0,
          "": count > 0,
        }
      )}
    >
      <h2 className="text-2xl font-bold text-red self-start mb-8">
        Your Cart ({count})
      </h2>

      {count === 0 ? (
        <>
          <img
            className="w-40 h-auto"
            src="./images/illustration-empty-cart.svg"
            alt=""
            aria-label="Empty Cart image"
          />
          <p className="text-rose-500 font-bold">
            Your added items will appear here
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-start items-start gap-3">
          {cart.map((item, id) => (
            <React.Fragment key={item.name}>
              <div className="flex justify-between w-full">
                <div className="flex w-full flex-col gap-1">
                  <h3
                    className="text-rose-900 font-semibold"
                    id={`item-name-${id}`}
                  >
                    {item.name}
                  </h3>
                  <div
                    className="flex font-semibold gap-2.5"
                    id={`item-info-${id}`}
                  >
                    <p className="text-red">{item.quantity}x</p>
                    <p className="text-rose-300">
                      @ ${formatNumber(item.price)}
                    </p>
                    <p className="text-rose-500">
                      ${formatNumber(getItemTotal(item.quantity, item.price))}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.name)}
                  className="rounded-2xl border-2 border-rose-300 h-6 p-0.5 flex items-center justify-center"
                  aria-label={`Remove ${item.name} from cart`}
                  aria-describedby={`item-info-${id}`}
                >
                  <img
                    src="./images/icon-remove-item.svg"
                    alt=""
                    className="h-4 w-4"
                  />
                </button>
              </div>
              <div
                className="h-px bg-rose-300 w-full opacity-30"
                aria-hidden="true"
              ></div>
            </React.Fragment>
          ))}
        </div>
      )}

      {count === 0 ? (
        ""
      ) : (
        <>
          <div className="flex justify-between py-4 items-center">
            <p className="text-rose-500 font-semibold">Order Total </p>
            <p className="text-rose-900 font-bold text-3xl">${getTotal()}</p>
          </div>
          <div className="flex items-start justify-center bg-rose-50 p-2 rounded-md my-6">
            <img src="./images/icon-carbon-neutral.svg" alt="" />
            <h3 className="text-rose-900">
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </h3>
          </div>
          <button
            className="flex justify-center items-center bg-red py-3 px-4 rounded-full text-rose-50 text-xl"
            aria-label={`Confirm order, ${count} items, total $${getTotal()}`}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
};
