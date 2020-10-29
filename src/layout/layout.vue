<template>
    <div  class="app-wrapper">
<!--        左侧功能导航栏-->
        <sidebar class="sidebar-container" />
<!--        主要功能显示区域-->
        <div class="main-container">
            <app-main/>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/layout/sidebar/Sidebar'
    import AppMain from "@/layout/appmain/AppMain";

    export default {
        name: "Layout",
        components:{Sidebar,AppMain},
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    @import "~@/styles/variables.scss";

    .app-wrapper {
      @include clearfix;
      position: relative;
      height: 100%;
      width: 100%;
    }

</style>
