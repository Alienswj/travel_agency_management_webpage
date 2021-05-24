<template>
    <div class="my_orders">
        <div><el-button @click="$router.go(-1)">返回</el-button></div>
        <div class="result">
            <el-table
                :data="
                    orders.filter(
                        (data) => !search || data.title.includes(search)
                    )
                "
                style="width: 100%"
                :default-sort="{ prop: 'date', order: 'descending' }"
            >
                <el-table-column label="订单号" prop="oid"> </el-table-column>
                <el-table-column label="线路名" prop="title"> </el-table-column>
                <el-table-column label="旅行日期" prop="date">
                </el-table-column>
                <el-table-column label="价格" prop="price"> </el-table-column>
                <el-table-column label="数量" prop="quantity">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="{}">
                        <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入路线名关键字搜索"
                        />
                    </template>
                    <template slot-scope="scope">
                        <el-button
                            v-if="Date.parse(scope.row.date) > Date.now()"
                            size="mini"
                            @click="handleChange(scope.$index, scope.row)"
                            >改签</el-button
                        >

                        <el-button
                            v-if="Date.parse(scope.row.date) > Date.now()"
                            size="mini"
                            @click="handleRefund(scope.$index, scope.row)"
                            >退票</el-button
                        >
                        <el-button
                            v-if="Date.parse(scope.row.date) < Date.now()"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                        <el-button
                            v-if="Date.parse(scope.row.date) < Date.now()"
                            size="mini"
                            @click="handleEvaluate(scope.$index, scope.row)"
                            >评价</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="changeTrip">
            <el-dialog
                class="changeDialog"
                title="改签"
                :visible.sync="changeFormVisible"
                width="20%"
            >
                <el-form
                    :model="changeForm"
                    ref="changeForm"
                    label-width="300px"
                >
                    <el-form-item
                        label="原出发时间"
                        prop="odate"
                        :label-width="formLabelWidth"
                    >
                        <el-date-picker
                            disabled
                            v-model="changeForm.odate"
                            format="yyyy 年 MM 月 dd 日"
                        ></el-date-picker
                    ></el-form-item>

                    <el-form-item
                        label="改签至"
                        prop="ndate"
                        :label-width="formLabelWidth"
                        ><el-date-picker
                            v-model="changeForm.ndate"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="changeFormVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="submitForm()"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name: "myOrder",
    data() {
        return {
            orders: [],
            search: "",
            changeForm: {
                tid: "",
                oid: "",
                odate: "",
                ndate: "",
            },
            changeFormVisible: false,
            formLabelWidth: "120px",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },
        };
    },
    methods: {
        handleChange(index, row) {
            console.log(index, row);
            this.changeForm.tid = row.tid;
            this.changeForm.oid = row.oid;
            this.changeForm.odate = row.date;
            this.changeFormVisible = true;
        },
        submitForm() {
            console.log(this.changeForm);
            this.postRequest("/orders/change", this.changeForm).then((resp) => {
                console.log(resp);
                this.changeFormVisible = false;
            });
        },
        handleRefund(index, row) {
            console.log(index, row);
            this.postRequest("/orders/refund", row).then((resp) => {
                console.log(resp);
            });
        },
        handleDelete(index, row) {
            this.postRequest("/orders/delete", row.oid).then((resp) => {
                console.log(resp);
            });
        },
        handleEvaluate(index, row) {
            console.log(index, row);
        },
        isBefore(orderDate) {
            //console.log(orderDate, Date(), orderDate > Date());
            let date = new Date(orderDate);
            console.log(
                date,
                Date(),
                date > Date(),
                date.getDate > Date().getDate
            );
            return date > Date();
        },
    },
    created() {
        console.log(this.$store.state.currentUser.id);
        this.postRequest(
            "/orders/get_my_orders",
            this.$store.state.currentUser.id
        ).then((resp) => {
            console.log(resp);
            this.orders = resp.obj;
        });
    },
};
</script>
<style scoped>
.my_orders {
    display: flex;
    flex-direction: column;
    width: 1200px;
    margin: auto;
    padding: 100px;
}
</style>