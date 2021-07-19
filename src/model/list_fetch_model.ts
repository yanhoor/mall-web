import PageFetchModel from "@/model/page_fetch_model";
import {PaginationProps} from "ant-design-vue/es";

export default abstract class ListFetchModel extends PageFetchModel{
    showEdit: boolean = false

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
        await this.getListData();
    }

    // 获取列表查询参数
    async getListParam() {

    }

    getOther(){

    }

    async getListData() {
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

    async saveForm(){
        const r = await this.postForm()
        if(r.success){
            this.refresh()
            this.showEdit = false
            this.$message.success(r.msg)
        }else{
            this.$message.error(r.msg)
        }
    }

    abstract postForm(): Promise<any>;

    getPaginationParams(){
        return {
            current: this.pagination.current,
            pageSize: this.pagination.pageSize,
        }
    }

    // 没用到
    getData(): Promise<any> {
        return Promise.resolve(true);
    }
}
