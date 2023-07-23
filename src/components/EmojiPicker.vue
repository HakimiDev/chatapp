<template>
    <Transition>
        <div v-show="show" class="min-w-full h-72">
            <div class="bg-primary-300 min-w-full h-full overflow-y-auto overflow-x-hidden">
                <header class="min-w-ful flex justify-center p-1 border-b-[1px] border-gray-400">
                    <h2 class="text-xl font-semibold">Emojis List</h2>
                </header>

                <main>
                    <ul class="grid grid-cols-9">
                        <li v-for="(emoji, index) in emojis" :key="index"
                            class="text-4xl m-1 p-1 flex justify-center items-center cursor-pointer rounded-full transition duration-500 hover:bg-secondary-50">
                            <h2>{{ emoji }}</h2>
                        </li>
                    </ul>
                </main>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps(['show']);
const emojis = ref([]);

for (let i = 0x1F600; i <= 0x1F64F; i++) {
    emojis.value.push(String.fromCodePoint(i));
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: ease;
    transition-duration: 150ms;
    opacity: 1;
    transform: scale(1);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(0);
}
</style>