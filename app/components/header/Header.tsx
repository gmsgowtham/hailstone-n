const Header = () => (
  <header className="w-full top-0 left-0 px-4 py-4 md:px-12 bg-blue-500 shadow-md">
    <div className="flex items-center justify-between">
      <a href="/" className="block font-medium text-2xl md:text-3xl text-gray-900 ">
        Hailstone {"{N}"}
      </a>
    </div>
  </header>
);

export default Header;
