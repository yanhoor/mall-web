import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    name: string,
    category_ids: number[] | string[],
    label_ids: number[] | string[],
    desc: string,
    pic_list: [],
    sku_list: SkuItem[],
}

interface SkuItem{
    price: number | string,
    pack_fee: number | string,
    name: string,
}

export default class GoodsModel extends ListFetchModel{
    filterForm = {
        name: '',
        category_ids: []
    }
    itemForm: Item
    labelList = []

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): Item{
        let obj: Item = {
            id: '',
            name: '',
            category_ids: [],
            label_ids: [],
            desc: '',
            sku_list: [],
            pic_list: [],
        }
        obj.sku_list.push(this.createSkuItem())
        return obj
    }

    createSkuItem(): SkuItem{
        return {
            price: '',
            pack_fee: '',
            name: '',
        }
    }

    async getList(): Promise<any> {
        let category_id
        return await this.$http.fetch(this.$urls.goodsList, { ...this.filterForm, ...this.getPaginationParams()}).then(r => {
            return r;
        })
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.goodsSave, {...this.itemForm})
    }

    async getLabelList(): Promise<any> {
        return await this.$http.fetch(this.$urls.goodsLabelList, { }, { method: 'get' }).then(r => {
            this.labelList = r.list;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }

}
