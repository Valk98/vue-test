<template>
    <div  class="app-wrapper">
        <sidebar class="sidebar-container" /> <!--左侧功能导航栏-->
        <div>
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
