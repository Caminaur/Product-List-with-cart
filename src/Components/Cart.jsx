import clsx from "clsx";
export const Cart = (props) => {
  const { count, cartItems } = props;
  const getItemTotal = (quantity, price) => {
    return parseFloat(price) * parseFloat(quantity); // meter un format
  };

  const getTotal = () => {
    let total = 0;

    for (const item in cartItems) {
      if (!Object.hasOwn(cartItems, item)) continue;

      const element = cartItems[item];
      total += getItemTotal(element.quantity, element.price);
    }
    return total;
  };
  return (
    <div
      className={clsx(
        "w-full bg-white flex flex-col p-6 shadow-lg rounded-lg",
        {
          "items-center gap-4 text-center aspect-square justify-between":
            count === 0,
          "": count > 0,
        }
      )}
    >
      <p className="text-2xl font-bold text-red self-start mb-8">
        Your Cart ({count})
      </p>

      {count === 0 ? (
        <>
          <img
            className="w-40 h-auto"
            src="./images/illustration-empty-cart.svg"
            alt=""
          />
          <p className="text-rose-500 font-bold">
            Your added items will appear here
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-start items-start gap-3">
          {cartItems.map((item, id) => (
            <>
              <div className="flex justify-between w-full" key={id}>
                <div className="flex w-full flex-col gap-1">
                  <p className="text-rose-900 font-semibold">{item.name}</p>
                  <div className="flex font-semibold gap-2.5">
                    <p className="text-red">{item.quantity}x</p>
                    <p className="text-rose-300">@ ${item.price}</p>
                    <p className="text-rose-500">
                      ${getItemTotal(item.quantity, item.price)}
                    </p>
                  </div>
                </div>
                <img
                  className="rounded-2xl border-2 border-rose-300 h-6 p-0.5"
                  src="./images/icon-remove-item.svg"
                  alt=""
                />
              </div>
              <div className="h-px bg-rose-300 w-full opacity-30"></div>
            </>
          ))}
        </div>
      )}

      {count === 0 ? (
        ""
      ) : (
        <div className="flex justify-between py-4 items-center">
          <p className="text-rose-500 font-semibold">Order Total </p>
          <p className="text-rose-900 font-bold text-3xl">${getTotal()}</p>
        </div>
      )}
    </div>
  );
};
