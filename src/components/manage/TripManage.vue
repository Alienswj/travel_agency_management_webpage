<template>
    <div>
        <el-button type="primary" @click="addTrip()">新增线路</el-button>
        <el-table
            :data="
                trips.filter(
                    (data) => !search || data.destination.includes(search)
                )
            "
            border
            style="width: 100%"
        >
            <el-table-column fixed prop="id" label="线路编号" width="200">
            </el-table-column>
            <el-table-column prop="title" label="线路标题" width="200">
            </el-table-column>
            <el-table-column prop="destination" label="目的地" width="120">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="120">
            </el-table-column>
            <el-table-column prop="features" label="特色" width="600">
            </el-table-column>
            <el-table-column prop="notice" label="注意事项" width="600">
            </el-table-column>
            <!-- <el-table-column prop="status" label="线路状态" width="120">
            </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="200">
                <template slot="header" slot-scope="{}">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入目的地关键字搜索"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        @click="handleDelete(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="addTrip">
            <el-dialog
                class="changeDialog"
                title="新增线路"
                :visible.sync="addVisible"
                width="30%"
            >
                <el-form :model="trip" ref="trip" label-width="300px">
                    <el-form-item
                        label="路线标题"
                        prop="title"
                        :label-width="formLabelWidth"
                        ><el-input v-model="trip.title"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="目的地"
                        prop="destination"
                        :label-width="formLabelWidth"
                        ><el-input v-model="trip.destination"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="价格"
                        prop="price"
                        :label-width="formLabelWidth"
                        ><el-input v-model="trip.price"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="特色"
                        prop="features"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="trip.features"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="线路介绍"
                        prop="introduction"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="trip.introduction"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="注意事项"
                        prop="notice"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="trip.notice"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd()"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
        <div class="changeTrip">
            <el-dialog
                class="changeDialog"
                title="编辑线路"
                :visible.sync="editVisible"
                width="30%"
            >
                <el-form :model="temp" ref="temp" label-width="300px">
                    <el-form-item
                        label="路线标题"
                        prop="title"
                        :label-width="formLabelWidth"
                        ><el-input v-model="temp.title"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="目的地"
                        prop="destination"
                        :label-width="formLabelWidth"
                        ><el-input v-model="temp.destination"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="价格"
                        prop="price"
                        :label-width="formLabelWidth"
                        ><el-input v-model="temp.price"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="特色"
                        prop="features"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="temp.features"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="线路介绍"
                        prop="introduction"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="temp.introduction"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="注意事项"
                        prop="notice"
                        :label-width="formLabelWidth"
                        ><el-input
                            type="textarea"
                            v-model="temp.notice"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitChange()"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name: "TripManage",
    data() {
        return {
            trips: [],
            search: "",
            temp: {
                id: "",
                title: "",
                price: 0,
                features: "",
                notice: "",
                introduction: "",
                destination: "",
                number: "",
            },
            trip: {
                title: "",
                price: 0,
                features: "",
                notice: "",
                introduction: "",
                destination: "",
                //number: "",
                //fee: "",
            },
            editVisible: false,
            addVisible: false,
            formLabelWidth: "120px",
        };
    },
    methods: {
        handleDelete(data) {
            console.log(data);
            this.temp = JSON.parse(JSON.stringify(data));
            this.deleteRequest("/trip/delete_trip", this.temp.id).then(
                (resp) => {
                    console.log(resp);
                }
            );
        },
        handleEdit(data) {
            console.log(data);
            this.temp = JSON.parse(JSON.stringify(data)); //深拷贝
            this.editVisible = true;
        },
        submitChange() {
            this.postRequest("/trip/update_trip", this.temp).then((resp) => {
                console.log(resp);
            });
        },
        addTrip() {
            this.addVisible = true;
        },
        submitAdd() {
            console.log("add");
            this.postRequest("/trip/add_trip", this.trip).then((resp) => {
                console.log(resp);
            });
        },
    },
    created() {
        this.getRequest("/trip/get_all_trips").then((resp) => {
            console.log(resp);
            this.trips = resp;
        });
    },
};
</script>
<style scoped>
</style>