<template>
   <div class="app-container">
       <div class="filter-container">
           <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
           <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
               {{ $t('table.search') }}
           </el-button>
           <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
               {{ $t('table.add') }}
           </el-button>
       </div>
       <el-table
         :key="tableKey"
         v-loading="listLoading"
         :data="list"
         border
         fit
         highlight-current-row
         style="width: 100%;"
         @sort-change="sortChange"
       >
           <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
               <template slot-scope="{row}">
                   <span>{{ row.id }}</span>
               </template>
           </el-table-column>
           <el-table-column :label="$t('table.date')" width="150px" align="center">
               <template slot-scope="{row}">
                   <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
               </template>
           </el-table-column>
           <el-table-column :label="$t('table.title')" min-width="150px">
               <template slot-scope="{row}">
                   <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
               </template>
           </el-table-column>
           <el-table-column :label="$t('table.author')" width="110px" align="center">
               <template slot-scope="{row}">
                   <span>{{ row.author }}</span>
               </template>
           </el-table-column>
           <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
               <template slot-scope="{row,$index}">
                   <el-button type="primary" size="mini" @click="handleUpdate(row)">
                       {{ $t('table.edit') }}
                   </el-button>
                   <el-button v-if="row.status!=='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
                       {{ $t('table.delete') }}
                   </el-button>
               </template>
           </el-table-column>
       </el-table>

       <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

       <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
           <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
               <el-form-item :label="$t('table.date')" prop="timestamp">
                   <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
               </el-form-item>
               <el-form-item :label="$t('table.title')" prop="title">
                   <el-input v-model="temp.title" />
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">
                   {{ $t('table.cancel') }}
               </el-button>
               <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                   {{ $t('table.confirm') }}
               </el-button>
           </div>
       </el-dialog>

   </div>

</template>

<script>
    import Pagination from "@/components/Pagination/Pagination";
    export default {
        name: "table",
        components: {Pagination},

        data(){
            return{
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                temp: {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                rules: {
                    timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
                }
            }
        },
        // created() {
        // },
        methods:{
            getList() {

            },
            handleFilter() {
                this.listQuery.page = 1
            },
            sortChange(data) {
                const { prop, order } = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },
            sortByID(order) {
                if (order === 'ascending') {
                    this.listQuery.sort = '+id'
                } else {
                    this.listQuery.sort = '-id'
                }
                this.handleFilter()
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    status: 'published',
                    type: ''
                }
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            createData() {

            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.temp.timestamp = new Date(this.temp.timestamp)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData() {

            },
            handleDelete(row, index) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                this.list.splice(index, 1)
            },
            getSortClass: function(key) {
                const sort = this.listQuery.sort
                return sort === `+${key}` ? 'ascending' : 'descending'
            }
        }
    }
</script>

<style scoped>

</style>
