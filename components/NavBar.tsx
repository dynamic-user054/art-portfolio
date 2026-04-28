
export const NavBar = () => {
  return (
    <div className="bg-white text-black fixed right-0 top-0 h-full flex flex-col ">
      <button>Dark Mode</button>
      <button>gallery</button>
      <button>about</button>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white dark:after:border-gray-600"></div>

        <span className="ml-3 text-sm font-medium text-black ">Dark Mode</span>
      </label>

    </div>
  )
}
