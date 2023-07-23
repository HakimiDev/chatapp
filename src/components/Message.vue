<template>
    <li :class="message.byMe ? 'justify-end' : 'justify-start'" class="min-w-full h-fit flex p-1">
        <div :class="[message.byMe ? ' bg-secondary-200' : 'bg-primary-300', (messages[index - 1] && message.byMe === messages[index - 1].byMe) ? 'ms-1 me-1' : (message.byMe) ? 'rounded-tr-none' : 'rounded-tl-none']"
            class="relative py-2 px-4 inline-block max-w-[65%] h-fit break-words rounded-3xl">
            <div
                v-if="message.byMe && (!messages[index - 1] || message.byMe !== messages[index - 1].byMe)"
                class="absolute top-[4px] mt-[-6px]  right-[-10px] ml-[-5px] border-l-[12px] border-r-[12px] border-transparent border-b-[12px] border-b-secondary-200 -rotate-[45deg] rounded-lg">
            </div>
            <div
                v-else-if="!message.byMe && (!messages[index - 1] || message.byMe !== messages[index - 1].byMe)"
                class="absolute top-[4px] mt-[-6px]  left-[-10px] mr-[-5px] border-r-[12px] border-l-[12px] border-transparent border-b-[12px] border-b-primary-300 rotate-[45deg] rounded-lg">
            </div>

            <p v-html="message.content"></p>
            <div class="flex flex-row justify-end items-center text-gray-400 text-sm">
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
</template>

<script setup>
defineProps(['messages', 'message', 'index'])
</script>