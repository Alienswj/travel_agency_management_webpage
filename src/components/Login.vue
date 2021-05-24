<template>
    <div id="login">
        <el-card class="box-card">
            <span class="title">登录</span>
            <el-form
                status-icon
                :model="loginForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="loginForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        show-password
                        v-model="loginForm.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                        size="normal"
                        type="text"
                        v-model="loginForm.code"
                        auto-complete="off"
                        placeholder="点击图片更换验证码"
                        @keydown.enter.native="submitLogin"
                        style="width: 150px"
                    ></el-input>
                    <img :src="vcUrl" @click="updateVerifyCode" alt />
                </el-form-item>
                <el-form-item>
                    <el-checkbox
                        label="记住我"
                        name="rememberMe"
                        v-model="loginForm.rememberMe"
                    ></el-checkbox>

                    <!-- <el-button @click="hello()">hello</el-button> -->
                    <el-button type="primary" @click="submitLogin('ruleForm')"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            vcUrl: "/verifyCode?time=" + new Date(),
            loginForm: {
                username: "",
                password: "",
                rememberMe: false,
                code: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
                code: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        updateVerifyCode() {
            this.vcUrl = "/verifyCode?time=" + new Date();
        },
        submitLogin(formName) {
            this.$refs[formName].validate((valid) => {
                console.log("verify:", this.loginForm);
                if (valid) {
                    this.postKeyValueRequest("/doLogin", this.loginForm).then(
                        (resp) => {
                            console.log(resp);
                            if (resp) {
                                this.$store.commit("initCurrentUser", resp.obj);
                                window.sessionStorage.setItem(
                                    "user",
                                    JSON.stringify(resp.obj)
                                );
                                let path = this.$route.query.redirect;
                                this.$router.replace(
                                    path == "/" || path == undefined
                                        ? "/"
                                        : path
                                );
                            } else {
                                this.vcUrl = "/verifyCode?time=" + new Date();
                            }
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        hello() {
            this.getRequest("/hello").then((resp) => {
                console.log(resp);
            });
        },
    },
};
</script>
<style scoped>
#login {
    /* background-image: url(../assets/img/background/back.jpg);
  background-position: center;
  background-size: cover; */
    padding: 200px;
}
.loginForm {
    margin-top: 30px;
}
.title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}
button {
    float: right;
}
.box-card {
    width: 400px;
    margin: auto;
    padding: 30px;
}
</style>