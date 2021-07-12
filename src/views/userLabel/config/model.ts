import ListFetchModel from "@/model/list_fetch_model";

interface UserLabel {
    id: number | string,
    name: string,
    color: string,
}

export default class UserLabelModel extends ListFetchModel{
    showEdit: boolean = false
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
            color: '',
        }
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.userLabelList, { }, { method: 'get' }).then(r => {
            return r;
        })
    }
}
