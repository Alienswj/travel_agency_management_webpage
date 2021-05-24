<template>
    <div class="user_manage">
        <el-table
            :data="
                users.filter(
                    (data) => !search || data.username.includes(search)
                )
            "
            border
        >
            <el-table-column
                fixed
                prop="id"
                label="用户编号"
                width="300"
            ></el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="手机号"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="250"
            ></el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称"
                width="200"
            ></el-table-column>
            <el-table-column
                prop="gender"
                label="性别"
                width="150"
            ></el-table-column>
            <el-table-column
                prop="registerTime"
                label="注册时间"
                width="200"
            ></el-table-column>
            <el-table-column fixed="right">
                <template slot="header" slot-scope="{}">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入用户名关键字搜索"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        @click="handleDelete(scope.row)"
                        type="text"
                        size="small"
                        >封禁</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: "UserManage",
    data() {
        return {
            users: [],
            search: "",
        };
    },
    methods: {
        convertGender(item) {
            if (item.gender == 0) {
                item.gender = "男";
            } else if (item.gender == 1) {
                item.gender = "女";
            } else {
                item.gender = "保密";
            }
        },
        handleDelete(user) {
            if (user.gender == "男") user.gender = 0;
            if (user.gender == "女") user.gender = 1;
            if (user.gender == "保密") user.gender = 2;
            this.deleteRequest("/user/forbidden_user", user).then((resp) => {
                console.log(resp);
            });
        },
    },
    created() {
        this.getRequest("/user/get_all_user").then((resp) => {
            this.users = resp.obj;
            this.users.forEach(this.convertGender);
        });
    },
};
</script>
