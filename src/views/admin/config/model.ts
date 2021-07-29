import ListFetchModel from "@/model/list_fetch_model";

interface Item {
    id: number | string,
    name: string,
    mobile: string,
    password: string,
    avatar: string,
    create_time: string,
    modify_time: string,
}

export default class AdminModel extends ListFetchModel{
    form: Item = {
        id: '',
        name: '',
        mobile: '',
        password: '',
        create_time: '',
        modify_time: '',
        avatar: '',
    }
    filterForm = {
        name: '',
        mobile: '',
    }

    async getUserInfo(){
        return await this.$http.fetch(this.$urls.adminInfo).then(r => {
            if(r.success){
                this.form = Object.assign(this.form, r.info)
            }else{
                this.$message.error(r.msg)
            }
        })
    }

    getData(): Promise<any> {
        return Promise.resolve(undefined);
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.adminList, { ...this.filterForm, ...this.getPaginationParams()}, { method: 'get' }).then(r => {
            return r;
        })
    }

    postForm(): Promise<any> {
        return Promise.resolve(undefined);
    }
}
