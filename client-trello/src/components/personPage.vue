<template>
    <div>
        <div class="m-3 lg:grid lg:grid-rows-1 lg:grid-cols-2">
            <form class="w-full md:w-2/3">
                <input type="text" placeholder="username" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input type="email" placeholder="email" class="w-full my-2 bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <input type="text" placeholder="password" class="w-full bg-transparent border-2 border-dashed border-gray-700 p-1 outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:-translate-y-1 focus:scale-110">
                <button class="w-full my-2 p-2 border border-green-400 rounded-md hover:bg-green-500 hover:text-gray-300">Edit</button>
            </form>
            <div class="hidden lg:block bg-orange-300 rounded-lg p-4">
                <h1 class="text-xl">javidRasouli</h1>
                <h2 class="text-blue-400"><span class="text-green-500">email:</span> javid99.rasouli@gmail.com</h2>
                <h2 class="text-purple-700"><span class="text-red-600">pasword:</span> javid1383</h2>
            </div>
        </div>
    </div>
</template>
