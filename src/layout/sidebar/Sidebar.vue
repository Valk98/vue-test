<template>
    <div >
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    :active-text-color="variables.menuActiveText"
                    :collapse-transition="false"
                    mode="vertical"
            >
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SidebarItem from './SiderbarItem'
    import variables from '@/styles/variables.scss'
export default {
    components:{SidebarItem},
    data(){
        return{
            isCollapse:false
        }
    },
    computed: {
        ...mapGetters([
            'permission_routes',
        ]),
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        variables() {
            return variables
        }
    }

}
</script>

<style scoped>

</style>
