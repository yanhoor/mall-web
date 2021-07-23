import ListFetchModel from "@/model/list_fetch_model";

interface Item{
    id: number | string,
    create_time: string,
    modify_time: string,
    name: string,
    level: number | string, // 节点等级，0开始
    parent_id: number | string, // 上级节点
    shop_id: number | string,
}

export default class FoodCategoryModel extends ListFetchModel{
    itemForm: Item
    treeData: Item[] = []

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): Item{
        return {
            id: '',
            create_time: '',
            modify_time: '',
            name: '',
            level: 0, // 节点等级，0开始
            parent_id: 0, // 上级节点
            shop_id: '',
        }
    }

    async initTreeData(shop_id: number){
        this.getCategoryChildren(shop_id, 0).then(r => {
            if(r.success){
                this.treeData = r.list
            }
        })
    }

    async getCategoryChildren(shop_id: number, parent_id: number){
        return await this.$http.fetch(this.$urls.foodCategoryChildren, { shop_id, parent_id }, { method: 'get' })
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.foodCategoryAdd, this.itemForm)
    }

    getList(): Promise<any> {
        return Promise.resolve(undefined);
    }

    getData(): Promise<any> {
        return Promise.resolve(undefined);
    }
}
