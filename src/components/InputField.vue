<template>
    <div class="w-full flex justify-between items-center bg-primary-50 outline-none rounded p-2 px-2 ps-3 text-md">
        <slot name="before" />
        <input :class="className" :name="name" :value="modelValue" @keydown.enter="onKeyDown" @input="event => onChange(name, event.target.value)" class="w-full bg-transparent outline-none pe-2" :type="type" :placeholder="placeholder" :required="required">
        <slot />
    </div>
</template>

<script setup>
defineProps(['name', 'className', 'type', 'placeholder', 'required', 'modelValue', 'onChange', 'onKeyDown']);
</script>