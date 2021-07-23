import ListFetchModel from "@/model/list_fetch_model";

interface Label {
    id: number | string,
    name: string,
    color: string,
}

export default class GoodsLabelModel extends ListFetchModel{
    filterForm = {
        name: ''
    }
    itemForm: Label

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): Label{
        return {
            id: '',
            name: '',
            color: '#000',
        }
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.goodsLabelSave, this.itemForm)
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.goodsLabelList, { ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
