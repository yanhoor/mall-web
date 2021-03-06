import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    name: string,
    icon: string,
}

export default class ShopCategoryModel extends ListFetchModel{
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
            icon: '',
        }
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.shopCategorySave, this.itemForm)
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.shopCategoryList, { ...this.filterForm, ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
