<template>
    <div class="min-h-screen min-w-full flex justify-center items-center p-4">
        <Layout class="w-full sm:w-[70%] h-fit rounded mb-10">
            <header class="text-center font-bold text-2xl py-1 border-b-[1px] border-primary-300">
                <h2>Login</h2>
            </header>
            <main class="min-w-full mt-2 p-1 flex justify-center items-center">
                <form class="w-[92%]" onsubmit="return false;">
                    <InputField v-if="!usingEmail" name="username" :modelValue="inputsData.username"
                        :onChange="onInputChange" type="text" placeholder="Your username" class="mt-2" required="true">
                        <template v-slot:icon>
                            <div class="border-e-[1px] border-primary-500 me-2 pe-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        </template>
                    </InputField>
                    <InputField v-else name="email" :modelValue="inputsData.email" :onChange="onInputChange" type="email"
                        placeholder="Your email" class="mt-2" required="true">
                        <template v-slot:icon>
                            <div class="border-e-[1px] border-primary-500 me-2 pe-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round"
                                        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                </svg>
                            </div>
                        </template>
                    </InputField>
                    <div @click="toggleUsingField" class="text-gray-400 ms-2">
                        <p v-if="usingEmail" class="cursor-pointer transition hover:underline w-fit">Using username</p>
                        <p v-else class="cursor-pointer transition hover:underline w-fit">Using email</p>
                    </div>

                    <InputField name="password" :modelValue="inputsData.password" :onChange="onInputChange"
                        :type="showPassword ? 'text' : 'password'" placeholder="Your password" class="mt-2" required="true">
                        <template v-slot:icon>
                            <div class="border-e-[1px] border-primary-500 me-2 pe-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            </div>
                        </template>
                        <span @click="toggleShowPassword" class="cursor-pointer">
                            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </span>
                    </InputField>

                    <div class="text-gray-400 ms-2">
                        <p class="cursor-pointer transition hover:underline w-fit">Forgot password?</p>
                    </div>

                    <div class="flex justify-center items-center mt-4">
                        <Button @onClick="handelLogin" :loading="loading" class="w-[70%]">Login</Button>
                    </div>

                    <div class="flex justify-center items-center mt-3">
                        <div class="flex-1 h-[1px] bg-primary-200/50"></div>
                        <h2 class="px-4 text-lg font-bold">OR</h2>
                        <div class="flex-1 h-[1px] bg-primary-200/50"></div>
                    </div>

                    <p class="p-1 px-4 text-gray-400 text-center text-lg">Don't have an account? <a
                            class="cursor-pointer font-semibold transition hover:underline" href="/#register">Signup</a></p>

                </form>
            </main>
        </Layout>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Layout from '../components/Layout.vue';
import InputField from '../components/InputField.vue';
import Button from '../components/Button.vue';

const inputsData = ref({
    username: '',
    email: '',
    password: ''
});

const onInputChange = (inputName, newValue) => {
    inputsData.value[inputName] = newValue;
};

const showPassword = ref(false);
const toggleShowPassword = () => showPassword.value = !showPassword.value;

const usingEmail = ref(true);
const toggleUsingField = () => {
    usingEmail.value = !usingEmail.value;
    inputsData.value.username = '';
    inputsData.value.email = '';
};

const loading = ref(false);
const toggleLoading = () => loading.value = !loading.value;

const handelLogin = async () => {
    if (!inputsData.value.password.trim().length || (usingEmail.value && !inputsData.value.email.trim().length) || (!usingEmail.value && !inputsData.value.username.trim().length)) return;
    // Todo check email
    if (inputsData.value.password.trim().length < 8) return;
    if (loading.value) return;
    toggleLoading();
    setTimeout(() => {
        toggleLoading();
    }, 3000);
};

</script>