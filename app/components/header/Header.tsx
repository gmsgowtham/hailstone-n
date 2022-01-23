import classNames from "classnames";

type HeaderProps = {
  sticky: boolean;
};

const Header = ({ sticky = false }: HeaderProps) => {
  const dynamicClasses = classNames({ sticky: sticky });
  return (
    <header
      className={`w-full top-0 left-0 px-4 py-4 md:px-12 bg-gray-50 shadow-md ${dynamicClasses}`}
    >
      <div className="flex items-center justify-between">
        <a
          href="/"
          className="block font-medium text-2xl md:text-3xl text-gray-800"
        >
          Hailstone {"{N}"}
        </a>
      </div>
    </header>
  );
};

export default Header;
