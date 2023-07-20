<template>
    <MinMune type="2" :show="showMinMune" :toggleShow="toogleShowMinMune" />
    <header class="w-full fixed top-0 flex items-center z-10">
        <div class="min-w-full bg-primary-100 flex flex-row items-center p-2 rounded-b">
            <div>
                <div class="flex flex-row items-center">
                    <div class="pe-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <UserAvatar :user="user" />
                </div>
            </div>

            <div class="flex-1 ps-4">
                <div class="flex flex-col leading-5">
                    <h2 class="text-lg">{{ user.username }}</h2>
                    <h3 class="text-gray-400 ms-1">typing...</h3>
                </div>
            </div>

            <div>
                <div @click="toogleShowMinMune" class="cursor-pointer transition duration-500 hover:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </div>
            </div>
        </div>
    </header>

    <main class="mt-24 text-md min-w-full min-h-full">
        <ul class="p-2 pb-20 min-w-full min-h-full overflow-auto block">
            <li v-for="(message, index) in displayMessages" :key="index"
                :class="message.byMe ? 'justify-end' : 'justify-start'" class="min-w-full h-fit flex py-1">
                <div :class="[message.byMe ? 'bg-primary-300' : 'bg-primary-100', message.byMe && ((messages[index - 1] && !messages[index - 1].byMe) || !messages[index - 1]) ? 'rounded-b-3xl rounded-tl-3xl' : 'me-1', !message.byMe && ((messages[index - 1] && messages[index - 1].byMe) || !messages[index - 1]) ? ' rounded-b-3xl rounded-tr-3xl' : 'ms-1']"
                    class="max-w-[65%] h-fit p-2 break-words rounded-xl">
                    <p v-html="message.content"></p>
                    <div class="flex flex-row justify-end items-center text-gray-300">
                        <p>{{ message.time }}</p>
                        <span class="flex flex-row text-blue-500" v-if="message.byMe">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </span>
                    </div>
                </div>
            </li>
            <div ref="msgsRef"></div>
        </ul>
    </main>

    <footer class="min-w-full fixed bottom-0">
        <Layout class="rounded-t p-2">
            <div class="flex flex-row justify-between items-center text-xl">
                <span class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                </span>
                <span class="ms-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                </span>

                <textarea v-model="inputsData.message" id="" cols="1" rows="1"
                    class="w-full bg-transparent outline-none p-2 resize-none" placeholder="Message"
                    @keydown.enter="handelKeyDown" @keyup.enter="handelKeyUp"></textarea>
                <span class="cursor-pointer" @click="handelSend">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </span>

            </div>
        </Layout>
    </footer>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { selectedUser } from '../stores/chat';

import MinMune from '../components/MinMune.vue';
import UserAvatar from '../components/UserAvatar.vue';
import Layout from '../components/Layout.vue';
import InputField from '../components/InputField.vue';

const showMinMune = ref(false);
const toogleShowMinMune = () => showMinMune.value = !showMinMune.value;

const inputsData = ref({
    message: ''
});

onMounted(() => {
    if (!selectedUser.value) return window.location.hash = '#';
})

const user = ref(selectedUser.value || {});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const messages = ref([
    {
        content: 'old price is $78 now is ~$29~',
        byMe: false
    },
    {
        content: 'Anyone here?',
        byMe: false
    },
    {
        content: 'I\'m doing pretty well, thanks for asking. How about you?',
        byMe: true
    },
    {
        content: 'I\'m doing okay. Just been busy with work lately.',
        byMe: false
    },
    {
        content: 'Yeah, I hear you. Work has been crazy for me too.',
        byMe: true
    },
    {
        content: 'By the way, did you have a chance to look at the report I sent over?',
        byMe: true
    },
    {
        content: 'Not yet, but I\'ll take a look at it later today.',
        byMe: false
    },
    {
        content: 'Great, thanks. Let me know if you have any questions.',
        byMe: true
    }
]);

const displayMessages = computed(() => messages.value.map((e) => {
    e.content = e.content.replaceAll('\n', '<br>');
    e.content = e.content.replace(/\*([^*]+)\*/g, (e) => `<span class="font-bold">${e.substring(1, e.length - 1)}</span>`);
    e.content = e.content.replace(/~([^~]+~)/g, (e) => `<span class="line-through">${e.substring(1, e.length - 1)}</span>`);
    e.content = e.content.replace(/`([^`]+`)/g, (e) => `<span class="bg-black text-black hover:bg-transparent hover:text-primary-200">${e.substring(1, e.length - 1)}</span>`);
    if (!e.time) {
        e.time = `${getRandomNumber(1, 12)}:${getRandomNumber(1, 59)} ${(Math.random() * 10) > 5 ? 'am' : 'pm'}`;
    }
    return e;
}));

const msgsRef = ref(null);

const handelSend = () => {
    messages.value.push({
        content: inputsData.value.message,
        byMe: true
    });
    inputsData.value.message = '';
};

const handelKeyDown = (e) => {
    if (!inputsData.value.message.trim().length) return;
    if (!e.shiftKey) return handelSend();
};

const handelKeyUp = (e) => {
    if (e.shiftKey) return;
    inputsData.value.message = '';
    msgsRef.value.scrollIntoView({ behavior: 'smooth' });
};

</script>

<style scoped>
textarea::-webkit-scrollbar {
    width: 0.1rem;
}

textarea::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 0.25rem;
}

textarea::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 0.25rem;
}
</style>