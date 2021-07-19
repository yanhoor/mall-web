import ListFetchModel from "@/model/list_fetch_model";

interface User {
    id: number | string,
    name: string,
    age: number | string,
    mobile: number | string,
    labelIds: []
}

export default class UserModel extends ListFetchModel{
    filterForm = {
        name: ''
    }
    userForm: User
    labelList = []

    constructor() {
        super();
        this.userForm = this.initForm()
    }

    initForm(): User{
        return {
            id: '',
            name: '',
            age: '',
            mobile: '',
            labelIds: []
        }
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.listUser, { ...this.filterForm, ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    async postForm(){
        return await this.$http.fetch(this.$urls.saveUser, {...this.userForm})
    }

    async getLabelList(): Promise<any> {
        return await this.$http.fetch(this.$urls.userLabelList, { }, { method: 'get' }).then(r => {
            this.labelList = r.list;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }

}
