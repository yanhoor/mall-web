import ListFetchModel from "@/model/list_fetch_model";

interface User {
    name: string,
    age: number | string,
    mobile: number | string,
}

export default class UserModel extends ListFetchModel{
    showEdit: boolean = false

    constructor() {
        super();
    }

    user: User = {
      name: '',
      age: '',
      mobile: '',
    }

    get userForm(){
        return this.user
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.listUser, {page: this.currentPage}, { method: 'get' }).then(r => {
            console.log('---------saveForm-----------', r);
            return r;
        })
    }

    async saveForm(){
        return await this.$http.fetch(this.$urls.saveUser, this.userForm).then(r => {
            console.log('---------saveForm-----------', r);
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }

}
