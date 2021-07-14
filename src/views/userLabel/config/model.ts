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
            color: '#000',
        }
    }

    async saveForm(){
        return await this.$http.fetch(this.$urls.userLabelSave, this.itemForm).then(r => {
            if(r.success){
                this.showEdit = false
                this.$message.success(r.msg)
            }else{
                this.$message.error(r.msg)
            }
        })
    }

    async getList(): Promise<any> {
        return await this.$http.fetch(this.$urls.userLabelList, { ...this.pagination}, { method: 'get' }).then(r => {
            return r;
        })
    }

    closeEdit(){
        this.showEdit = false;
        this.refresh(false);
    }
}
