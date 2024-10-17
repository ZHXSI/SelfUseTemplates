import Layout from "@/views/Layout/index.vue";
const route = {
    path: "/",
    component: Layout,
    redirect: "/components1/1",
    meta: {
        title: "Home1",

    },
    children: [
        {
            path: "/components1/1",
            name: "components1-1",
            component: () => import("@/views/components1/index.vue"),
            meta: {
                title: "components1-1",
            },
            children: [
                {
                    path: "/components1/1/1",
                    name: "components1-1-1",
                    component: () => import("@/views/components1/index.vue"),
                    meta: {
                        title: "components1-1-1",
                    },
                    children: [
                        {
                            path: "/components1/1/1/1",
                            name: "components1-1-1-1",
                            component: () => import("@/views/components1/index.vue"),
                            meta: {
                                title: "components1-1-1-1",
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export default route;
