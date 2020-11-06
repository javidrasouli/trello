<template>
  <div class="grid grid-rows-1 grid-cols-1">
    <form class="w-full md:w-1/3 m-auto">
      <input
        type="text"
        placeholder="Name"
        class="block bg-gradient-to-r from-red-500 focus:bg-gradient-to-r focus:from-purple-400 text-gray-700 w-full p-2 rounded-xl outline-none placeholder-green-200"
      />
      <textarea
        name=""
        id=""
        rows="10"
        placeholder="description"
        class="my-3 block resize bg-gradient-to-r from-red-500 focus:bg-gradient-to-r focus:from-purple-400 text-gray-700 w-full p-2 rounded-xl outline-none placeholder-green-200"
      ></textarea>
      <button
        type="submit"
        class="w-full block bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-r hover:from-red-500 text-gray-400 font-semibold px-4 py-2 rounded focus:outline-none"
      >
        create
      </button>
    </form>
  </div>
</template>
