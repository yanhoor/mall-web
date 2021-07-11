import PageFetchModel from "@/model/page_fetch_model";

export default abstract class ListFetchModel extends PageFetchModel{

    pageSize: number = 20

    currentPage: number = 1

    pageList: Array<any> = []

    async refresh(init?: boolean) {
        if(!init) this.setRefreshing();

        this.getOther();
        await this.getListParam();
        await this.refreshList();
    }

    // 获取列表查询参数
    async getListParam() {

    }

    getOther(){

    }

    async refreshList() {
        try {
            this.currentPage = 1;
            let data: Array<any>;
            let res = await this.getList();
            data = res ?? [];
            this.pageList = [];
            this.setCompleted();
            if (data.length === 0) {
                this.setEmpty();
            } else {
                this.pageList = data;
                if (data.length < this.pageSize) {
                    this.setNoMore();
                }
            }
        } catch (e) {
            this.setError();
        }
    }

    async loadMore(){
        try {
            this.currentPage ++;
            let data: Array<any>;
            let res = await this.getList();
            data = res ?? [];
            this.setCompleted();
            if (data.length === 0) {
                this.currentPage --;
                this.setNoMore();
            } else {
                this.pageList = this.pageList.concat(data);
                if (data.length < this.pageSize) {
                    this.setNoMore();
                }
            }
        } catch (e) {
            console.log(e);
            this.setError();
        }
    }

    abstract getList(): Promise<Array<any>>;

    // 没用到
    getData(): Promise<any> {
        return Promise.resolve(true);
    }
}
