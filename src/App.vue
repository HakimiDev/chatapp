<template>
    <component :is="currentView"></component>
</template>

<script setup>
import { currentView } from './router/index';
</script>