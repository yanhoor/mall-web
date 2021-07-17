import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    name: string,
}

export default class ShopCategoryModel extends ListFetchModel{
    showEdit: boolean = false
    filterForm = {
        name: ''
    }
    itemForm: Item

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): Item{
        return {
            id: '',
            name: '',
        }
    }

    async saveForm(){
        return await this.$http.fetch(this.$urls.shopCategorySave, this.itemForm).then(r => {
            if(r.success){
                this.showEdit = false
                this.$message.success(r.msg)
            }else{
                this.$message.error(r.msg)
            }
        })
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.shopCategoryList, { ...this.pagination}, { method: 'get' }).then(r => {
            return r;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
