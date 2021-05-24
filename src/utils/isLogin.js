

export const isLogin = () => {
    if (this.$store.state.currentUser == undefined) {
        this.$confirm("您还未登录, 是否登录?", "提示", {
            confirmButtonText: "登录",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.$router.push("/login");
                this.$message({
                    type: "success",
                    message: "已为您跳转到登录页面!",
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "您已取消登录",
                });
            });
        return false;
    } else {
        return true;
    }
}