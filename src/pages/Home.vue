<template>
    <Header />
    <Fap />
    <main class="mt-16">
        <section>
            <ul v-if="users.length" class="p-2">
                <UserCard v-for="(user, index) in users" :key="index" :user="user" />
            </ul>
            <div class="min-h-screen min-w-full flex justify-center items-center text-2xl font-semibold" v-else>
                <p>You don't have freinds ):</p>
            </div>
        </section>
    </main>
    <footer class="border-t-[1px] min-w-full mt-2 p-4 pb-24 text-gray-400">
        <div class="text-md max-xs:text-xs">
            <h2 class="text-center">Your personal messages are <span class="text-secondary-100 cursor-pointer transition duration-300 hover:underline">end-to-end-encrypted</span></h2>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import UserCard from '../components/UserCard.vue';
import Fap from '../components/Fap.vue';

const users = ref([
    {
        username: 'Isaac Qadri',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&usqp=CAU',
        lastSeen: 'yesterday',
        lastMessage: 'كيفك ياب؟',
        isOnline: true,
        newMessages: 100
    },
    {
        username: 'Youssef Hussain',
        avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&usqp=CAU',
        lastSeen: '16/7/2023',
        lastMessage: 'يزمم وينك؟',
        isOnline: false,
        newMessages: 43
    },

    {
        username: 'Sarah Lee',
        avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
        lastSeen: '18/7/2023',
        lastMessage: 'Hey, how are you?',
        isOnline: true,
        newMessages: 2
    },
    {
        username: 'John Kim',
        avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
        lastSeen: '15/7/2023',
        lastMessage: 'Can you call me back?',
        isOnline: false,
        newMessages: 1
    },
    {
        username: 'Emily Chen',
        avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
        lastSeen: '17/7/2023',
        lastMessage: 'I have a question about the project',
        isOnline: true,
        newMessages: 3
    },
    {
        username: 'Alex Wong',
        avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
        lastSeen: '14/7/2023',
        lastMessage: 'Let me know if you need help',
        isOnline: false,
        newMessages: 0
    },
    {
        username: 'Olivia Davis',
        avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
        lastSeen: '16/7/2023',
        lastMessage: 'Thanks for the update',
        isOnline: true,
        newMessages: 1
    },
    {
        username: 'William Smith',
        avatarUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
        lastSeen: '18/7/2023',
        lastMessage: 'Can we meet tomorrow?',
        isOnline: false,
        newMessages: 2
    },
    {
        username: 'Sophia Lee',
        avatarUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
        lastSeen: '15/7/2023',
        lastMessage: 'See you soon!',
        isOnline: true,
        newMessages: 0
    },
    {
        username: 'Daniel Kim',
        avatarUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
        lastSeen: '17/7/2023',
        lastMessage: "Let's grab lunch",
        isOnline: false,
        newMessages: 1
    },
    {
        username: 'Grace Chen',
        avatarUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
        lastSeen: '14/7/2023',
        lastMessage: "I'm running late",
        isOnline: true,
        newMessages: 3
    },
    {
        username: 'David Kim',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        lastSeen: '19/7/2023',
        lastMessage: 'Can you send me the file?',
        isOnline: false,
        newMessages: 0
    }
]);

</script>