export function ButtonPrimary({ label = "Button", className }) {
  return (
    <button
      className={`${className} min-w-lg  bg-gradientBtn hover:bg-gradientBtnHover hover:scale-105 font-semibold text-font py-2 px-6 border border-transparent rounded-lg hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40 transition`}
    >
      {label}
    </button>
  );
}

export function ButtonSecondary({ label = "Button", className }) {
  return (
    <button
      className={`${className} min-w-lg bg-transparent hover:bg-gradientBtnHover text-font hover:scale-105 font-semibold py-2 px-4 border border-primary rounded-lg hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40 transition`}
    >
      {label}
    </button>
  );
}
