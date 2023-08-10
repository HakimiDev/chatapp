<template>
    <div class="min-w-full min-h-full">
        <MinMune type="2" :show="showMinMune" :toggleShow="toogleShowMinMune" />
        <header class="min-w-full fixed top-0 flex items-center z-10">
            <div class="min-w-full bg-primary-100 flex flex-row items-center p-2 rounded-b">
                <div>
                    <div class="flex flex-row items-center">
                        <div @click="handelBack"
                            class="me-2 cursor-pointer rounded-full p-1 transition duration-500 hover:bg-secondary-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <UserAvatar :user="user" />

                        <!-- <input type="file" @change="handleFileInput" multiple> -->

                    </div>
                </div>

                <div class="flex-1 ps-4">
                    <div class="flex flex-col leading-5">
                        <h2 class="text-lg max-xs:text-sm font-semibold">{{ (typeof user.username == "string") ?
                            user.username.substring(0, 18) : '' }}</h2>
                        <h3 class="text-gray-400 ms-1">typing...</h3>
                    </div>
                </div>

                <div @click="toogleShowMinMune"
                    class="cursor-pointer rounded-full p-1 transition duration-500 hover:bg-secondary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </div>
            </div>
        </header>

        <main class="text-md overflow-y-scroll pt-16 min-h-screen">
            <ul class="p-2 min-w-full min-h-full overflow-y-scroll">
                <Message v-for="(message, index) in displayMessages" :key="index" :messages="messages" :message="message"
                    :index="index" />
            </ul>
            <div ref="msgsRef"></div>
        </main>

        <footer class="min-w-full sticky bottom-0 z-10 bg-primary-300">
            <Layout class="rounded-t">
                <div class="flex flex-row justify-between items-center text-xl">
                    <div @click="toogleShowEmojiPicker"
                        class="cursor-pointer rounded-full p-2 transition duration-500 hover:bg-secondary-50">
                        <svg v-if="!showEmojiPicker" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                        </svg>
                    </div>
                    <div class="ms-2 cursor-pointer rounded-full p-2 transition duration-500 hover:bg-secondary-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                        </svg>
                    </div>

                    <textarea @focus="toogleShowEmojiPicker(false)" ref="msgField" v-model="inputsData.message" cols="2"
                        rows="1" class="w-full bg-transparent outline-none p-2 resize-none" placeholder="Message"
                        @keydown.enter.prevent="handelKeyDown" @keyup.enter.prevent="handelKeyUp"></textarea>
                    <div class="cursor-pointer rounded-full p-2 transition duration-500 hover:bg-secondary-50"
                        @click="handelSend">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </div>

                </div>
            </Layout>
            <EmojiPicker :show="showEmojiPicker" :onAppend="appendEmoji" :onRemove="removeEmoji" />
        </footer>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { emojiParser } from '../stores/emojis';
import { selectedUser, messages } from '../stores/chat';
import { getRandomNumber } from '../utils/index';

import MinMune from '../components/MinMune.vue';
import UserAvatar from '../components/UserAvatar.vue';
import Layout from '../components/Layout.vue';
import Message from '../components/Message.vue';
import EmojiPicker from '../components/EmojiPicker.vue';

const showMinMune = ref(false);
const toogleShowMinMune = (value) => (typeof value == "boolean") ? showMinMune.value = value : showMinMune.value = !showMinMune.value;

const showEmojiPicker = ref(false);
const toogleShowEmojiPicker = (value) => {
    (typeof value == "boolean") ? showEmojiPicker.value = value : showEmojiPicker.value = !showEmojiPicker.value;
    if (!showEmojiPicker.value) msgField.value.focus();
    msgsRef.value.scrollIntoView();
};

const inputsData = ref({
    message: '',
    file: null
});

onMounted(() => {
    if (!selectedUser.value) return window.location.hash = '#';
    msgsRef.value.scrollIntoView();
});

const user = ref(selectedUser.value || {});

const displayMessages = computed(() => messages.value.map((e) => {
    e.content = e.content.replaceAll('\n', '<br>');
    e.content = e.content.replace(/\*([^*]+)\*/g, (e) => `<span class="font-bold">${e.substring(1, e.length - 1)}</span>`);
    e.content = e.content.replace(/~([^~]+~)/g, (e) => `<span class="line-through">${e.substring(1, e.length - 1)}</span>`);
    e.content = e.content.replace(/`([^`]+`)/g, (e) => `<span class="bg-black text-black hover:bg-transparent hover:text-primary-200">${e.substring(1, e.length - 1)}</span>`);
    e.content = emojiParser(e.content);

    if (!e.time) e.time = `${getRandomNumber(1, 12)}:${getRandomNumber(1, 59)} ${(Math.random() * 10) > 5 ? 'am' : 'pm'}`;

    return e;
}));

const msgField = ref(null);
const msgsRef = ref(null);

const handelBack = () => {
    window.location.hash = '#';
};

const handelSend = () => {
    if (!inputsData.value.message.trim().length) return;
    messages.value.push({
        content: inputsData.value.message,
        byMe: true
    });
    inputsData.value.message = '';
    msgField.value.focus();
    setTimeout(() => {
        msgsRef.value.scrollIntoView();
    }, 50);
};

const appendEmoji = (emoji) => {
    inputsData.value.message += emoji;
};

const removeEmoji = (emojiLength = 1) => {
    inputsData.value.message = inputsData.value.message.substring(0, inputsData.value.message.length - emojiLength);
};

const handelKeyDown = (e) => {
    if (!e.shiftKey) return handelSend();
    e.target.value += '\n';
};

const handelKeyUp = (e) => {
    if (e.shiftKey) return;
    inputsData.value.message = '';
}

window.addEventListener('keydown', (e) => {
    if (e.key == "Enter" && showEmojiPicker.value) {
        handelSend();
    }
});

const imageUrl = ref('');

function handleFileInput(event) {
    const files = event.target.files;

    if (!files.length) return;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = () => {
            imageUrl.value = reader.result;
            messages.value.push({
                content: `<img src="${imageUrl.value}" alt="${Date.now()}" />`,
                byMe: true
            });
        };

        reader.readAsDataURL(file);
    }

}

</script>
