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
    const customEmojiRegex = /:(\w+):/g;
    let parsed = twemoji.parse(str);
    const matches = parsed.match(customEmojiRegex);
    if (Array.isArray(matches)) {
        for (const match of matches) {
            const emoji = allEmojis.find(e => e.emoji.trim() === match.trim());
            if (emoji && emoji.customImgLink) {
                const tag = (emoji.customImgLink.endsWith('.mp4')) ? `<video autoplay loop class="emoji" draggable="false" src="${emoji.customImgLink}">` : `<img class="emoji" draggable="false" src="${emoji.customImgLink}">`;
                parsed = parsed.replaceAll(match, tag);
            }
        }
    }
    console.log(parsed);
    return (alt) ? parsed : parsed.replace(altRegex, Date.now());
}

export {
    emojis,
    lastUsedEmojis,
    emojiParser,
    onLastUsedEmojisChange
};