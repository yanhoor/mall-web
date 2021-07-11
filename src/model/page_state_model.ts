import {PageState} from "@/model/page_state";

export default class PageStateModel{
    private _pageState: PageState = 0

    set pageState(value:PageState){
        this._pageState = value
    }

    get pageState(): PageState{
        return this._pageState
    }

    setInit(){
        this._pageState = PageState.init
    }

    setRefreshing(){
        this._pageState = PageState.refreshing
    }

    setBusy(){
        this._pageState = PageState.busy
    }

    setNoMore(){
        this._pageState = PageState.noMore
    }

    setEmpty(){
        this._pageState = PageState.empty
    }

    setCompleted(){
        this._pageState = PageState.completed
    }

    setError(){
        this._pageState = PageState.error
    }

    get init(): boolean{
        return this._pageState === PageState.init
    }

    get refreshing(): boolean{
        return this._pageState === PageState.refreshing
    }

    get completed(): boolean{
        return this._pageState === PageState.completed
    }

    get busy(): boolean{
        return this._pageState === PageState.busy
    }

    get noMore(): boolean{
        return this._pageState === PageState.noMore
    }

    get empty(): boolean{
        return this._pageState === PageState.empty
    }

    get error(): boolean{
        return this._pageState === PageState.error
    }
}
