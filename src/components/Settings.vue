<template>
    <div @click.self="toggleShow" :class="show ? 'bottom-0' : 'bottom-[-100%]'"
        class="overflow-hidden flex justify-start items-end fixed z-20 h-screen w-full bg-black/50">
        <div :class="show ? 'bottom-0' : 'bottom-[-100%]'"
            class="min-w-full h-1/2 bg-primary-100 fixed transform transition-start duration-500 rounded-t-lg p-2">
            <div class="min-w-full flex justify-end items-center px-4 py-3">
                <div @click="toggleShow" class="cursor-pointer rounded-full transition duration-300 hover:bg-primary-500 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <ul class="font-bold text-xl">
                <li
                    class="flex flex-row justify-center items-center p-2 border-b-[1px] border-primary-500 cursor-pointer rounded transition duration-300 hover:bg-primary-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="ms-3">Profile</span>
                </li>
                <li
                    class="flex flex-row justify-center items-center p-2 mt-5 border-b-[1px] border-primary-500 cursor-pointer rounded transition duration-300 hover:bg-primary-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>

                    <span class="ms-3">Profile</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
defineProps(['show', 'toggleShow']);
</script>