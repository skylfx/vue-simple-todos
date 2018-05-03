<template>
  <div id="app">
    <el-container>
      <el-header> <h1>{{ headtitle }}</h1></el-header>
      <el-main>
           <el-row type="flex"  justify="center">
              <el-col  :sm="24" :md="16" :lg="16" >
                 <!--  输入区域 -->
                <el-row class="el-row">
                  <el-col :span="24">
                  <el-input
                    placeholder="请输入内容"
                    v-model="newTodo">
                    <i slot="prefix" class="el-input__icon el-icon-check"></i>
                  </el-input>
                  </el-col>
                </el-row>
                 <!--  表格区域 -->  
                <el-row>
                <el-col :span="24">
                <el-tabs type="border-card">
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> UL-CSS-传统</span>
                    <ul class="todos">
                    <li v-for="(todo,index) in todos" :key="todo.index" v-bind:class="{'checked':todo.done}">
                      <input type="checkbox" @change="saveToStore" v-model="todo.done" />
                      <label for=""> [{{index+1}}].{{todo.value}}</label>
                      <time>{{todo.created | moment("YYYY-MM-DD HH:mm:ss")}}</time>
                      <button @click.prevent="delItem(todo)"></button>
                    </li>
                </ul>
                </el-tab-pane>
                <el-tab-pane label="ElementUI-table">
                    <el-table :data="todos"  border style="width: 100%">
                      <el-table-column  prop="value"  label="待办事宜" min-width ="50%">
                      </el-table-column>
                      <el-table-column  label="创建时间"  min-width ="40%">
                        <template slot-scope="scope">
                          <i class="el-icon-time"></i>
                          <span style="margin-left: 10px">{{ scope.row.created }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" min-width ="10%">
                            <template slot-scope="scope" >
                              <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                          </el-table-column>
                    </el-table>
                </el-tab-pane>
                </el-tabs>
                </el-col></el-row>
                </el-col>
              <el-col :sm="1" :md="1" :lg="1" style="margin-left:1%;">
                 <el-button  type="primary" @click="addItem">添加</el-button>
              </el-col> 
          </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import "./assets/site.scss";
import "./assets/todos.scss";

export default {
  name: "app",
  rowdate: "",
  created() {
    if (this.is_initialized) {
      this.todos = JSON.parse(localStorage.getItem("VUE-TODOS"));
    } else {
      this.newTodo = "示例";
      this.addItem();
      this.newTodo = "中国人民站起来了";
      this.addItem();
      this.newTodo = "恭喜RNG夺冠";
      this.addItem();
    }
  },
  computed: {
    is_initialized() {
      return localStorage.getItem("VUE-TODOS") != null;
    }
  },
  methods: {
    addItem() {
      let myDate = new Date();
      this.rowdate = myDate.toISOString();
      this.todos.push({
        value: this.newTodo,
        created: myDate.toISOString(), //ISO时间
        done: false
      });
      this.saveToStore();
      this.newTodo = "";
    },
    saveToStore() {
      localStorage.setItem("VUE-TODOS", JSON.stringify(this.todos));
    },
    //删除1 json查询过滤
    delItem (todo) {
                this.todos = this.todos.filter((x) => x !== todo)
               //这个查询即删除语法,同
               //this.todos = this.todos.filter(function(x){
               //   return x!==todo;
               // })
                this.saveToStore()
            },
    //删除2 json数组删除      
     handleDelete(index, row) {
        this.todos.splice(index,1);
        this.saveToStore();
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      }
  },
  data() {
    return {
      headtitle: "VUE+ElementUI TODOS案例",
      newTodo: "",
      todos: []
    };
  }
};
</script>

<style lang="scss">
</style>
