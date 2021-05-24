<template>
    <div class="home_page">
        <el-container>
            <el-header>
                <ManageTopBar
                    v-if="
                        this.$store.state.currentUser != undefined &&
                        this.$store.state.currentUser.roles[0].name ===
                            'ROLE_ADMINISTRATOR'
                    "
                />
                <TopBar v-else />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import ManageTopBar from "@/components/manage/ManageTopBar.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Home",
    data() {
        return {
            url: require("../assets/img/logo/宝龙旅行logo.png"),
        };
    },
    components: { TopBar, ManageTopBar, Footer },
};
</script>

<style scoped>
.el-header {
    padding: 0;
}
.el-main {
    padding: 0;
}
.el-footer {
    padding: 0;
}
</style>