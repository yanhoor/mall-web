import PageStateModel from "@/model/page_state_model";
import http from '../http/index'
import urls from '../http/urls'

export default abstract class PageFetchModel extends PageStateModel{
    $http = http
    $urls = urls

    async initData(){
        this.setInit()
        await this.refresh(true)
    }

    async refresh(init?: boolean){
        if(!init) this.setRefreshing()

        try{
            await this.getData()
            this.setCompleted()
        }catch(e){
         this.setError()
        }
    }

    abstract getData(): Promise<any>
}
