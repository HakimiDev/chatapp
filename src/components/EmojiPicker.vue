<template>
    <Transition>
        <div v-show="show" class="min-w-full h-80">
            <div class="bg-primary-300 min-w-full h-full overflow-y-auto overflow-x-hidden relative">
                <header ref="header" class="min-w-full flex border-b-[1px] border-gray-400">
                    <ul class="min-w-full grid grid-cols-8 max-xs:grid-cols-4">
                        <li v-for="(category, index) in Object.keys(emojis)" :key="index" @click="selectCategory(category)"
                            :class="selectedCategory === category ? ' bg-primary-200' : 'bg-secondary-50 hover:bg-primary-200'"
                            class="text-lg p-1 px-5 m-2 flex justify-center items-center cursor-pointer rounded-full transition duration-500">
                            <h2>{{ emojis[category].icon }}</h2>
                        </li>
                    </ul>
                </header>

                <main>
                    <div v-if="emojis[selectedCategory].emojis.length">
                        <ul class="min-w-full grid grid-cols-9 max-xs:grid-cols-6 my-1">
                            <li @click="append(emoji)" v-for="(emoji, index) in emojis[selectedCategory].emojis"
                                :key="index"
                                class="text-3xl p-1 mx-1 flex justify-center items-center cursor-pointer rounded-full transition duration-500 hover:bg-secondary-50">
                                <div class="flex justify-center items-center" v-html="emoji"></div>
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
                    <div @click="remove"
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

defineProps(['show', 'append', 'remove']);

const selectedCategory = ref('people');
const selectCategory = (category) => {
    selectedCategory.value = category;
};

const header = ref(null);
onUpdated(() => {
    selectedCategory.value = 'people';
    setTimeout(() => {
        header.value.scrollIntoView();
    }, 200);
});

const emojis = ref({
    people: {
        icon: "😀",
        emojis: [],
    },
    nature: {
        icon: "🙈",
        emojis: [],
    },
    food: {
        icon: "🍎",
        emojis: [],
    },
    activity: {
        icon: "🏄",
        emojis: [],
    },
    travel: {
        icon: "✈️",
        emojis: [],
    },
    objects: {
        icon: "💡",
        emojis: [],
    },
    symbols: {
        icon: "💔",
        emojis: [],
    },
    flags: {
        icon: "🏳️",
        emojis: [],
    },
});

for (let i = 0x1F300; i <= 0x1F9FF; i++) {
    const category = getEmojiCategory(i);
    if (category) {
        let emoji = twemoji.parse(String.fromCodePoint(i));
        //emoji = `<img ${emoji.substring(19, emoji.length - 2)} class=' inline-block p-1' />`;
        emojis.value[category].emojis.push(emoji);
    }
}

function getEmojiCategory(codePoint) {
    if (codePoint >= 0x1F600 && codePoint <= 0x1F64F) {
        return 'people';
    } else if (codePoint >= 0x1F400 && codePoint <= 0x1F4F0) {
        return 'nature';
    } else if (codePoint >= 0x1F300 && codePoint <= 0x1F35F) {
        return 'food';
    } else if (codePoint >= 0x1F680 && codePoint <= 0x1F6C0) {
        return 'activity';
    } else if (codePoint >= 0x1F680 && codePoint <= 0x1F6C0) {
        return 'travel';
    } else if (codePoint >= 0x1F680 && codePoint <= 0x1F6C0) {
        return 'objects';
    } else if (codePoint >= 0x1F680 && codePoint <= 0x1F6C0) {
        return 'symbols';
    } else if (codePoint >= 0x1F680 && codePoint <= 0x1F6C0) {
        return 'flags';
    } else {
        return null;
    }
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
    width: 5vh;
    height: 100%;
    padding: 2px;
}
</style>
