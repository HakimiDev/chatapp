<template>
    <Transition>
        <div v-show="show" class="min-w-full h-96">
            <div class="bg-primary-300 min-w-full h-full overflow-y-auto overflow-x-hidden relative">
                <header ref="header" class="min-w-full flex border-b-[1px] border-gray-400">
                    <ul class="min-w-full grid grid-cols-5">
                        <li v-for="(category, index) in Object.keys(emojis)" :key="index" @click="selectCategory(category)"
                            :class="selectedCategory === category ? ' bg-primary-200' : 'bg-secondary-50 hover:bg-primary-200'"
                            class="text-lg p-1 px-5 m-1 me-2 flex justify-center items-center cursor-pointer rounded-full transition duration-500">
                            <h2>{{ emojis[category].icon }}</h2>
                        </li>
                    </ul>
                </header>

                <main>
                    <div v-if="emojis[selectedCategory].emojis.length">
                        <ul class="min-w-full grid grid-cols-8 max-xs:grid-cols-6 my-1">
                            <li @click="appendEmoji(emoji)" v-for="(emoji, index) in emojis[selectedCategory].emojis"
                                :key="index"
                                class="text-3xl p-1 mx-1 flex justify-center items-center cursor-pointer rounded-full transition duration-500 hover:bg-secondary-50">
                                <div class="flex justify-center items-center" v-html="emoji.custom"></div>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="min-w-full min-h-full text-center p-20">
                        <p class="text-3xl">No emojis!</p>
                    </div>
                </main>


            </div>
            <footer class=" sticky bottom-0 min-w-full bg-primary-100 p-2">
                <div class="min-w-full flex flex-row justify-end items-center bg-primary-100">
                    <div @click="removeEmoji()"
                        class="cursor-pointer rounded-full p-2 transition duration-500 hover:bg-secondary-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                        </svg>
                    </div>
                </div>
            </footer>
        </div>
    </Transition>
</template>

<script setup>
import { onUpdated, ref } from 'vue';
import { emojis, lastUsedEmojis, onLastUsedEmojisChange } from '../stores/emojis/index';

const props = defineProps(['show', 'onAppend', 'onRemove']);

const appendEmoji = (emoji) => {
    props.onAppend(emoji.native);
    if (lastUsedEmojis.value.length >= 20) lastUsedEmojis.value.pop();
    if (!lastUsedEmojis.value.find(e => e.native === emoji.native)) lastUsedEmojis.value.unshift(emoji);
    onLastUsedEmojisChange();
};

const removeEmoji = (emojiLength = 1) => {
    props.onRemove(emojiLength);
};

const selectedCategory = ref('Smileys & Emotion');
const selectCategory = (category) => {
    selectedCategory.value = category;
};

const header = ref(null);
onUpdated(() => {
    header.value.scrollIntoView();
});

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

<style>
::-webkit-scrollbar {
    width: 0.1rem;
}

::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 0.25rem;
}

::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 0.25rem;
}

.emoji {
    display: inline-block;
    width: 33px;
    height: 100%;
    padding: 2px;
}
</style>
