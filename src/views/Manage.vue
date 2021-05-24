<template>
    <div class="manage_page">
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu router default-active="/manage/overview">
                    <el-menu-item index="/manage/overview">
                        <i class="el-icon-info"></i>系统总览
                    </el-menu-item>
                    <el-menu-item index="/manage/trip_manage"
                        ><i class="el-icon-s-promotion"></i
                        >线路管理</el-menu-item
                    >
                    <el-menu-item index="/manage/user_manage"
                        ><i class="el-icon-user-solid"></i
                        >用户管理</el-menu-item
                    >
                    <el-submenu index="/manage">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>销售统计
                        </template>
                        <el-menu-item index="/manage/trips_sale_statistics"
                            >线路销量统计</el-menu-item
                        >
                        <el-menu-item index="/3-2">销售额统计</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <span class="hello" v-if="this.$route.path == '/manage'">
                        欢迎登陆管理页面
                    </span>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.el-aside {
    background-color: #ffffff;
}
</style>

<script>
export default {
    data() {
        return {
            path: "",
        };
    },
    mounted() {
        console.log(this.$route.path, this.$route.path == "/manage");
    },
};
</script>
<style scope>
.manage_page {
    height: 800px;
}
.hello {
    font-size: 100px;
    color: #728a7a;
    margin: auto;
}
</style>