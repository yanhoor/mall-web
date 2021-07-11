import ListFetchModel from "@/model/list_fetch_model";

interface User {
    id: number | string,
    name: string,
    age: number | string,
    mobile: number | string,
}

export default class UserModel extends ListFetchModel{
    showEdit: boolean = false

    userForm: User

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
        }
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.listUser, {page: this.currentPage}, { method: 'get' }).then(r => {
            return r;
        })
    }

    async saveForm(){
        return await this.$http.fetch(this.$urls.saveUser, this.userForm).then(r => {
            this.showEdit = false
            this.$message.success(r.msg)
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }

}