<template>
    <MinMune type="1" :show="showSettings" :toggleShow="toogleShowSettings" />
    <header class="w-full fixed top-0 flex items-center z-10">
        <div class="min-w-full bg-primary-100 flex justify-between items-center p-4 rounded-b">
            <div class="text-xl max-xs:text-lg font-bold">
                <h2>Chat<span class=" text-orange-300">App</span></h2>
            </div>
            <div @click="toogleShowSettings" class="w-fit cursor-pointer transition duration-500 hover:-rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';

import MinMune from '../components/MinMune.vue';

const showSettings = ref(false);
const toogleShowSettings = () => showSettings.value = !showSettings.value;

</script>
