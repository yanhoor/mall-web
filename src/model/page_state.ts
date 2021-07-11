export enum PageState{
    init, // 第一次进入页面初始化
    refreshing, // 在页面刷新
    busy, // 正在执行某种操作
    completed, // 加载数据完成
    noMore, // 列表没有更多数据
    error, // 加载数据出错
    empty, // 列表数据为空
}
