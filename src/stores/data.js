import { ref } from "vue";

const messages = ref([
    {
        content: 'old price is $78 now is ~$29~ 🙂',
        byMe: false,
        emoji: false
    },
    {
        content: 'Anyone here?',
        byMe: false,
        emoji: false
    },
    {
        content: 'I\'m doing pretty well, thanks for asking. How about you?',
        byMe: true,
        emoji: false
    },
    {
        content: 'I\'m doing okay. Just been busy with work lately.',
        byMe: false,
        emoji: false
    },
    {
        content: 'Yeah, I hear you. Work has been crazy for me too.',
        byMe: true,
        emoji: false
    },
    {
        content: 'By the way, did you have a chance to look at the report I sent over?',
        byMe: true,
        emoji: false
    },
    {
        content: 'Not yet, but I\'ll take a look at it later today.',
        byMe: false,
        emoji: false
    },
    {
        content: 'Great, thanks. Let me know if you have any questions.',
        byMe: true,
        emoji: false
    }
]);

export {
    messages
};