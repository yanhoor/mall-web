import PageFetchModel from "@/model/page_fetch_model";
import {PaginationProps} from "ant-design-vue/es";

export default abstract class ListFetchModel extends PageFetchModel{

    // 分页配置
    pagination: PaginationProps = {
        current: 1,
        pageSize: 20,
        total: 0,
        pageSizeOptions: ['5', '10', '20', '30'],
        showSizeChanger: true
    }

    pageList: Array<any> = []

    async refresh(init?: boolean) {
        if(!init) this.setRefreshing();

        this.getOther();
        await this.getListParam();
        await this.handleList();
    }

    // 获取列表查询参数
    async getListParam() {

    }

    getOther(){

    }

    async handleList() {
        try {
            let res = await this.getList();
            this.pagination.total = res.amount;
            this.pageList = res.list ?? [];
            this.setCompleted();
        } catch (e) {
            this.setError();
        }
    }

    abstract getList(): Promise<any>;

    // 没用到
    getData(): Promise<any> {
        return Promise.resolve(true);
    }
}
