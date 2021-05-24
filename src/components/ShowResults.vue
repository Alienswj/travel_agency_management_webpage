<template>
    <div>
        <div class="contrainer">
            <el-row v-for="(trip, index) in getResult" :key="index" class="row">
                <el-card class="card" :body-style="{ padding: '0px' }">
                    <el-col :span="4" class="pic">
                        <el-image
                            :src="
                                require('F:/a学习/毕业论文/pic/trip_pic/' +
                                    trip.id +
                                    '.jpg')
                            "
                            :fit="'fill'"
                        />
                    </el-col>
                    <el-col :span="13">
                        <el-row>
                            <span class="left">{{ trip.title }}</span>
                        </el-row>
                        <el-row>
                            <span class="left"
                                >出发地：{{ trip.destination }}</span
                            >
                        </el-row>
                    </el-col>
                    <el-col :span="3" style="margin-top: 2%">
                        <el-row>
                            <span>价格：{{ trip.price }}</span>
                        </el-row>
                        <el-row
                            ><span>数量：{{ trip.quantity }}</span></el-row
                        >
                    </el-col>

                    <el-col :span="3" style="margin-top: 2%">
                        <el-row>
                            <el-button type="primary" @click="select(index)"
                                >选择</el-button
                            >
                        </el-row>
                    </el-col>
                </el-card>
            </el-row>

            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="handlePrevClick"
                    @next-click="handleNextClick"
                    :total="total"
                    :current-page.sync="current"
                    :hide-on-single-page="true"
                    :page-size="pageSize"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Result",
    data() {
        return {
            total: 0,
            current: 1,
            pageSize: 5,
            search: "",
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log("每页" + val + "条");
        },
        handleCurrentChange(val) {
            console.log("当前第" + val + "页");
            this.changePage("/trip/query", val);
        },
        handlePrevClick() {
            if (this.current > 1) {
                this.current -= 1;
                this.$store.state.pagination.current = this.current;
                console.log(
                    "prevclickpage" + this.$store.state.pagination.current
                );
                //this.changePage("/trip/query", this.current);
            }
        },
        handleNextClick() {
            if (this.current * this.pageSize < this.total) {
                this.current += 1;
                this.$store.state.pagination.current = this.current;
                console.log(
                    "nextclickpage" + this.$store.state.pagination.current
                );
                //this.changePage("/trip/query", this.current);
            }
        },
        changePage(url, current) {
            this.getRequest(url, {
                destination: this.$store.state.queryCondition.destination,
                date: this.$store.state.queryCondition.date,
                current: current,
                pageSize: this.pageSize,
            }).then((resp) => {
                console.log(resp);
                //this.$store.commit("initSearchResult", null);
                //console.log("showResults + commit1");
                this.$store.commit("initSearchResult", resp.obj);
                this;
            });
        },
        handleSelect(index, row) {
            console.log(index, row);
            this.orderForm.tid = row.id;
        },
        select(index) {
            console.log(index);
            //this.$store.commit("initGetTripDetails", null);
            this.$store.commit("initGetTripDetails", this.getResult[index]);
            this.$router.push("/trip_details");
        },
        booking() {
            console.log(null);
        },
    },
    computed: {
        getResult() {
            console.log("检测到数据");
            console.log(this.$store.state.searchResult);
            return this.$store.state.searchResult;
        },
        getTotal() {
            return this.$store.state.pagination.total;
        },
    },
    beforeUpdate: function () {
        this.total = this.$store.state.pagination.total;
        this.current = this.$store.state.pagination.current;
    },
};
</script>
<style scope>
.contrainer {
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin: auto;
    padding: 20px;
}
.block {
    margin: auto;
}
.pic {
    width: 200px;
    height: 120px;
}
</style>