<template>
    <Transition>
        <div v-show="show" class="min-w-full h-60 sticky overflow-hidden">
            <div class="bg-primary-300 min-w-full h-full overflow-y-auto overflow-x-hidden relative">
                <header ref="header" class="min-w-full flex flex-col border-b-[1px] border-gray-400 p-1">
                    <ul class="min-w-full grid grid-cols-11 max-xs:grid-cols-6 gap-2 px-1">
                        <li v-for="(category, index) in Object.keys(emojis)" :key="index" @click="selectCategory(category)"
                            :class="selectedCategory === category ? ' border-b-2' : 'hover:border-b-2 hover:border-red-500'"
                            class="text-lg flex justify-center items-center cursor-pointer transition duration-500">
                            <h2 v-if="index !== 0" class="flex justify-center items-center" v-html="emojis[category].emojis[0].custom"></h2>
                            <h2 v-else>{{ emojis[category].icon }}</h2>
                        </li>
                    </ul>
                    <h3 class="ms-2 mt-2">{{ selectedCategory }}</h3>
                </header>

                <main class="overflow-y-scroll pb-14">
                    <div v-if="showedCategoty.length">
                        <ul class="min-w-full grid grid-cols-8 max-xs:grid-cols-6 my-1">
                            <li @click="appendEmoji(emoji)" v-for="(emoji, index) in showedCategoty"
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
            <footer class="sticky bottom-0 min-w-full bg-primary-100 p-2">
                <div class="min-w-full flex flex-row justify-end items-center bg-primary-100">
                    <InputField :modelValue="searchBar" :onChange="onChange" class="bg-transparent" placeholder="Search...">
                        <template v-slot:before>
                            <div class="me-2 pe-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                        </template>
                    </InputField>
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
import { computed, onUpdated, ref, watch } from 'vue';
import { emojis, lastUsedEmojis, onLastUsedEmojisChange } from '../stores/emojis/index';

import InputField from './InputField.vue';

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

const searchBar = ref('');

const onChange = (name, value) => {
    searchBar.value = value;
}

const selectedCategory = ref('Smileys & Emotion');
const selectCategory = (category) => {
    selectedCategory.value = category;
};

const showedCategoty = computed(() => {
    let showed = [];
    if (searchBar.value.trim().length) {
        for (const [key, value] of Object.entries(emojis.value)) {
            const emos = value.emojis.filter(e => {
                const onDescription = typeof e.description == "string" && e.description.startsWith(searchBar.value.toLowerCase().trim());
                const onTags = Array.isArray(e.tags) && e.tags.includes(searchBar.value.toLowerCase().trim());
                const onAliases = Array.isArray(e.aliases) && e.aliases.includes(searchBar.value.toLowerCase().trim());
                return e.native.includes(searchBar.value.toLowerCase().trim()) || onDescription || onTags || onAliases;
            });
            showed.push(...emos);
            const uShowd = [];
            showed.forEach(e => {
                if (!uShowd.find(x => x.native === e.native)) uShowd.push(e);
            });
            showed = uShowd;
        }
    } else {
        showed = emojis.value[selectedCategory.value].emojis;
    }
    return showed;
});

watch(selectedCategory, () => {
    searchBar.value = '';
});

const header = ref(null);
onUpdated(() => {
    header.value.scrollIntoView();
});

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: ease;
    transition-duration: 50ms;
    opacity: 1;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<style>
.emoji {
    display: inline-block;
    width: 35px;
    height: 100%;
    padding: 2px;
    border-radius: 7px;
}
</style>
