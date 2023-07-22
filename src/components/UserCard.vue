<template>
    <li @click="handleClick(user)" class="min-w-full flex flex-row p-2 rounded cursor-pointer transition duration-150 hover:bg-secondary-50">
        <UserAvatar :user="user" />
        <div class="w-full p-2 text-lg max-xs:text-xs flex flex-col flex-1">
            <div class="w-full flex justify-between">
                <h2 class="font-semibold">{{ user.username }}</h2>
                <h3 :class="user.newMessages > 0 ? 'text-secondary-100' : 'text-gray-400'">{{ user.lastSeen }}</h3>
            </div>
            <div class="w-full ps-2 flex flex-row justify-between items-center overflow-hidden">
                <h3 class="text-gray-400 max-w-full max-h-8">{{ user.lastMessage }}</h3>
                <div v-if="user.newMessages > 0"
                    :class="user.newMessages > 99 ? 'w-10' : 'w-7'"
                    class="h-7 bg-secondary-200 mt-1 rounded-full flex justify-center items-center p-2">
                    <span>{{ user.newMessages > 99 ? '+99' : user.newMessages }}</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
import UserAvatar from '../components/UserAvatar.vue';
import { selectedUser } from '../stores/chat';

defineProps(['user']);

const handleClick = (user) => {
    selectedUser.value = user;
    window.location.hash = "#chat";
};

</script>