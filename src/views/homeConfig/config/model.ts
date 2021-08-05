import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    name: string,
    logo: string,
    float_icon: string,
    float_icon_link: string,
    float_valid_time_range: string[],
    banner_list: BannerItem[],
}

interface BannerItem{
    img: string,
    link: string,
    color: string,
}

export default class HomeConfigModel extends ListFetchModel{
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
            logo: '',
            float_icon: '',
            float_icon_link: '',
            float_valid_time_range: [],
            banner_list: [],
        }
        obj.banner_list.push(this.createBannerItem())
        return obj
    }

    createBannerItem(): BannerItem{
        return {
            img: '',
            link: '',
            color: '#000',
        }
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.homeConfigList, { ...this.filterForm, ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.homeConfigSave, {...this.itemForm})
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }

}
