function Attribution({ theme = "1" }) {
  const linkColorDark = "text-primary-bright-blue";
  const linkColorBright = "text-gray-700";
  const linkColor = theme === "1" ? linkColorDark : linkColorBright;

  const textColorDark = "text-rose-500";
  const textColorLight = "text-white";
  const textColor = theme === "1" ? textColorDark : textColorLight;

  return (
    <div
      className={`text-md fixed w-full bottom-1 left-0 px-4 text-center max-sm:text-xs ${textColor} transition-colors duration-300 z-50`}
    >
      Challenge by{" "}
      <a
        className={`font-bold text-rose-900 hover:opacity-80 transition-colors duration-300`}
        href="https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        className={`font-bold text-rose-900 hover:opacity-80 transition-colors duration-300`}
        href="https://github.com/Caminaur"
      >
        Julian Caminaur
      </a>
      .
    </div>
  );
}

export default Attribution;
