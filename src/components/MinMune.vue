<template>
    <div @click.self="toggleShow" :class="show ? 'top-0' : 'top-[-200%]'"
        class="overflow-hidden fixed z-30 h-screen w-full flex justify-end">
        <div :class="show ? 'mt-14' : ''"
            class=" bg-primary-300 h-fit rounded-xl transition-start duration-300">
            <div class="w-full h-full p-3">
                <ul v-if="type == 1">
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">New group</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">New broadcast</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Linked devices</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Settings</li>
                </ul>
                <ul v-else-if="type == 2">
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">View contact</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Media, links, and
                        docs</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Search</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Mute notification
                    </li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Disappearing
                        messages</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50">Wallpaper</li>
                    <li class="p-2 cursor-pointer rounded transition duration-300 hover:bg-secondary-50 flex flex-row justify-between items-center">
                        <span>More</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['show', 'toggleShow', 'type']);
</script>
