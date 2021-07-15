import PageFetchModel from '@/model/page_fetch_model'

export default class Model extends PageFetchModel{

    form = {
        mobile: '',
        password: ''
    }

    async register(){
        return await this.$http.fetch(this.$urls.adminRegister, this.form ).then(r => {
            if(r.success){
                this.$message.success(r.msg)
            }else{
                this.$message.error(r.msg)
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
