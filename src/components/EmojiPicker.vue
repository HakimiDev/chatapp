<template>
    <Transition>
        <div v-show="show" class="min-w-full h-64">
            <div class="bg-primary-300 min-w-full min-h-full p-2">
                <h2>EmojiPicker</h2>
            </div>
        </div>
    </Transition>
</template>

<script setup>
defineProps(['show']);
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: ease;
    transition-duration: 250ms;
    opacity: 1;
    transform: scale(1);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(0);
}
</style>