<template>
    <div>
        <el-menu
            :default-active="activeIndex2"
            class="top-menu"
            mode="horizontal"
            @select="handleSelect"
            background-color="#728A7A"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
        >
            <el-image
                style="width: 240px; height: 60px; float: left"
                :src="url"
            ></el-image>
            <el-menu-item index="/">首页</el-menu-item>
            <el-submenu
                index="2"
                v-if="this.$store.state.currentUser != undefined"
            >
                <template slot="title">会员服务</template>
                <el-menu-item index="/my_order">我的订单</el-menu-item>
                <el-menu-item index="/my_info">个人信息</el-menu-item>
                <el-menu-item index="/update_password">修改密码</el-menu-item>
                <el-menu-item index="3-1">客票验证</el-menu-item>
                <el-menu-item index="3-2">旅行社动态</el-menu-item>
            </el-submenu>
            <el-submenu
                index="3"
                v-if="this.$store.state.currentUser != undefined"
            >
                <template slot="title">旅行信息</template>
                <el-submenu index="3-1">
                    <template slot="title">出行注意事项</template>
                    <el-menu-item index="3-1-1">旅客须知</el-menu-item>
                    <el-menu-item index="3-1-2">行李须知</el-menu-item>
                    <el-menu-item index="3-1-3">其他规定</el-menu-item>
                </el-submenu>
                <el-submenu index="4-2">
                    <template slot="title">行前服务</template>
                    <el-menu-item index="4-2-1">旅行社信息</el-menu-item>
                    <el-menu-item index="4-2-2">保险</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item
                v-if="this.$store.state.currentUser == undefined"
                index="/register"
                style="float: right"
            >
                <i class="el-icon-edit"></i>免费注册
            </el-menu-item>
            <el-submenu
                v-if="this.$store.state.currentUser != undefined"
                index="5"
                style="float: right"
            >
                <template slot="title">{{
                    this.$store.state.currentUser.name
                }}</template>
                <el-menu-item index="/my_info">个人信息</el-menu-item>
                <el-menu-item index="/update_password">修改密码</el-menu-item>
                <el-menu-item index="/logout" @click="logout()"
                    >注销</el-menu-item
                >
            </el-submenu>
            <el-menu-item v-else index="/login" style="float: right">
                <i class="el-icon-s-custom"></i>您好，请登录
            </el-menu-item>
            <el-menu-item index="6" disabled style="float: right">
                <i class="el-icon-chat-dot-round"></i>在线客服
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    data() {
        return {
            url: require("../assets/img/logo/宝龙旅行logo.png"),
            activeIndex: "1",
            activeIndex2: "1",
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout() {
            this.$store.commit("initCurrentUser", null);
            this.postKeyValueRequest("/logout", null).then((resp) => {
                console.log(resp);
                window.sessionStorage.removeItem("user");
                let path = this.$route.query.redirect;
                this.$router.replace(
                    path == "/" || path == undefined ? "/" : path
                );
            });
        },
    },
    // mounted() {
    //     if (this.$store.state.currentUser != undefined) {
    //         this.$router.replace("/");
    //     }
    // },
};
</script>
<style scoped>
</style>