<template>
    <div class="search">
        <div class="searchBlock">
            <div class="searchForm">
                <el-autocomplete
                    class="search_components"
                    v-model="searchForm.destination"
                    :fetch-suggestions="querySearch"
                    placeholder="选择一个目的地吧"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                >
                </el-autocomplete>
                <el-date-picker
                    class="search_components"
                    v-model="searchForm.date"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                >
                </el-date-picker>
                <el-button
                    type="primary"
                    @click="submitForm(searchForm)"
                    class="search_components"
                    >查询</el-button
                >
            </div>
        </div>
        <show-results
            v-if="this.$store.state.searchResult != undefined"
        ></show-results>
        <el-row class="recommend" v-else>
            <el-col
                :span="5"
                v-for="(trip, index) in recommend"
                :key="index"
                :offset="index > 0 ? 1 : 0"
            >
                <el-card :body-style="{ padding: '0px' }">
                    <el-image
                        :src="
                            require('F:/a学习/毕业论文/pic/trip_pic/' +
                                trip.src +
                                '.jpg')
                        "
                        class="image"
                        :fit="'fill'"
                    />
                    <div style="padding: 14px">
                        <span class="keyword">{{ trip.keyword }}</span>
                        <div class="bottom clearfix">
                            <span>{{ trip.title }}</span>
                            <!-- <el-button type="text" class="button"
                                >操作按钮</el-button
                            > -->
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ShowResults from "./ShowResults.vue";
export default {
    components: { ShowResults },

    data() {
        return {
            citys: [],
            searchForm: {
                destination: "",
                date: "",
                current: 1,
                pageSize: 5,
            },
            pagination: {
                current: 1,
                pageSize: 5,
                total: 0,
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },
            recommend: [
                {
                    keyword: "看国宝",
                    title: "熊猫基地惬意一日游",
                    src: "8e4a9781429c92a3ddef0e595af45ed6",
                },
                {
                    keyword: "古迹游",
                    title: "一起领略乐山大佛的伟岸",
                    src: "27c9ccffcd6d44a794e1035022084774",
                },
                {
                    keyword: "文艺范",
                    title: "来博舍探索中式传统风格",
                    src: "b4fb0502a1296ac2ad2662e3f87a08d2",
                },
                {
                    keyword: "享受自然",
                    title: "在青城山呼吸新鲜空气",
                    src: "4946523a64274d7a3ea773ac0b8a7be7",
                },
            ],
        };
    },
    methods: {
        submitForm(formName) {
            if (this.pagination.total == 0) {
                this.getRequest("/trip/getTotalNumber", formName).then(
                    (resp) => {
                        console.log(resp);
                        this.pagination.total = resp;

                        this.$store.commit(
                            "initGetPagination",
                            this.pagination
                        );
                        console.log(this.$store.state.pagination);
                    }
                );
            }
            this.getRequest("/trip/query", formName).then((resp) => {
                console.log(resp);
                this.$store.commit("initSearchResult", null);
                console.log("searchTrip+ commit1");
                this.$store.commit("initSearchResult", resp.obj);
                console.log("searchTrip+ commit2");
                this.$store.commit("initQueryCondition", {
                    date: this.searchForm.date,
                    destination: this.searchForm.destination,
                });
            });
        },
        querySearch(queryString, cb) {
            var citys = this.citys;
            var results = queryString
                ? citys.filter(this.createFilter(queryString))
                : citys;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (city) => {
                return (
                    city.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        loadAll() {
            return [
                { value: "成都" },
                { value: "北京" },
                { value: "上海" },
                { value: "广州" },
                { value: "深圳" },
                { value: "合肥" },
                { value: "苏州" },
                { value: "重庆" },
            ];
        },
        handleSelect(item) {
            console.log(item);
        },
    },
    mounted() {
        this.citys = this.loadAll();
    },
    computed() {
        this.pagination.total = this.$store.state.pagination.total;
    },
};
</script>
<style scoped>
.search {
    display: flex;
    flex-direction: column;
    height: 850px;
}
.searchBlock {
    height: 400px;
    background-image: url(../assets/img/background/back.jpg);
    background-position: center;
    background-size: cover;
}
.search_components {
    margin: 10px;
}
.searchForm {
    width: 600px;
    margin: 100px auto;
}
/* #search {
    /* background-image: url(../assets/img/background/back.jpg);
    background-position: center;
    background-size: cover;
    margin: auto auto;
    height: 400px;
    width: 100%;
} */
/* .inline-input {
    width: 400px;
    margin: 0 auto;
    padding: 30px;
} */
.keyword {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 10px;
}
.image {
    display: block;
}
.recommend {
    margin: auto;
}
</style>