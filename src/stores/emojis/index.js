import { ref } from 'vue';
import allEmojis from './emojis.json';

const emojis = {};
initEmojis();

function initEmojis() {
    for (const emoji of allEmojis) {
        if (Object.keys(emojis).includes(emoji.category)) continue;
        const category = allEmojis.filter(e => e.category === emoji.category);
        if (!category.length) continue;
        emojis[category[0].category] = {
            icon: category[4].emoji,
            emojis: category.map(c => {
                const native = c.emoji;
                const custom = emojiParser(c.emoji, true);
                return { native, custom };
            })
        };
    }
}

function emojiParser (str, alt = false) {
    const altRegex = /alt="([^"]*)"/g;
    return (alt) ? twemoji.parse(str) : twemoji.parse(str).replace(altRegex, Date.now());
}

export {
    emojis,
    emojiParser
};