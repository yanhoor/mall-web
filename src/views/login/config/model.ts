import PageFetchModel from '@/model/page_fetch_model'

interface Item {
    id: number | string,
    name: string,
    mobile: string,
    password: string,
    type: number | string,
}

export default class Model extends PageFetchModel{

    form: Item = {
        id: '',
        name: '',
        mobile: '',
        password: '',
        type: '2',
    }

    async register(){
        return await this.$http.fetch(this.$urls.adminRegister, this.form ).then(r => {
            if(r.success){
                this.$message.success(r.msg)
                return true
            }else{
                this.$message.error(r.msg)
                return false
            }
        })
    }

    async login(){
        return await this.$http.fetch(this.$urls.adminLogin, this.form ).then(r => {
            if(r.success){
                this.$message.success(r.msg)
                return true
            }else{
                this.$message.error(r.msg)
                return false
            }
        })
    }

    getData(): Promise<any> {
        return Promise.resolve(undefined);
    }
}
