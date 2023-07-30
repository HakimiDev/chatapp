import { ref, watch } from 'vue';
import allEmojis from './emojis.json';

const lastUsedEmojis = ref(JSON.parse(localStorage.getItem('lastUsedEmojis') || "[]"));

const emojis = ref({
    lastUsed: {
        icon: '🕑',
        emojis: lastUsedEmojis.value
    }
});
initEmojis();

function initEmojis() {
    for (const emoji of allEmojis) {
        if (Object.keys(emojis.value).includes(emoji.category)) continue;
        const category = allEmojis.filter(e => e.category === emoji.category);
        if (!category.length) continue;
        emojis.value[category[0].category] = {
            icon: category[4].emoji,
            emojis: category.map(c => {
                const native = c.emoji;
                const custom = emojiParser(c.emoji, true);
                return { native, custom };
            })
        };
    }
}

function onLastUsedEmojisChange () {
    emojis.value["lastUsed"].emojis = lastUsedEmojis.value;
    localStorage.setItem('lastUsedEmojis', JSON.stringify(lastUsedEmojis.value));

}

function emojiParser(str, alt = false) {
    const altRegex = /alt="([^"]*)"/g;
    return (alt) ? twemoji.parse(str) : twemoji.parse(str).replace(altRegex, Date.now());
}

export {
    emojis,
    lastUsedEmojis,
    emojiParser,
    onLastUsedEmojisChange
};