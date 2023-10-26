export function ButtonPrimary({ label = "Button" }) {
  return (
    <button className="min-w-lg bg-gradientBtn hover:bg-gradientBtnHover hover:scale-105 font-semibold text-font py-2 px-6 border border-transparent rounded-lg hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40 transition">
      {label}
    </button>
  );
}

export function ButtonSecondary({ label = "Button" }) {
  return (
    <button className="bg-transparent hover:bg-gradientBtnHover hover:text-font hover:scale-105 font-semibold text-font-dark py-2 px-4 border border-primary rounded-lg hover:shadow hover:shadow-primary-light/90 dark:hover:shadow-primary-light/40 transition">
      {label}
    </button>
  );
}
