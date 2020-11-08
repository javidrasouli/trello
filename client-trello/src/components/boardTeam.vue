<template>
  <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-2">
    <div>
      <form class="flex lg:grid lg:grid-cols-1 lg:grid-rows-1 lg:w-1/2 lg:m-auto">
        <input
          type="text"
          placeholder="Person"
          class=" mr-1 bg-teal-400 p-2 rounded-lg outline-none h-10 self-center placeholder-gray-700"
        />
        <select
          id="cars"
          name="cars"
          class=" mx-2 bg-teal-400 p-2 rounded-lg my-3 outline-none h-10 self-center"
        >
          <option value="volvo">....</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab praid</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
        <button
          class=" bg-gradient-to-r hover:from-teal-400 focus:outline-none outline-none hover:to-blue-500 h-10 self-center hover:text-gray-300 rounded-lg p-2 bg-transparent border border-blue-500"
        >
          Add
        </button>
      </form>
    </div>
    <div>
      <table class="border-separate border-2 border-gray-500 w-full">
        <thead>
          <tr>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">
              person
            </th>
            <th class="border border-gray-400 px-4 py-2 text-gray-800">Task</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 px-4 py-2">javid</td>
            <td class="border border-gray-400 px-4 py-2">create page group</td>
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
