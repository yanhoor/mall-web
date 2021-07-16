import PageFetchModel from '@/model/page_fetch_model'

export default class AdminModel extends PageFetchModel{
    form = {
        id: '',
        mobile: '',
        password: '',
        create_time: '',
        modify_time: '',
    }

    async getUserInfo(){
        return await this.$http.fetch(this.$urls.adminInfo).then(r => {
            if(r.success){
                this.form = Object.assign(this.form, r.info)
                console.log('====================', this.form)
            }else{
                this.$message.error(r.msg)
            }
        })
    }

    getData(): Promise<any> {
        return Promise.resolve(undefined);
    }
}
