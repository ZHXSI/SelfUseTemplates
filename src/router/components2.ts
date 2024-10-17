import Layout from "@/views/Layout/index.vue";
const route = {
    path: "/components2",
    component: Layout,
    redirect: "/components2/1",
    meta: {
        title: "Home2",
    },
    children: [
        {
            path: "/components2/1",
            name: "components2-1",
            // hidden: true,
            component: () => import("@/views/components2/index.vue"),
            meta: {
                title: "components2-1",
            },
        },
    ],
};

export default route;
