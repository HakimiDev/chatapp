import { ref } from 'vue';
import allEmojis from './emojis.json';

const StyleType = 'messenger-128';
const apiLink = `https://emoji.aranja.com/static/emoji-data/img-${StyleType}/`;

const lastUsedEmojis = ref(JSON.parse(localStorage.getItem('lastUsedEmojis') || "[]"));

const emojis = ref({
    'Last Used': {
        icon: '🕑',
        emojis: lastUsedEmojis.value
    }
});
const customEmojis = [
    {
        "emoji": ":duck:",
        "customImgLink": "https://i.gifer.com/XOsX.gif",
        "description": "duck face",
        "category": "Custom",
        "aliases": ["grinning"],
        "tags": ["smile", "happy"],
        "unicode_version": "6.1",
        "ios_version": "6.0"
    },
    {
        "emoji": ":naruto:",
        "customImgLink": "https://i.gifer.com/Wkoe.gif",
        "description": "naruto face",
        "category": "Custom",
        "aliases": ["grinning"],
        "tags": ["smile", "happy"],
        "unicode_version": "6.1",
        "ios_version": "6.0"
    },
    {
        "emoji": ":kurdistan_flag:",
        "customImgLink": "https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Kurdistan.svg",
        "description": "flag: Wales",
        "category": "Flags",
        "aliases": ["wales"],
        "tags": [],
        "unicode_version": "11.0",
        "ios_version": "12.1"
    }
];

allEmojis.push(...customEmojis);

initEmojis();

function initEmojis() {
    for (const emoji of allEmojis) {
        if (Object.keys(emojis.value).includes(emoji.category)) continue;
        const category = allEmojis.filter(e => e.category === emoji.category);
        if (!category.length) continue;
        emojis.value[category[0].category] = {
            icon: category[0].emoji,
            emojis: category.map(c => {
                const native = c.emoji;
                const custom = emojiParser(c.emoji, true);
                const description = c.description || '';
                const tags = c.tags || [];
                const aliases = c.aliases || [];
                return { native, custom, description, tags, aliases };
            })
        };
    }
}

function onLastUsedEmojisChange() {
    emojis.value["Last Used"].emojis = lastUsedEmojis.value;
    localStorage.setItem('lastUsedEmojis', JSON.stringify(lastUsedEmojis.value));
}

// async function parse (str) {
//     for (const emoji of allEmojis) {
//         const emojiImgLink = await fetch(`${apiLink}${twemoji.convert.toCodePoint(emoji)}.png`);
//         console.log(emojiImgLink);
//         str = str.replaceAll(emoji.emoji, `<img class="emoji" draggable="false" src="${emoji.customImgLink}">`);
//     }
//     return str;
// }

// async function run () {
//     console.log(await parse('2764-fe0f'));
// }

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
    return (alt) ? parsed : parsed.replace(altRegex, Date.now());
}

export {
    emojis,
    lastUsedEmojis,
    emojiParser,
    onLastUsedEmojisChange
};