<template>
    <el-container style="border: 1px solid #eee">
        <el-main>
            <el-form
                label-width="80px"
                ref="dataForm"
                :model="temp"
                :rules="rules"
            >
            <el-form-item label="">
               <el-tag>此表必须事前上交人力资源部</el-tag>
            </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门">
                            <el-input v-model="temp.department"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名">
                            <el-input v-model="temp.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请日期">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="temp.startDate"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="上下班">
                            <el-radio-group v-model="temp.requestType">
                                <el-radio label="上班"></el-radio>
                                <el-radio label="下班"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外出时间">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="temp.endDate"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="时间">
                            <el-time-picker
                                type="fixed-time"
                                placeholder="选择时间"
                                v-model="temp.endTime"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-form-item
                            size="small"
                            :label="因公外出事由"
                            prop="requestComment"
                        >
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="temp.requestComment"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="负责人签字">
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="temp.boss"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                            <el-form-item label="">
               <el-tag>注：如事后补此表人力资源部批准接受，谢谢合作</el-tag>
            </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import * as forms from "@/api/forms";

export default {
    name: "frm-leave-req-add",
    components: {},
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === "") {
                this.$message({
                    message: rule.field + "为必传项",
                    type: "error"
                });
                callback(null);
            } else {
                callback();
            }
        };
        return {
            baseURL: process.env.VUE_APP_BASE_API, // api的base_url
            temp: {
                id: "", // ID
                userName: "", // 请假人姓名
                department: "", // 部门
                boss: "",
                requestType: "", // 请假分类，病假，事假，公休等
                startDate: "", // 开始日期
                startTime: "", // 开始时间
                endDate: "", // 结束日期
                endTime: "", // 结束时间
                requestComment: "", // 请假说明
                attachment: "", // 附件，用于提交病假证据等
                files: [],
                extendInfo: "" // 其他信息,防止最后加逗号，可以删除
            },

            loading: false,
            rules: {
                name: [
                    {
                        validator: validateRequire
                    }
                ]
            }
        };
    },

    methods: {
        handleChange(file, fileList) {
            this.temp.files = fileList
                .filter(u => u.status === "success")
                .map(u => u.response.result[0])
                .map(u => {
                    return {
                        fileName: u.fileName,
                        filePath: u.filePath
                    };
                });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        fetchData(id) {
            forms
                .get(id)
                .then(() => {})
                .catch(err => {
                    console.log(err);
                });
        },
        getFormInfo() {
            // 用于流程分支条件选择
            return [
                {
                    name: "userName",
                    title: "请假人姓名"
                },
                {
                    name: "startDate",
                    title: "开始日期"
                },
                {
                    name: "endDate",
                    title: "结束日期"
                },
                {
                    name: "requestComment",
                    title: "请假说明"
                }
            ];
        },
        getData() {
            return this.temp;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
