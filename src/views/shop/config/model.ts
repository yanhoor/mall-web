import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    create_time: string,
    modify_time: string,
    name: string, // 店名
    contract: string, // 联系电话
    shop_category_id: string, // 分类id
    desc: string, // 店铺简介
    slogan: string, // 店铺标语
    opening_range: string[],
    avatar: string, // 头像
    business_license: string, // 营业执照
    service_permission: string, // 服务许可证
    deliver_fee: string, // 配送费
    deliver_fee_start_amount: string, // 配送费起送价
    provinceCode: string,
    cityCode: string,
    countyCode: string,
    codeList: string[],
    headAddress: string,
    tailAddress: string,
}

export default class ShopModel extends ListFetchModel{
    filterForm = {
        name: '',
        shop_category_id: '',
    }
    itemForm: Item
    cateList = []

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): Item{
        return {
            id: '',
            create_time: '',
            modify_time: '',
            name: '', // 店名
            contract: '', // 联系电话
            shop_category_id: '', // 分类id
            desc: '', // 店铺简介
            slogan: '', // 店铺标语
            opening_range: [],
            avatar: '', // 头像
            business_license: '', // 营业执照
            service_permission: '', // 服务许可证
            deliver_fee: '', // 配送费
            deliver_fee_start_amount: '', // 配送费起送价
            provinceCode: '',
            cityCode: '',
            countyCode: '',
            codeList: [],
            headAddress: '',
            tailAddress: '',
        }
    }

    async postForm(){
        [ this.itemForm.provinceCode, this.itemForm.cityCode, this.itemForm.countyCode ] = this.itemForm.codeList
        return await this.$http.fetch(this.$urls.shopSave, this.itemForm)
    }

    async getDetail(id: string){
        return await this.$http.fetch(this.$urls.shopDetail, { id }, { method: 'get' }).then(r => {
            if(r.success){
                const data = r.info
                data.codeList = [data.provinceCode, data.cityCode, data.countyCode]
                this.itemForm = Object.assign(this.itemForm, data)
            }else if(r.msg){
                this.$message.error(r.msg)
            }
        })
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.shopList, { ...this.getPaginationParams(), ...this.filterForm}, { method: 'get' }).then(r => {
            return r;
        })
    }

    async getCateList(){
        return await this.$http.fetch(this.$urls.shopCategoryList, {},{ method: 'get' }).then(r => {
            if(r.success) this.cateList = r.list
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
