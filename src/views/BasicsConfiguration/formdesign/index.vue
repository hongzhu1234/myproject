<template>
  <div>
    <!--查询-->
    <div class="Cradbox">
      <div class="right">
        <el-input v-model="sName" placeholder="名称" size="mini" class="name" @keyup.enter.native="addAnswer"></el-input>&ensp;
        <el-button type="success"  size="mini"   @click="$router.push('/insertInfo')" icon="el-icon-plus">添加</el-button>
        <el-button type="primary"   size="mini" icon="el-icon-edit" @click="handleUpdate">编辑</el-button>
        <el-button type="danger"  size="mini"  icon="el-icon-delete" @click="HandleDelete">删除</el-button>
        <el-button type="primary"  size="mini" icon="el-icon-search" @click="Search">预览</el-button>&ensp;    
       <el-checkbox-group v-model="checkList"  class="boxx">
           <el-checkbox v-for="(item, index) in tradeSelections"  :label="item.eng" :key="index">{{ item.name }}</el-checkbox>
      </el-checkbox-group> 
      <!-- // <span class="spanMargin"></span> -->
      </div>
    </div>
    <!--表格-->
    <div class="tables">
      <!--表格里面-->
      <el-table
     
        :cell-style="changeCellStyle"   
        :key="key"
        :data="tableData"
        class="table"
        ref="multipleTable"
        style="width: 100%;"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="80" align="center"> </el-table-column>
        <el-table-column label="Id" width="500px" align="center">
          <template slot-scope="scope">
            <span >{{ scope.row.Id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="400px"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Name }}</span>
          </template>
        </el-table-column>
       <el-table-column
        v-for="(item, index) in formThead"
        :key="index"
        :label="item.name">
        <template slot-scope="scope">
          <span style="color:red">{{ scope.row[item.eng] }}</span>
        </template>
      </el-table-column>
        <el-table-column label="状态" width="200px" prop="Disabled"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Disabled==0?'正常':'停用' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320px"  align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pageing">
        <el-footer>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="size"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-footer>
      </div>

    </div>
  </div>
</template>

<script>
//postUrl, deleteUrl, putUrl
import { getUrl } from '@/router/CRUD'

import { mapActions, mapGetters } from 'vuex'
 const tradeSelections = [
  {eng:'Description', name:"描述"},
]
export default {
    watch: {//观察
    checkList(val) {
      this.formThead = this.tradeSelections.filter(
        (i) => val.indexOf(i.eng) >= 0
      ); //挑选被选中的对象
      this.key = this.key + 1; //为了保证table 每次都会重渲，这样做体验感更好，如果不为table设置key值的话，用户一旦选中了复选框选项，就是在原来table基础上添加删除每一列，页面就有跳动的感觉，体验感不好
    },
  },
  data() {
    return {
      multipleTable: [],
      tableData: [],
      sName:"",
      checked: false,
      currentpage: 1,
      size: 2,
      total: 5,
      //---------------
       key: 1, // table key
      checkList: [], //被选中的选项eng数组
      formThead: [], //渲染的表头
      tradeSelections,//定义的数组
      //-----------
      //删除id
      ids: "",
    };
  },
  computed: {
        ...mapGetters(['isRender'])
      },
  created() {
    this.GetData(); //定义显示
  },
  methods: {
    ...mapActions({
          Editform: 'Editform',
          saveAddFormDetails: 'saveAddFormDetails',
          updateIsRender: 'updateIsRender'
        }),
    //选中复选框
    handleSelectionChange(val) {
      this.multipleTable = val;
      this.array = [];
      for (let index = 0; index < val.length; index++) {
        this.array.push(val[index].Id);
      }
    },
    //显示方法
   async GetData() {
       let res=await getUrl("api/Form/GetForm",{
         pageIndex:this.currentpage,
         pageSize:this.size,
         key:this.sName
       });
         this.tableData = res.data.data; //把数据赋值给表单
        this.total = res.data.count;
        //console.log(this.tableData);
    },
    //搜索
    Search(){
      this.GetData();
    },
  // 回车触发查询
    addAnswer(){
      this.GetData();
    },
    //删除
    HandleDelete() {
       const h = this.$createElement;
      let ids = this.array.join(",");
      console.log(ids);
      this.$confirm("您确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$axios({
          url: "api/Form/DeleteFrom?ids=" + ids, //api地址
          method: "delete", //请求方式
        }).then((res) => {
          if (res.data.code == 200) {
           
            this.$notify({
            title: "标题名称",
            message: h(
              "i",
              { style: "color: teal" },
              "删除成功"
            ),
      });
            this.$router.go(0); //跳转本页面
          } else {
            this.$message("删除失败");
            return;
          }
        });
      });
    },
    //批量反填数据
    HandleEdit() {
      this.Editform = Object.assign(this.multipleTable[0]); //赋值给修改的表单
      this.ids = this.multipleTable.map((item) => item.Id); //映射给ids
      this.dialogEditVisible = true;
       
    },
    //批量修改数据
    OnModify(Editform) {
      this.$refs[Editform].validate((valid) => {
        if (valid) {
          this.$axios({
            url: "/Resource/PutResource", //api地址
            method: "put", //请求方式
            data: this.Editform,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message("修改成功");
              console.log(this.Editform);
              this.dialogEditVisible = false;
              this.GetData(); //跳转本页面
            } else {
              this.$message("修改失败");
              return false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //行内反填数据
    handleEdit(index, row) {
     //跳转到表单编辑
        this.$router.push({
              name:'表单编辑',
             params:{
                forms:row
             }
        })
    },
    //分页数方法
    handleSizeChange(val) {
      this.size = val;
      this.GetData();
    },
    //分页方法
    handleCurrentChange(val) {
      this.currentpage = val;
      this.GetData();
    },
    //点击选中反填
    handleUpdate(){
      if(this.multipleTable.length>1){
        this.$message({
          message: '只能选择一条数据',
          type: 'warning'
        });
      }
      if(this.multipleTable.length<=0){
        this.$message({
          message: '请选择一条数据',
          type: 'warning'
        });
      }
      if(this.multipleTable.length==1){
         console.log(this.multipleTable[0]);
       //跳转到表单编辑
        this.$router.push({
             name:'表单编辑',
             params:{
                forms:this.multipleTable[0]
             }
        })
      }
    },


    
    //自定义表格样式
    changeCellStyle(row) {
      if (row.column.label === "名称") {
        return "color: blue"; // 修改的样式
      } else if (row.column.label === "描述") {
        return "color: red";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.Cradbox {
  height: 50px;
  background-color: rgba(229, 222, 222, 0.173);
  width: 100%;
  height: 50px;
  line-height: 47px;
}
.boxx{
  width: 80px;
height: 50px;
border:none;
}
.right {
  float: right;
}
.spanMargin {
  margin-left: 20px;
}
.el-checkbox-group{
    margin-left: 600px;
    margin-top: -50px;
}
.name {
  width: 250px;
}
.pageing {
  height: 50px;
  align-content: center;
  padding-top: 10px;
  background-color: white;
  border: 1px solid #ccc;
}
.el-footer {
  color: #333;
  line-height: 60px;
}

</style>