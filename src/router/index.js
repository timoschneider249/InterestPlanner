import { createRouter, createWebHistory } from 'vue-router';
import ROIPage from '../components/ROIPage.vue';
import TokenPage from '../components/TokenPage.vue';
import AboutPage from '../components/About.vue';

const routes = [
    { path: '/', component: ROIPage },
    { path: '/tokens', component: TokenPage },
    { path: '/about', component: AboutPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
