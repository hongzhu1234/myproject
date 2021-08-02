<template>
    <el-container style="border: 1px solid #eee">
        <el-main>
            <el-form
                label-width="80px"
                ref="dataForm"
                :model="temp"
                :rules="rules"
            >
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
                        <el-form-item label="日期">
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
                        <el-form-item label="日期">
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

                <el-form-item label="事由">
                    <el-radio-group v-model="temp.reason">
                        <el-radio label="接站(查派车单)"></el-radio>
                        <el-radio label="开会"></el-radio>
                        <el-radio label="因公外出事由"></el-radio>
                        <el-radio label="其他原因"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-row>
                    <el-col :span="16">
                        <el-form-item
                            size="small"
                            :label="'请假说明'"
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
                        <el-form-item label="负责人">
                            <el-input 
                            type="textarea"
                                :rows="3"
                            v-model="temp.boss"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        :on-change="handleChange"
                        :action="baseURL + '/Files/Upload'"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        name="files"
                        :limit="3"
                        list-type="picture"
                        :on-exceed="handleExceed"
                    >
                        <el-button size="small" type="primary"
                            >上传附加，如派车单</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            只能上传不超过1Mb
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
  export default {
    name: 'frm-leave-req-detail',
    props: ['frmData'],
    data() {
      return {
        baseURL: process.env.BASE_IMG_URL
      }
    },
    computed: {
      temp: function() {
        return JSON.parse(this.frmData)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

</style>
