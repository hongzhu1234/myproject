<template>
  <div class="createPost-container">
    <el-form
      class="form-container"
      :model="postObj"
      :rules="rules"
      ref="postObj"
    >
      <el-steps class="steps" :active="active" finish-status="success">
        <el-step title="基础信息"></el-step>
        <el-step title="选择表单"></el-step>
        <el-step title="流程设计"></el-step>
      </el-steps>
      <div class="createdPost-content">
        <!--基础信息-->
        <div class="createPost-main-container basic" v-show="active == 0">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="标题"
                label-width="100px"
                prop="schemeNameRule">
                <el-input
                  name="name"
                  v-model="postObj.schemeName"
                  required
                  style="max-width: 200px">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="100px" label="模板编号:">
                <el-input
                  type="text"
                  v-model="postObj.schemeCode"
                  style="max-width: 200px">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="100px"
                label="发布时间:"
                class="postInfo-container-item">
                <el-date-picker
                  v-model="postObj.createDate"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="100px"
                label="重要性(占位):"
                class="postInfo-container-item"
              >
                <el-rate
                  style="margin-top: 8px"
                  :max="3"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  :low-threshold="1"
                  :high-threshold="3"
                >
                </el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="100px" label="摘要:">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="postObj.description"
                >
                </el-input>
                <span class="word-counter" v-if="contentShortLength"
                  >{{ contentShortLength }}字</span
                >
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="createPost-main-container" v-show="active == 1">
          <el-tabs
            type="border-card"
            v-model="postObj.frmId"
            @tab-click="handleTabClick"
          >
            <div class="createPost-main-model"></div>
            <template v-for="item in forms">
              <el-tab-pane
                :label="item.Name"
                :name="item.Id"
                :id="item.Id"
                :key="item.Id"
              >
                <!-- 自定义表单 -->
                <el-card class="box-card" v-if="item.FrmType == 1">
                  <component
                    ref="frmData"
                    v-bind:is="item.WebId + 'Add'"
                  ></component>
                </el-card>
                <el-card v-else-if="item.FrmType === 2">
                  <CreatedForm
                    insite="true"
                    :isDisabled="true"
                    ref="createdForm"
                    v-if="
                      createdFormData.list && createdFormData.list.length > 0
                    "
                    :data="createdFormData"
                    :value="defaultValue"
                  >
                  </CreatedForm>
                </el-card>
                <!-- <p v-html="frmPreview" v-else></p> -->
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
        <!--流程设计-->
        <div class="editor-container" style="height: 100%" v-if="active == 2">
          <CreatedFlow
            ref="createdFlow"
            :form-template="currentForm"
            :isEdit="isEdit"
            :scheme-content="postObj.schemeContent"
          ></CreatedFlow>
        </div>
      </div>

      <div class="edit-btns text-center">
        <el-button
          size="small"
          v-if="active > 0"
          style="margin-left: 10px"
          type="primary"
          @click="pre"
          >上一步</el-button
        >
        <el-button
          size="small"
          v-if="active < 2"
          style="margin-left: 10px"
          type="primary"
          @click="next"
          >下一步</el-button
        >
        <el-button
          size="small"
          v-if="active === 2"
          v-loading="loading"
          style="margin-left: 10px"
          type="success"
          @click="submitForm"
          >保存
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import CreatedFlow from "@/components/CreatedFlow";
import CreatedForm from "@/components/Formcreated/components/CreatedForm";
import Sticky from "@/components/Sticky"; // 粘性header组件
//import * as flowschemes from "@/api/flowschemes";
import { mapGetters, mapActions } from "vuex";
const defaultScheme = {
  id: undefined,
  schemeCode: new Date().getTime().toString(),
  frmId: "",
  frmType: 0,
  description: "",
  schemeName: "",
  delete: 0, // 删除标记
  enabled: 1,
  orgId:"",
  schemeContent: "" // 表单中的控件属性描述
};
export default {
  name: "flow-scheme-dtl",
  components: {
    MDinput,
    Sticky,
    CreatedForm,
    CreatedFlow
  },
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
      createdFormData: {
        list: [],
        config: {}
      },
      defaultValue: {},
      postObj: Object.assign({}, defaultScheme),
      loading: false,
      forms: [],
      currentForm: null, // 当前选中的form表单字段信息
      frmview: "",
      active: 0,
      rules: {
        schemeNameRule: [
          {
            validator: validateRequire
          }
        ],
        frmRule: [
          {
            validator: validateRequire
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["defaultorgid", "flowDetails", "addFlowDetail"]),
    //识别字数
    contentShortLength() {
      return this.postObj.description ? this.postObj.description.length : 0;
    }
  },
  created() {
    this.LoadData();
this.getList();

  },
  beforeDestroy() {
    this.postObj.schemeContent =
      (this.$refs.createdFlow &&
        JSON.stringify(this.$refs.createdFlow.flowData)) ||
      this.postObj.schemeContent;
    if (!this.postObj.id) {
      this.saveAddFlowDetails({
        data: this.postObj,
        active: this.active
      });
      return;
    }
    let data = {};
    data[this.postObj.id] = {
      data: this.postObj,
      active: this.active
    };
    this.saveFlowDetails(data);
  },
  methods: {
    getList(){
      this.$axios.get("/api/Form/GetAllForm").then(res => {
        console.log(res.data.data);
        this.forms = res.data.data;
        if (this.isEdit) {
          const id = this.$route.params && this.$route.params.id;
          // this.postObj = this.flowDetails[id].data;
          this.active = this.flowDetails[id].active;
          this.onFrmChange(this.postObj.frmId);
        }// else {
          // this.postObj = Object.assign(
          //   {},
          //   (this.addFlowDetail && this.addFlowDetail.data) || defaultScheme
          // );
          this.active = (this.addFlowDetail && this.addFlowDetail.active) || 0;
          this.postObj.frmId = this.forms[0].Id;
          this.onFrmChange(this.postObj.frmId);  
      });
    },
    LoadData(){ 
      const form = this.$route.params.forms;
      console.log(this.$route.params.forms);
      this.postObj.id = form.data.Id;
      //标题
      this.postObj.schemeName = form.data.SchemeName;

      this.postObj.createDate=form.data.CreateDate;
      //摘要
      this.postObj.description = form.data.Description;
      //表单类型
      this.postObj.frmType = form.data.FrmType;
      this.getList();
      //表单
      this.postObj.schemeContent = form.data.SchemeContent;       
      this.postObj.schemeContent = form.data.SchemeContent;       
      //转换格式并反填表单
     this.$refs.schemeContent.handleGenerateJson(JSON.parse(form.SchemeContent));    
    },

    ...mapActions([
      "saveFlowDetails",
      "saveAddFlowDetails",
      "updateFlowIsRender"
    ]),
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    pre() {
      if (this.active-- < 0) this.active = 0;
    },
    handleTabClick(tab) {
      this.onFrmChange(tab.$attrs.id);
    },
    onFrmChange(val) {
      // 预览表单
      var _this = this;
      this.$axios.get("/api/Form/GetAllForm?id="+val).then(res => 
      {
          console.log(res.data.data);
           _this.postObj.frmType =res.data.data[0].FrmType;
          console.log(_this.postObj.frmType)
            if (res.data.data[0].FrmType === 1) {
            // 自定义表单
            var obj = _this.$refs.frmData[0].getFormInfo();
            _this.currentForm = obj;
            return;
          }
          if (res.data.data[0].FrmType === 2) {
            // 拖动表单
            _this.createdFormData = JSON.parse(res.data.data[0].ContentData);
            _this.currentForm = _this.getFromProperties(
              _this.createdFormData.list
            );
            return;
          }
          _this.frmPreview =res.data.data[0].Content; // 默认动态表单
          console.log(_this.frmPreview);
          _this.currentForm = JSON.parse(res.data.data[0].ContentData);
      });
    },
    getFromProperties(list) {
      //获取拖动表单的字段属性
      var result = [];
      let _this = this;
      list.forEach(val => {
        if (val.type != "grid") {
          result.push({
            name: val.model,
            title: val.Name
          });
        } else {
          //如果是栅格
          val.columns.forEach(col => {
            result = result.concat(_this.getFromProperties(col.list));
          });
        }
      });
      return result;
    },
    submitForm(){
    alert(this.postObj);
          this.$axios({
            url: "/api/FlowScheme/EditForm",
            method: "put",
            data: this.postObj,
          }).then((res) => {
            if (res.data.data > 0) {
              this.$message.success("编辑成功");
              this.$router.push({ path: "/basics/flowschemes" });
            } else {
              this.$message.error("编辑失败");
            }
          });
      
    },
  //   submitForm() {
  //   this.$refs.postObj.validate(valid => {
  //     if (valid) {
        
  //       this.loading = true;
  //       //流程内容
  //       this.postObj.schemeContent = JSON.stringify(
  //         this.$refs.createdFlow.flowData
  //       );
  //       //alert(this.postObj.schemeContent);
  //       // if (this.postObj.schemeContent === "-1") {
  //       //   this.$message({
  //       //     message: "请调整流程设计",
  //       //     type: "error"
  //       //   });
  //       //   this.loading = false;
  //       //   return;
  //       // }
  //       console.log(this.postObj);
  //       // alert(this.defaultorgid);
  //        //this.postObj.orgId = this.defaultorgid;

  //       if (this.isEdit) {
  //         // this.$axios({
  //         //   url: "/api/FlowScheme/EditForm",
  //         //   method: "put",
  //         //   data: this.postObj,
  //         // }).then((res) => {
  //         //   if (res.data.data > 0) {
  //         //     this.$message.success("编辑成功");
  //         //     this.$router.push({ path: "/basics/flowschemes" });
  //         //   } else {
  //         //     this.$message.error("编辑失败");
  //         //   }
  //         // });

  //         alert(this.postObj);

  //         console.log(this.postObj);
  //         flowschemes.update(this.postObj).then(() => {
  //           this.loading = false;
  //           this.updateFlowIsRender(true);
  //           this.$notify({
  //             title: "成功",
  //             message: "修改成功",
  //             type: "success",
  //             duration: 2000
  //           });
  //         });
  //       } else {
  //         // flowschemes.add(this.postObj).then(() => {
  //         //   console.log(this.postObj);
  //         //   this.loading = false;
  //         //   this.updateFlowIsRender(true);
  //         //   this.$notify({
  //         //     title: "成功",
  //         //     message: "创建成功",
  //         //     type: "success",
  //         //     duration: 2000
  //         //   });
  //         // });
  //       }

  //       this.loading = false;
  //     } else {
  //       console.log("error submit!!");
  //       return false;
  //     }
  //   });
  // }
  
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";

.createPost-container {
  margin: 10px;
  padding: 10px;
  background-color: white;
  height: calc(100% - 20px);

  .form-container {
    height: 100%;
  }

  .createdPost-content {
    height: calc(100% - 72px - 57px);
    overflow: auto;
  }

  .createPost-main-container {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 40px;
    position: relative;

    .createPost-main-model {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      cursor: not-allowed;
    }
  }
}

.steps {
  max-width: 1000px;
  margin: 0 auto;

  .el-step__main {
    margin-left: -21px;
  }
}

.edit-btns {
  padding: 20px;
}

.el-tabs--border-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12),
    0 0 6px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>
