<template>
    <div id="paper">
        <el-form ref="LoginForm" :model="LoginForm" :rules="rules" class="login-container" label-position="left"
                 label-width="0px" v-loading="loading">
            <h3 class="login_title">欢迎</h3>
            <el-form-item prop="name">
                <el-input type="text" v-model="LoginForm.name"
                          auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="LoginForm.password"
                          auto-complete="off" placeholder="密码" @keyup.enter.native="loginEnterFun"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%" class="login_button">
                <el-button type="primary" style="width:40%;border: none" @click=" Login('LoginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                rules:{
                    name:[{required:true,message:'用户名不能为空',trigger:'blur'}],
                    password:[{required:true,message:'密码不能为空',trigger:'blur'}]
                },
                checked:true,
                LoginForm:{
                    name:'',
                    password:''
                },
                loading:false
            }
        },
        methods:{
            loginEnterFun:function (e){
               let keyCode = window.event? e.keyCode:e.which;
               if(keyCode === 13){
                   this.Login('LoginForm');
               }
            },
            Login(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        this.loading = true
                        this.$store.dispatch('user/login',this.LoginForm) //这里是在调用vuex的store里的user的login方式，命名方式为user/login
                            .then(()=>{
                                this.$router.push({path:'/'})
                                this.loading = false
                            })
                            .catch(()=>{
                                this.loading =false
                            })
                    } else {
                        return false
                    }
                })

            }
        }
    }
</script>

<style >
    #paper {
        background:url("../assets/img/737400.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 15% auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .login_button {
        text-align: center;
    }
</style>
