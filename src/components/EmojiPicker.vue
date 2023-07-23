<template>
    <Transition>
        <div v-show="show" class="min-w-full h-72">
            <div class="bg-primary-300 min-w-full h-full overflow-y-auto overflow-x-hidden">
                <header class="min-w-full flex border-b-[1px] border-gray-400">
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
                        <ul class="min-w-full grid grid-cols-9 max-xs:grid-cols-6 mt-2">
                            <li @click="append(emoji)" v-for="(emoji, index) in emojis[selectedCategory].emojis"
                                :key="index"
                                class="text-3xl p-1 me-1 flex justify-center items-center cursor-pointer rounded-full transition duration-500 hover:bg-secondary-50">
                                <div class="flex justify-center items-center" v-html="emoji"></div>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="min-w-full h-full text-center p-10">
                        <p class="text-3xl">No emojis!</p>
                    </div>

                </main>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps(['show', 'append']);

const selectedCategory = ref('people');
const selectCategory = (category) => {
    selectedCategory.value = category;
};

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
    width: 35px;
    height: 100%;
    padding: 2px;
}
</style>
