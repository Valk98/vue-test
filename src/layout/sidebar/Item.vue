
<!--    item 组件通过定义 render 函数完成组件渲染-->
<script>
    export default {
        name:'MenuItem',
        functional:true,
        props:{
            title:{
                type:String,
                default:''
            }
        },
        render: function(createElement, context) {
            const vnodes = []
            const { icon, title } = context.props
            // eslint-disable-next-line no-debugger
            debugger
            if (icon) {
                const elHtml = createElement('i', {
                    attrs: {
                        'class': icon
                    }
                })
                console.log(elHtml)
                vnodes.push(elHtml)
            }

            if (title) {
                const elHtml = createElement('span', {
                    attrs: {
                        slot: title
                    }
                }, title)
                console.log(elHtml)
                vnodes.push(elHtml)
            }
            return vnodes
        }
    }
</script>

<style scoped>

</style>
