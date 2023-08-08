import { ref } from 'vue';
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
                const customImgLink = c.customImgLink;
                return { native, custom };
            })
        };
    }
}

function onLastUsedEmojisChange() {
    emojis.value["lastUsed"].emojis = lastUsedEmojis.value;
    localStorage.setItem('lastUsedEmojis', JSON.stringify(lastUsedEmojis.value));
}

function emojiParser(str, alt = false) {
    const altRegex = /alt="([^"]*)"/g;
    const customEmojiRegex = /:(.*?):/g;
    let parsed = twemoji.parse(str);
    if (parsed === str) {
        const matches = str.match(customEmojiRegex);
        if (Array.isArray(matches)) {
            for (const match of matches) {
                const emoji = allEmojis.find(e => e.emoji.trim() === match.trim());
                if (emoji && emoji.customImgLink) parsed = parsed.replaceAll(match, `<img class="emoji" draggable="false" 1691515245459="" src="${emoji.customImgLink}">`);
            }
        }
    }
    return (alt) ? parsed : parsed.replace(altRegex, Date.now());
}

export {
    emojis,
    lastUsedEmojis,
    emojiParser,
    onLastUsedEmojisChange
};