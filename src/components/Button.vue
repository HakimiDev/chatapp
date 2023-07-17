<template>
    <div>
        <button
            @click="$emit('onClick')"
            class="w-[70%] p-2 px-4 bg-primary-300 rounded text-md font-bold transition duration-700" :class="!loading ? 'hover:bg-primary-500' : ''">
            <div class="w-full flex justify-center items-center">
                 <slot v-if="!loading" />
                 <div v-if="loading" class="loader"></div>
            </div>
        </button>
    </div>
</template>

<script setup>
defineProps(['loading']);
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #15373b; /* Blue */
  border-radius: 50%;
  width: 27px;
  height: 27px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>