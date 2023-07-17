import { computed, ref } from 'vue';

import Home from '../pages/Home.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';

const routes = {
    '/': Home,
    'register': Register,
    'login': Login
};

function initPath (path) {
    return path.slice(1).toLowerCase().trim() || '/';
}

const currentPath = ref(initPath(window.location.hash));
const currentView = computed(() => {
    return routes[currentPath.value] || NotFound;
});

window.addEventListener('hashchange', async () => {
    currentPath.value = initPath(window.location.hash);
});

export {
    currentPath,
    currentView
};
