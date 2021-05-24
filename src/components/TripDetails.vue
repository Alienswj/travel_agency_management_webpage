<template>
    <div id="trip-details">
        <div class="thumb">
            <div class="big">
                <el-image
                    :src="
                        require('F:/a学习/毕业论文/pic/trip_pic/' +
                            trip.id +
                            '.jpg')
                    "
                    class="image"
                    style="width: 450px"
                />
            </div>
            <div class="introduce">
                <h2>{{ trip.title }}</h2>
                <strong>特色：</strong><br />
                <span class="features" v-html="trip.features"></span><br />
                <el-button @click="$router.go(-1)" class="order"
                    >再看看</el-button
                >
                <el-button type="primary" @click="booking" class="order"
                    >订购</el-button
                >
                <span class="order">余量：{{ trip.quantity }}</span>
                <span class="order">价格：{{ trip.price }}</span>
            </div>
        </div>
        <div class="details">
            <h3>线路详情</h3>
            <el-image
                v-for="number in numbers"
                :key="number"
                :src="
                    require('F:/a学习/毕业论文/pic/trip_details/' +
                        trip.id +
                        '/' +
                        number +
                        '.jpg')
                "
            ></el-image>
        </div>
        <div class="submitForm">
            <el-dialog
                title="填写订单信息"
                width="20%"
                :visible.sync="orderFormVisible"
            >
                <el-form :model="orderForm" :rules="rules" ref="orderForm">
                    <el-form-item
                        label="旅客姓名"
                        prop="name"
                        :label-width="formLabelWidth"
                    >
                        <el-input v-model="orderForm.name"></el-input
                    ></el-form-item>
                    <el-form-item
                        label="手机号码"
                        prop="phone"
                        :label-width="formLabelWidth"
                        ><el-input v-model="orderForm.phone"></el-input
                    ></el-form-item>
                    <el-form-item
                        label="身份证号"
                        prop="idNumber"
                        :label-width="formLabelWidth"
                        ><el-input v-model="orderForm.idNumber"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="orderFormVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="submitForm('orderForm')"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name: "TripDetails",
    data() {
        return {
            trip: null,
            numbers: 0,
            orderFormVisible: false,
            orderForm: {
                uid: "",
                name: "",
                phone: "",
                idNumber: "",
                tid: "",
                date: "",
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
                idNumber: [
                    {
                        required: true,
                        message: "请输入身份证号",
                        trigger: "blur",
                    },
                ],
            },
            formLabelWidth: "100px",
        };
    },
    methods: {
        booking() {
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
            } else {
                this.orderFormVisible = true;
                this.orderForm.uid = this.$store.state.currentUser.id;
                this.orderForm.name = this.$store.state.currentUser.name;
                if (this.$store.state.currentUser.phone) {
                    this.orderForm.phone = this.$store.state.currentUser.phone;
                }

                if (this.$store.state.currentUser.idNumber) {
                    this.orderForm.idNumber = this.$store.state.currentUser.idNumber;
                }
                this.orderForm.tid = this.trip.id;
                this.orderForm.date = this.trip.date;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(valid);
                if (valid) {
                    this.orderFormVisible = false;
                    console.log(formName);
                    this.postRequest("/orders/booking", this.orderForm).then(
                        (resp) => {
                            console.log("booking_resp+" + resp);
                        }
                    );
                }
            });
        },
    },
    created() {
        this.trip = this.getTrip;
        console.log(this.trip);
        console.log("created" + this.trip.id);
        this.numbers = Array.from(
            { length: parseInt(this.getTrip.number) },
            (item, index) => index + 1
        );
    },
    computed: {
        getTrip: function () {
            return this.$store.state.tripDetails;
        },
    },
};
</script>

<style scope>
.thumb {
    display: flex;
    width: 1000px;
    height: 350px;
    flex-direction: row;
    margin: auto;
}
.order {
    float: right;
    margin: 10px 20px;
}
.big {
    width: 500px;
}
.title {
    font-size: 25px;
}
.details {
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin: auto;
}
.submitForm {
    margin: auto;
    width: 500px;
}
</style>