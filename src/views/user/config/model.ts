import ListFetchModel from "@/model/list_fetch_model";

interface User {
    id: number | string,
    name: string,
    age: number | string,
    mobile: number | string,
    labelList: []
}

export default class UserModel extends ListFetchModel{
    showEdit: boolean = false
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
            labelList: []
        }
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.listUser, { ...this.filterForm, ...this.pagination}, { method: 'get' }).then(r => {
            return r;
        })
    }

    async saveForm(){
        const l = this.userForm.labelList.map((id) => this.labelList.find((label: {id: number}) => label.id == id)) as []

        return await this.$http.fetch(this.$urls.saveUser, {...this.userForm, ...{labelList: l}}).then(r => {
            if(r.success){
                this.showEdit = false
                this.$message.success(r.msg)
            }else{
                this.$message.error(r.msg)
            }
        })
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
