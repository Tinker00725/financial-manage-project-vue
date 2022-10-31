# 1.响应式、自适应
    响应式根据页面宽度变化，展示的一行n个的n也会随之变化；
    自适应根据页面变化，一行展示的n，的宽高会随着变化，但是一行的数量不变；
# 2.项目构建
先搭建框架，基础实现项目分块，页面分块。后直接模块细节开发。
先全部大致过一遍（随便搭搭），告诉自己后面开发需要这块即可。
# 3.element-ui 编程式导航(element-ui文档上有写)
    相关组件加上router,index后加上路由地址
# 4.element-ui 的快速排列
    el-row 行
    el-col 列
    可以快速的搭建响应式布局
    响应式布局一共有24格，xs、sm、lg对应的数字就是占用的栅格数
# 5.vue-count-to插件的使用
    CountTo作为组件使用，start-val、end-val、duration三个参数

<!-- 适应屏幕宽度vw,适应屏幕高度vh -->

# 6.element-ui调整样式
    style里没有就是文档里面的配置属性
# 7.element-ui 表单样式
    el-form-item 之间的就是具体表单的样式
# 8. element-ui 分页器获取当前一页容量，当前点击页数
    this.$refs.Pager（前面都是自定义的).$data
    分页器组件中的$data就是当前点击的动态数据

    ## 详细看一遍当前类型下的element-ui 里面详细介绍了如何拿到当前页还有当前页容量
    **handleSizeChange**
    **handleCurrentChange**
# 9. elemrnt-ui 表格获取for item of tableData 的 item及其属性
    插槽 slot-scope 获取对应单元数据
    <template slot-scope="scope"> or <tempalte slot-scope="{row}"
    拿到的是一个对象→ scope.row.xxx or row.xxx
    scope.$index 可获取该行的所有信息
# 10.什么时候用过滤器
    对数据进行转换，数字转换为中文标识
    其中的几种情况特殊处理返回特殊值
    ps:computed定义的方法不接收参数（报错）
# 11.axios的参数传递
    params直接写入路由
    query参数通过params(参数)对象传递
    body传参只能写data或者data对象形式
# 12.params设置的时候要:,传递的时候不用

# 13.下载文件的思路(难点)
    原理：a标签的href地址，download属性下载
    <a href="地址" download="文件名"> 点击这个a标签就是按照这个下载地址，下载一个已命名文件。

    1.获取文件地址
    2.再次发送请求（拼接地址），获取数据流文件
    3.通过a标签触发下载，a标签中的地址：通过window.URL对流文件进行解码，得到一个url地址
# 14.密码验证（第二次密码是否与第一次相同）
    通过validator属性调用data中写好的验证函数。（按照模板来即可）
# 15.根据角色展示对应路由
    !!!!!添加动态子路由
    router.addroute(父路由，子路由对象)//一次只能添加一个
    不加父路由就是直接加到constentRouter中，而不是layout的子路由下面
# 16.根据角色添加路由思路（动态路由）
    路由：
    获取当前登录的人员类型
    通过人员类型将异步路由进行筛选添加到基本路由当中

    导航：
    通过筛选出来的路由，无限极遍历
    自己调用自己
# 17.二级路由的出口写在其父类中

# 18.子路由的坑
    子路由不写/，路由跳转的时候自动搜索最后一个/，更换/后面的内容变为自己的home
    但是如果子路由加了/，（或者是全路径写法，包含父路由的地址）那么就会从根路径上改变url地址

