import React from "react";
import { formatNumber } from "../utils/formatNumber";
import { getItemTotal } from "../utils/getItemTotal";

export const OrderConfirmedModal = (props) => {
  const { cart, total, handleStartNewOrder, handleCloseOrderConfirmedModal } =
    props;
  return (
    <>
      <div
        className="h-screen w-screen fixed top-0 left-0 bg-black/40"
        onClick={() => handleCloseOrderConfirmedModal()}
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirmed-title"
        aria-describedby="order-confirmed-description"
        className="h-4/5 w-full bg-rose-50 rounded-t-2xl fixed left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-start p-4 gap-6 sm:max-w-110 sm:bottom-1/2 sm:translate-y-1/2 sm:rounded-xl sm:p-8 max-w-110 lg:max-h-max"
      >
        <img src="/images/icon-order-confirmed.svg" alt="" aria-hidden="true" />
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
            className="overflow-y-auto max-h-60 px-4 lg:max-h-auto"
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
                  <div className="flex flex-col w-full justify-between gap-1 min-w-0">
                    <h3
                      className="text-rose-900 font-semibold text-sm ellipsis max-w-2/3"
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
                    ${formatNumber(getItemTotal(item.quantity, item.price))}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between gap-2 w-full p-4 bg-rose-100 rounded-md items-center">
            <p className="text-rose-500 font-semibold">Order Total </p>
            <p className="text-rose-900 font-bold text-3xl">${total}</p>
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
  );
};
