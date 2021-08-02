<template>
<div class="flex-column">
  <sticky :className="'sub-navbar'">
    <div class="filter-container">
			<el-input @keyup.enter.native="handleFilter"  prefix-icon="el-icon-search" size="small" style="width: 200px; margin-bottom: 0;" class="filter-item" :placeholder="'名称'" v-model="listQuery.key">
			</el-input>
      <permissionBtn moduleName='flowschemes' size="mini" v-on:btn-event="onBtnClicked"></permissionBtn>
      <el-button type="success"  size="mini"   @click="$router.push('/flowSchemeDtl')" icon="el-icon-plus">添加</el-button>
        <el-button type="primary"   size="mini" icon="el-icon-edit" @click="handleUpdate">编辑</el-button>
         <el-button type="danger"  size="mini"  icon="el-icon-delete" @click="handleDelete">删除</el-button>
        <el-button type="primary"  size="mini" icon="el-icon-search" @click="Search">预览</el-button>&ensp;
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showDescription">描述</el-checkbox>
    </div>
     </sticky>
      <div class="app-container flex-item">
     <!-- height="calc(100% - 52px)"  -->
    <el-table ref="mainTable" :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;" @row-click="rowClick"  @selection-change="handleSelectionChange">
       <el-table-column align="center"
      type="selection"
      width="55">
    </el-table-column>

      <el-table-column :label="'Id'" min-width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.Id}}</span>
        </template>
</el-table-column>

<el-table-column min-width="80px" :label="'名称'">
    <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.SchemeName}}</span>
        </template>
</el-table-column>

<el-table-column min-width="150px" v-if='showDescription' :label="'描述'">
    <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.Description}}</span>
        </template>
</el-table-column>

<el-table-column class-name="status-col" :label="'状态'" width="100">
    <template slot-scope="scope">
			<span :class="scope.row.Disabled | statusFilter">{{statusOptions.find(u =>u.key == scope.row.Disabled).display_name}}</span>
		</template>
</el-table-column>

<el-table-column align="center" :label="'操作'" width="230" class-name="small-padding fixed-width">
    <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.Disabled!=0" size="mini" type="danger" @click="handleModifyStatus(scope.row,1)">停用</el-button>
        </template>
</el-table-column>
    </el-table>
 <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.page"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="listQuery.limit"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
</el-pagination>
      </div>
</div>

</template>

<script>
    import Layout from '@/views/layout/Layout'
    import * as flowschemes from '@/api/flowschemes'
    import waves from '@/directive/waves' // 水波纹指令
    import Sticky from '@/components/Sticky'
    import permissionBtn from '@/components/PermissionBtn'
   // import Pagination from '@/components/Pagination'
    import { mapActions, mapGetters } from 'vuex'
    import extend from "@/extensions/delRows.js"
 

    export default {
      name: 'flowScheme',
      components: {
        Sticky,
        permissionBtn,
     //   Pagination
      },
      mixins: [extend],
      beforeRouteEnter(to, from, next) {
        next(vm => {
          if (vm.isFlowRender) {
            vm.getList()
          }
        })
      },
      directives: {
        waves
      },
      data() {
        return {
          multipleSelection: [], // 列表checkbox选中的值
          tableKey: 0,
          list: [],
          total: 2,
          listLoading: true,
          listQuery: { // 查询条件
            page: 1,
            limit: 2,
            key: undefined
          },
          apps: [],
          statusOptions: [{
            key: 0,
            display_name: '正常'
          },
          {
            key: 1,
            display_name: '停用'
          }
          ],
          showDescription: true,
          dialogFormVisible: false,
          dialogStatus: '',
          textMap: {
            update: '编辑',
            create: '添加'
          },
          dialogPvVisible: false,
          pvData: [],
          rules: {
            name: [{
              required: true,
              message: '名称不能为空',
              trigger: 'blur'
            }]
          },
          downloadLoading: false
        }
      },
      filters: {
        statusFilter(Disabled) {
          const statusMap = {
            1: 'color-danger',
            0: 'color-success'
          }
          return statusMap[Disabled]
        }
      },
      computed: {
        ...mapGetters(['isFlowRender'])
      },
      created() {
        this.getList();
        var addRouter = [{
          path: '/flowschemes',
          component: Layout,
          redirect: 'noredirect',
          name: 'flowschemes',
          meta: {
            title: '流程设计',
            icon: 'eye'
          },
          children: [
            {
              path: 'add',
              component: () =>
                            import('../../BasicsConfiguration/flowschemes/add.vue'),
              name: 'schemeAdd',
              meta: {
                notauth: true,
                title: '添加模板',
                noCache: true,
                icon: 'star'
              }
            },
            {
              path: 'edit/:id',
              component: () =>
                            import('../../BasicsConfiguration/flowschemes/edit.vue'),
              name: 'schemeEdit',
              hidden: true,
              meta: {
                notauth: true,
                title: '编辑流程',
                noCache: true,
                icon: 'list'
              }
            }
          ]
        }]
        this.$router.addRoutes(addRouter)
      },
      methods: {
        Search(){
        this.getList();
        },
        ...mapActions(['saveFlowDetails', 'saveAddFlowDetails', 'updateFlowIsRender']),
        rowClick(row) {
          this.$refs.mainTable.clearSelection()
          this.$refs.mainTable.toggleRowSelection(row)
        },
        handleSelectionChange(val) {
         // this.multipleSelection = val

         this.multipleSelection = val;
          this.array = [];
         for (let index = 0; index < val.length; index++) {
         this.array.push(val[index].Id);
      }
        },
        onBtnClicked: function(domId) {
          console.log('you click:' + domId)
          switch (domId) {
            case 'btnAdd':
              this.saveAddFlowDetails('')
              this.$router.push('/flowschemes/add')
              break
            case 'btnEdit':
              if (this.multipleSelection.length !== 1) {
                this.$message({
                  message: '只能选中一个进行编辑',
                  type: 'error'
                })
                return
              }
              this.handleUpdate(this.multipleSelection[0])
              break
            case 'btnDel':
              if (this.multipleSelection.length < 1) {
                this.$message({
                  message: '至少删除一个',
                  type: 'error'
                })
                return
              }
              this.handleDelete(this.multipleSelection)
              break
            default:
              break
          }
        },
        getList() {
          this.listLoading = true
          flowschemes.getList(this.listQuery).then(response => {
            this.list = response.data.data
            this.total = response.data.count
            console.log(this.list);
            this.listLoading = false
            this.updateFlowIsRender(false)
          })
        },
        handleFilter() {
          this.listQuery.page = 1
          this.getList()
        },
        handleSizeChange(val) {
          this.listQuery.limit = val
          this.getList()
        },
        handleCurrentChange(val) {
          this.listQuery.page = val
         // this.listQuery.limit = val
          this.getList()
        },
    //点击选中反填
      handleUpdate(){
        if(this.multipleSelection.length>1){
          this.$message({
            message: '只能选择一条数据',
            type: 'warning'
          });
        }
        if(this.multipleSelection.length<=0){
          this.$message({
            message: '请选择一条数据',
            type: 'warning'
          });
        }
        if(this.multipleSelection.length==1){
         let data = {}
          data = {
            data: this.multipleSelection[0],
            active: 0
          }
        //跳转到表单编辑
        this.$router.push({
             name:'流程设计的编辑',
             params:{
                forms:data
             }
        })
        }
        console.log(this.multipleSelection[0])
      },
        handleModifyStatus(row, Disabled) { // 模拟修改状态
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.Disabled = Disabled
        },
        handleEdit(row) { // 弹出编辑框
          let data = {}
          data = {
            data: row,
            active: 0
          }
          console.log(data);
          this.saveFlowDetails(data)

       //跳转到表单编辑
        this.$router.push({
             name:'流程设计的编辑',
             params:{
                forms:data
             }
        })
       //this.$router.push('/flowschemes/edit/' + row.id)
        },
        handleDelete() { // 多行删除
        //  this.delrows(flowschemes, rows)     
          const h = this.$createElement;
          let ids = this.array.join(",");
          console.log(ids);
          this.$confirm("您确定要删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.$axios({
              url: "/api/FlowScheme/DeleteFlowScheme?ids=" + ids, //api地址
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
          
          
        }
      }
    }
</script>