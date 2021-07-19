import ListFetchModel from "@/model/list_fetch_model";

interface UserLabel {
    id: number | string,
    name: string,
    color: string,
}

export default class UserLabelModel extends ListFetchModel{
    filterForm = {
        name: ''
    }
    itemForm: UserLabel

    constructor() {
        super();
        this.itemForm = this.initForm()
    }

    initForm(): UserLabel{
        return {
            id: '',
            name: '',
            color: '#000',
        }
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.userLabelSave, this.itemForm)
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.userLabelList, { ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
