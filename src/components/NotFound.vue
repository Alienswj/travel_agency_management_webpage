<template>
    <div id="notfound">
        <strong id="lostpage">404</strong>

        <b id="lostpage2">您访问的页面找不回来了！</b>
        <a href="/">点此返回首页</a>
        <div id="findbaby">
            <strong
                style="font-size: 50px; margin-left: 400px; margin-bottom: 50px"
                >但我们可以一起寻找失踪宝贝</strong
            >
            <!-- <div id="introduce">
                <el-image
                    :src="url"
                    :fit="fill"
                    style="margin-left: 400px; float: left"
                ></el-image>
                <el-card
                    style="padding: 50px 50px; width: 300px; height: 300px"
                >
                    <li>姓名：杜宝龙</li>
                    <li>性别：男</li>
                    <li>出生日期：1999.1.1</li>
                    <li>特征：不爱穿衣服，笑容猥琐，无刘海，肌肉猛男</li>
                </el-card>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
        return {
            url: require("../assets/img/404/baby.jpg"),
        };
    },
};
</script>
<style scoped>
#lostpage {
    margin-left: 200px;
    padding: 200px;
    font-size: 150px;
    font-weight: 1000;
}
#lostpage2 {
    font-size: 50px;
    font-weight: 1000;
}
#error {
    margin-left: 50px;
}
</style>
