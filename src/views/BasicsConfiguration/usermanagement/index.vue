<template>
  <div>
    <el-container>
      <el-header>
        <div class="head" style="float: right">
          <el-input
            size="medium"
            class="searchUser"
            placeholder="关键字"
            suffix-icon="el-icon-search"
            v-model="searchInfo"
          >
          </el-input>
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            @click="openAdd"
            >添加</el-button
          >
          <!-- <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="editUser"
            >编辑</el-button
          > -->
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete-solid"
            @click="deleteUser"
            >删除</el-button
          >
          <el-button
            type="info"
            size="small"
            icon="el-icon-search"
            @click="find"
            >刷新</el-button
          >
          <el-button type="warning" size="small" icon="el-icon-user" @click="setRole"
            >为用户分配角色</el-button
          >
        </div>
      </el-header>
      <el-container>
        <!-- <el-aside width="400px" height="2000px" style="overflow: hidden"> -->
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          >
          </el-tree>
        <!-- </el-aside> -->
        <el-main>
          <div class="table">
            <div class="box-shadow">
              <!--表格里面-->
              <el-table
                :data="tableData"
                border
                ref="multipleTable"
                style="width: 95%"
                @selection-change="handleSelectionChange"
              >
                <!-- 解决使用多选框选择多条数据，翻页后一般会重新请求后台，之前选择的数据就会丢失 -->
                <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="Id" label="ID" sortable width="320">
                </el-table-column>

                <el-table-column prop="Account" label="账号" width="150">
                </el-table-column>
                <el-table-column prop="Names" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="TypeName" label="所属部门" width="150">
                </el-table-column>

                <el-table-column
                  prop="Status"
                  label="状态"
                  width="150"
                  :formatter="formatBoolean"
                >
                </el-table-column>
                <el-table-column prop="TypeName" label="描述" width="100">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click="editOneUser(scope.row)"
                      type="primary"
                      size="small"
                      >编辑</el-button
                    >
                    <el-button
                      type="danger"
                      v-if="scope.row.Status == 0"
                      @click="PutUserStatusNO(scope.row)"
                      size="small"
                      >停用</el-button
                    >
                    <el-button
                      type="danger"
                      v-if="scope.row.Status == 1"
                      @click="PutUserStatusOK(scope.row)"
                      size="small"
                      >启用</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
            <!--表格尾-->
          </div>

          <!-- 新增表单 -->
          <el-dialog
            title="添加"
            :visible.sync="dialogAddVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :model="addForm"
              ref="addForm"
              label-width="100px"
              class="demo-addForm"
            >
              <el-form-item label="账号">
                <el-input v-model="addForm.Account"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="addForm.Names"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="addForm.Password" show-password></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select
                  v-model="addForm.Status"
                  placeholder="请选择"
                  style="margin-right: 210px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属机构">
                <el-select v-model="addForm.TypeId" placeholder="请选择" style="margin-right: 210px">
                  <el-option
                    class="treeSelect"
                    :label="treeName"
                    :value="addForm.TypeId"
                  >
                    <el-tree
                      :data="data"
                      show-checkbox
                      node-key="id"
                      :default-expanded-keys="[2, 3]"
                      :default-checked-keys="[5]"
                      :props="defaultProps"
                      @node-click="nodeTree"
                    >
                    </el-tree>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="性别" style="margin-right: 210px">
                <el-radio v-model="addForm.Sex" :label="0">男</el-radio>
                <el-radio v-model="addForm.Sex" :label="1">女</el-radio>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogAddVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUsers()">提 交</el-button>
            </span>
          </el-dialog>
          <!-- 修改表单 -->
          <el-dialog
            title="修改"
            :visible.sync="dialogEditVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-form
              :model="editForm"
              ref="editForm"
              label-width="100px"
              class="demo-editForm"
            >
              <el-form-item label="账号">
                <el-input v-model="editForm.Account"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="editForm.Names"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="editForm.Password" show-password></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select
                  v-model="editForm.Status"
                  placeholder="请选择"
                  style="margin-right: 210px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属机构">
               <el-select v-model="addForm.TypeId" placeholder="请选择" style="margin-right: 210px">
                  <el-option
                    class="treeSelect"
                    :label="treeName"
                    :value="addForm.TypeId"
                  >
                    <el-tree
                      :data="data"
                      show-checkbox
                      node-key="id"
                      :default-expanded-keys="[2, 3]"
                      :default-checked-keys="[5]"
                      :props="defaultProps"
                      @node-click="nodeTree"
                    >
                    </el-tree>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="性别" style="margin-right: 210px">
                <el-radio v-model="editForm.Sex" :label="0">男</el-radio>
                <el-radio v-model="editForm.Sex" :label="1">女</el-radio>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="editOneUsers()"
                >提 交</el-button
              >
            </span>
          </el-dialog>
          <!-- 分配角色 -->
          <el-dialog
            title="分配角色"
            :visible.sync="dialogsetRoleVisible"
            width="40%"
            :before-close="handleClose"
          >
             <el-table
                :data="tableRoleData"
                border
                ref="multipleTable"
                style="width: 100%"
                @selection-change="handleSelectionChangeRole"
              >
               
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="Name" label="角色名称" width="400">
                </el-table-column>
                <el-table-column
                  prop="Status"
                  label="状态"
                  width="120"
                  :formatter="formatBoolean"
                >
                </el-table-column>
              </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogsetRoleVisible = false">取 消</el-button>
              <el-button type="primary" @click="setUsertoRole()"
                >提 交</el-button
              >
            </span>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "@/router/axios";
//import {getUrl} from '@/router/CRUD';
export default {
  created() {
    this.getTree();
    this.getUsers();
    this.getRoleInfo();
  },
  data() {
    return {
      //分页组件赋值
      currentPage: 1,
      size: 2,
      total: 0,
      // 数据表格数据
      tableData: [],
      tableRoleData:[], //分配角色的表格数据
      dialogAddVisible: false, //新增弹框默认值
      dialogEditVisible: false, //新增弹框默认值
      dialogsetRoleVisible:false,
      UId: [], //多选框id容器
      RoleId:[],//分配角色多选框容器

      chooseRoleIds:'', //分配角色提交参数ids
      
      addForm: {},
      editForm: {},
      options: [
        {
          value: 0,
          label: "正常",
        },
        {
          value: 1,
          label: "停用",
        },
      ],
      searchInfo: "", //搜索框默认值
      data: [], //组织树数据
      treeName: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      multipleSelection: [],
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },

    //获取组织树数据
    getTree() {
      axios.get("api/Org/GetOrgTree").then((res) => {
        this.data = res.data;
        // this.children=res.data.children;
        // this.id=res.data.id,
        // this.label=res.data.label;
      });
    },
    //获取主区域用户信息
    getUsers() {
      axios
        .get(
          "api/Users/GetUsers?page=" +
            this.currentPage +
            "&limit=" +
            this.size +
            "&name=" +
            this.searchInfo
        )
        .then((res) => {
          this.tableData = res.data.data;
          //console.log(res.data.count);
          this.total = res.data.count;
        });
    },
    //获取角色信息
    getRoleInfo() {
      axios
        .get(
          "api/Role/GetRole" 
        )
        .then((res) => {
          this.tableRoleData = res.data.data;
          //console.log(res.data.count);
        });
    },
    //表格多选框选择
    handleSelectionChange(val) {
      //this.multipleSelection = val;
      this.UId = [];
      for (let i = 0; i < val.length; i++) {
        this.UId.push(val[i].Id);
      }
      //console.log(this.UId);
    },
    //分配角色表格多选框选择
    handleSelectionChangeRole(val){
     // console.log(val);
        this.RoleId = [];
      for (let i = 0; i < val.length; i++) {
        this.RoleId.push(val[i].Id);
      }
      //console.log(this.RoleId);
      let roleIds = this.RoleId.join(",");
        console.log(roleIds);
        this.chooseRoleIds=roleIds;
    },
    //查询
    find() {
      this.getUsers();
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers();
    },
    //改变分页容量
    handleSizeChange(val) {
      this.size = val;
      this.getUsers();
    },
    //添加按钮
    openAdd() {
      this.dialogAddVisible = true;
    },
    //新增用户
    addUsers() {
      console.log(this.addForm);
      axios({
        url: "api/Users/AddUsers",
        method: "post",
        data: this.addForm,
      }).then((Response) => {
        console.log(Response.data.code);
        if (Response.data.code == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
          });
          this.dialogAddVisible = false;
        }
      });
    },
    //全局编辑按钮
    editUser() {
      //console.log(this.multipleSelection);
    },

    //表格内编辑单个(反填信息)
    editOneUser(row) {
      console.log(row);
      this.editForm = row;
      this.dialogEditVisible = true;
    },
    //调用修改方法
    editOneUsers() {
      this.editForm.TypeId = this.data[0].id;
      this.editForm.TypeName = this.data[0].label;
      axios({
        url: "api/Users/PutUsers",
        method: "put",
        data: this.editForm,
      }).then((Response) => {
        if (Response.data.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogEditVisible = false;
        }
      });
    },
    // 关闭弹出框
    handleClose() {
      // this.$confirm('确认关闭？')
      this.dialogAddVisible = false;
      this.dialogEditVisible = false;
      this.dialogsetRoleVisible=false;
    },
    //显示状态
    formatBoolean: function (row, column, cellValue) {
      var ret = ""; //你想在页面展示的值
      if (cellValue == 0) {
        ret = "正常"; //根据自己的需求设定
      } else if (cellValue == 1) {
        ret = "停用";
      }
      return ret;
    },
    // 停用
    PutUserStatusNO(row) {
      console.log(row);
      axios({
        url: "api/Users/PutUserStatusNO?Id=" + row.Id,
        method: "put",
        data: row.Id,
      }).then((Response) => {
        if (Response.data.code == 200) {
          this.$message({
            message: "停用成功",
            type: "success",
          });
        }
      });
    },

    // 启用
    PutUserStatusOK(row) {
      console.log(row);
      axios({
        url: "api/Users/PutUserStatusOK?Id=" + row.Id,
        method: "put",
        data: row.Id,
      }).then((Response) => {
        if (Response.data.code == 200) {
          this.$message({
            message: "启用成功",
            type: "success",
          });
        }
      });
    },
    //删除
    deleteUser() {
      //console.log(this.UId);
      let ids = this.UId.join(",");
      console.log(ids);

      this.$confirm("确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios({
            url: "api/Users/DeleteUserById?Id=" + ids,
            method: "delete",
          }).then((res) => {
            console.log(res.data.data);
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              //刷新页面
              this.$router.go(0);
            } else {
              this.$message.error("错了哦！！！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分配角色按钮
    setRole(){
        if(this.UId.length==0)
        {
          this.$message({message: '请至少选择一个用户',type: 'warning'});
            return;
        }
        this.dialogsetRoleVisible=true;
    },
    //提交分配数据
    setUsertoRole(){
       let ids = this.UId.join(",");
      console.log(ids);
      console.log(this.chooseRoleIds);

      let setRoleToUser={};
      setRoleToUser.UserId=ids;
      setRoleToUser.RoleId=this.chooseRoleIds;
      console.log(setRoleToUser);
      axios({
        url: "api/Users/SelectRoleToUser",
        method: "post",
        data:setRoleToUser,
      }).then((Response) => {
        if (Response.data.code == 200) {
          this.$message({
            message: "分配成功",
            type: "success",
          });
          this.dialogsetRoleVisible=false;
        }
      });
    },
    //新增弹框时下拉触发树操作数据节点
    nodeTree(obj, node) {
      this.treeName = obj.label;
      this.addForm.TypeId = obj.id;
      this.addForm.TypeName = obj.label;
      console.log(obj);
      console.log(node);
      //console.log(this.addForm.TypeId);
    },
  },
};
</script>

<style scoped>
.searchUser {
  width: 200px;
}
.treeSelect {
  height: 100%;
}
.el-header{
  background-color: rgba(229, 222, 222, 0.173);
  line-height: 55px;
}
.el-footer {
  background-color:white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color:rgb(214, 117, 117);
  color: rgb(22, 20, 20);
  text-align: center;
  line-height: 900px;
}

.el-main {
  background-color:white;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 875px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-tree {
    position: relative;
    cursor: default;
    background: #FFF;
    color: #606266;
    width: 310px;
    margin-top: 30px;
    margin-left: 30px;
}
</style>
