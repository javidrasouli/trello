<template>
  <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-2">
    <div>
      <form class="grid grid-cols-1 grid-rows-1 w-3/4 lg:w-1/2 mb-5 m-auto">
        <input
          type="text"
          placeholder="username"
          class=" mr-1 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700"
        />
        <input
          type="email"
          placeholder="email"
          class=" mr-1 my-2 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700"
        />
        <input
          type="password"
          placeholder="password"
          class=" mr-1 mb-2 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700"
        />
        <button
          class=" bg-gradient-to-r hover:from-teal-400 focus:outline-none outline-none hover:to-blue-500 h-10 self-center hover:text-gray-300 rounded-lg p-2 bg-transparent border border-blue-500"
        >
          Add
        </button>
      </form>
    </div>
    <div>
      <table class="border-separate border-2 border-gray-500 m-auto w-full">
        <thead>
          <tr>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">
              username
            </th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">email</th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 px-4 py-2">javid</td>
            <td class="border border-gray-400 px-4 py-2">javid99.rasouli@gmail.com</td>
            <td class="border border-gray-400 px-4 py-2">javid1383</td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Ohio</td>
            <td class="border border-gray-400 px-4 py-2">Columbus</td>
          </tr>
          <tr>
            <td class="border border-gray-400 px-4 py-2">Michigan</td>
            <td class="border border-gray-400 px-4 py-2">Detroit</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
