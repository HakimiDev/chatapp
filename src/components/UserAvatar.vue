<template>
    <div class="relative h-fit">
        <img class="w-14 h-14 max-xs:w-12 max-xs:h-12 border-2 rounded-full object-cover" :src="user.avatarUrl"
            :alt="index">
        <div :class="user.isOnline ? 'bg-green-500' : 'bg-gray-500'"
            class="h-4 w-4 absolute bottom-0 right-0 mb-1 rounded-full"></div>
    </div>
</template>

<script setup>
defineProps(['user']);
</script>