import { createRouter, createWebHistory } from "vue-router";
import login_Page from '@/components/views/login_Page'

const routes = [
    {
        path: "/",
        name: "login",
        component: login_Page,
    },
    {
        path: "/order-items",
        name: "order-items",
        component: () =>
            import(/* webpackChunkName: "about" */ "../components/views/list_of_items_page.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
