<template>
    <div class="my_info">
        <div>
            <h1>个人信息</h1>
            <el-form :model="MyInfo" ref="MyInfo">
                <el-form-item label="用户名" :label-width="label_width">
                    <el-input disabled v-model="MyInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="label_width"
                    ><el-input v-model="MyInfo.name"></el-input
                ></el-form-item>
                <el-form-item label="昵称" :label-width="label_width"
                    ><el-input v-model="MyInfo.nickname"></el-input
                ></el-form-item>
                <el-form-item label="性别" :label-width="label_width"
                    ><el-radio-group v-model="MyInfo.gender">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                        <el-radio :label="2">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" :label-width="label_width"
                    ><el-input v-model="MyInfo.phone"></el-input
                ></el-form-item>
                <el-form-item label="邮箱" :label-width="label_width"
                    ><el-input v-model="MyInfo.email"></el-input
                ></el-form-item>
                <el-form-item label="生日" :label-width="label_width"
                    ><el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="MyInfo.birthday"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        style="width: 100%"
                    ></el-date-picker
                ></el-form-item>
                <el-form-item label="身份证号" :label-width="label_width"
                    ><el-input v-model="MyInfo.idNumber"></el-input
                ></el-form-item>
                <el-button
                    type="primary"
                    @click="submitUpdateInfo()"
                    class="submitButton"
                    >更新</el-button
                >
            </el-form>
        </div>
        <el-divider></el-divider>
        <div>
            <h1>修改密码</h1>
            <el-form
                :model="updatePassword"
                :rules="rules"
                ref="updatePassword"
            >
                <el-form-item
                    label="密码"
                    prop="newPassword"
                    :label-width="label_width"
                >
                    <el-input
                        show-password
                        v-model="updatePassword.newPassword"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    prop="passwordAgain"
                    :label-width="label_width"
                >
                    <el-input
                        show-password
                        v-model="updatePassword.passwordAgain"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-button
                    type="primary"
                    @click="submitUpdatePassword('updatePassword')"
                    class="submitButton"
                    >确定</el-button
                >
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "MyInfo",
    data() {
        var validatePassAgain = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.updatePassword.newPassword) {
                callback(new Error("两次输入密码不一致！"));
            } else {
                callback();
            }
        };
        return {
            label_width: "100px",
            MyInfo: {
                id: "",
                username: "",
                phone: "",
                email: "",
                name: "",
                nickname: "",
                gender: null,
                birthday: "",
                idNumber: "",
            },
            updatePassword: {
                id: "",
                newPassword: "",
                passwordAgain: "",
            },
            rules: {
                newPassword: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur",
                    },
                    {
                        min: 5,
                        max: 18,
                        message: "长度在5到18个字符",
                        trigger: "blur",
                    },
                ],
                passwordAgain: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur",
                    },
                    {
                        validator: validatePassAgain,
                        //message: "两次输入密码不一致",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        submitUpdateInfo() {
            this.postRequest("/user/update_info", this.MyInfo).then((resp) => {
                console.log(resp);
            });
        },
        submitUpdatePassword(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postRequest(
                        "/user/update_password",
                        this.updatePassword
                    ).then((resp) => {
                        console.log(resp);
                    });
                } else {
                    console.log(false);
                }
            });
        },
    },
    created() {
        this.MyInfo.id = this.$store.state.currentUser.id;
        this.updatePassword.id = this.$store.state.currentUser.id;
        this.MyInfo.username = this.$store.state.currentUser.username;
        this.MyInfo.name = this.$store.state.currentUser.name;
        this.MyInfo.phone = this.$store.state.currentUser.phone;
        this.MyInfo.email = this.$store.state.currentUser.email;
        this.MyInfo.nickname = this.$store.state.currentUser.nickname;
        this.MyInfo.gender = this.$store.state.currentUser.gender;
        this.MyInfo.birthday = this.$store.state.currentUser.birthday;
        this.MyInfo.idNumber = this.$store.state.currentUser.idNumber;
        console.log(this.MyInfo);
    },
};
</script>
<style scoped>
.my_info {
    width: 400px;
    margin: auto;
    padding: 50px;
}
.submitButton {
    margin-left: 330px;
}
</style>