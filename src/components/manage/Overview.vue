<template>
    <div class="overview">
        <h3>今天是{{ today }}</h3>
        <el-card :body-style="{ padding: '0px' }">
            <div class="greeting">
                <div class="text">
                    {{ $store.state.currentUser.name }}，{{ greetText }}
                </div>
                <div class="weather">
                    今日{{ weather.wea }}，{{ weather.tem }}度，{{
                        weather.air_tips
                    }}
                </div>
            </div>
            <div class="number">
                <i class="el-icon-map-location"></i>线路数：{{ TripsNumber }}
            </div>
            <div class="number">
                <i class="el-icon-user"></i>用户数：{{ UsersNumber }}
            </div>
        </el-card>
        <div class="ov">
            <div class="trips">
                <h3>线路概览</h3>
                <el-table :data="trips" border>
                    <el-table-column fixed prop="destination" label="目的地">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="number"
                        label="条数"
                    ></el-table-column>
                </el-table>
            </div>
            <div class="users">
                <h3>用户概览</h3>
                <el-table :data="users" border>
                    <el-table-column fixed prop="number" label="用户数">
                    </el-table-column>
                </el-table>
            </div>
            <div class="todo">
                <h3>今日任务</h3>
                <el-input
                    placeholder="添加一个任务"
                    v-model="items.content"
                    @change="addTask"
                ></el-input>
                <ul class="task">
                    <li v-for="(item, index) in list" :key="index">
                        <input
                            @click="changeState(index)"
                            :checked="item.finished"
                            type="checkbox"
                        />
                        <span :class="{ finish: item.finished }">{{
                            item.content
                        }}</span>
                        <button @click="removeList(index)" class="del">
                            删除
                        </button>
                    </li>
                </ul>
                <p class="empty" v-if="list.length === 0">暂无内容</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "overview",
    data() {
        return {
            greetText: this.getGreet(),
            weather: {
                wea: "晴",
                tem: 20,
                air_tips: "test",
            },
            TripsNumber: 0,
            UsersNumber: 0,
            trips: [
                {
                    destination: "成都",
                    number: "0",
                },
            ],
            users: [
                {
                    number: 4,
                },
            ],
            items: {
                content: "", //初始化内容为空，不能省略
                finished: false, //未完成
                deleted: false, //未删除
            },
            list: [
                {
                    content: "用户杜宝龙触发违规，请封禁！",
                    finished: true,
                    delete: false,
                },
                {
                    content: "为迎接节日，将重庆的旅行线路降价10%。",
                    finished: false,
                    deleted: false,
                },
            ],
            now: Date(),
        };
    },
    methods: {
        getGreet() {
            let hours = new Date().getHours();
            let text = "";
            if (hours >= 0 && hours <= 10) {
                text = `早上好，请开始您一天的工作吧！`;
            } else if (hours > 10 && hours <= 13) {
                text = `中午好，别忘记吃午饭哟！`;
            } else if (hours > 13 && hours <= 18) {
                text = `下午好，努力工作，认真生活！`;
            } else if (hours > 18 && hours <= 24) {
                text = `晚上好，该下班回家啦！`;
            }
            console.log(`hours >>>>>`, hours);
            console.log(`text >>>>`, text);
            return text;
        },
        addTask() {
            //将任务存入数组
            this.list.push(this.items);
            //重置 items
            this.items = {
                content: "", //初始化内容为空，不能省略
                finished: false, //未完成
                deleted: false, //未删除
            };
        },
        //选中改变状态
        changeState(index) {
            let curState = this.list[index].finished;
            this.list[index].finished = !curState;
        },
        //删除
        removeList(index) {
            this.list.splice(index, 1);
        },
    },
    computed: {
        today: function () {
            return new Date().toLocaleDateString();
        },
    },
    mounted() {
        this.greetText = this.getGreet();

        // this.getRequest(
        //     "https://v0.yiketianqi.com/api?version=v62&appid=83326921&appsecret=l0a395If&cityid=101270106"
        // ).then((resp) => {
        //     console.log(resp);
        //     this.weather = resp;
        // });
        this.getRequest("/trip/get_total_trips_number").then((resp) => {
            this.TripsNumber = resp;
        });
        this.getRequest("/user/get_total_users_number").then((resp) => {
            this.UsersNumber = resp;
        });
        this.getRequest("/trip/get_total_trips_number_by_destination").then(
            (resp) => {
                console.log("gettotaltrip_number>>>" + resp);
                this.trips = resp;
            }
        );
    },
};
</script>

<style scoped>
.card {
    width: 100%;
}
.text {
    font-size: 30px;
}
.weather {
    font-size: 20px;
    color: grey;
}
.greeting {
    width: 800px;
    margin: 20px;
    display: inline-block;
}
.number {
    width: 200px;
    font-size: 20px;
    margin: 40px;
    float: right;
}
.ov {
    display: flex;
    margin: auto;
}
.trips {
    margin: 50px;
    width: 400px;
}
.users {
    margin: 50px;
    width: 200px;
}
.todo {
    margin: 50px;
    width: 500px;
}
.edit {
    display: block;
    line-height: 35px;
    box-sizing: border-box;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
}
.task li {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    list-style: none;
}

.task li:last-child {
    border-bottom: 0;
}

.finish {
    text-decoration: line-through;
    color: #ccc;
}
.del {
    background: red;
    text-decoration: none;
    position: absolute;
    right: 0;
    font-size: 12px;
    border: 0;
    outline: 0;
    padding: 2px 5px;
    border-radius: 5px;
    color: #fff;
}

.empty {
    font-size: 13px;
    color: #000;
    text-align: center;
    padding: 10px 0;
}
</style>