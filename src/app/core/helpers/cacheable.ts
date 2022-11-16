import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

declare type GetDataHandler<T> = () => Observable<T>;

export class Cacheable<T> {

    constructor() {
        this.subjectData = new ReplaySubject(1);
        this.observableData = this.subjectData.asObservable();
        this.cacheTimeout = 1440; // default 5 minutes
    }

    protected data: T;
    protected param: string[] = [];
    protected subjectData: Subject<T>;
    protected observableData: Observable<T>;
    protected cacheTimeout: number; // minutes
    protected lastCallAPI: number; // long milliseconds
    public getHandler: GetDataHandler<T>;

    get shouldCallAPI() {
        const now = new Date().getTime();
        return (now - this.lastCallAPI) > Cacheable.convertMinutesToMilliseconds(this.cacheTimeout);
    }

    private static convertMinutesToMilliseconds(min: number) {
        return min * 60 * 1000;
    }

    public getData(): Observable<T> {
        if (!this.getHandler) {
            throw new Error('getHandler is not defined');
        }
        if (!this.data || this.shouldCallAPI) {
            this.getHandler().pipe(map((r: T) => {
                this.data = r;
                this.lastCallAPI = new Date().getTime();
                return r;
            })).subscribe(
                result => this.subjectData.next(result),
                err => this.subjectData.error(err)
            );
        }
        return this.observableData;
    }

    public resetCache(): void {
        this.data = null;
    }

    public refresh(): void {
        this.resetCache();
        this.getData();
    }

    public setCacheTimeout(time: number): void {
        this.cacheTimeout = time;
    }

    public setParam(item) {
        this.param.push(item);
    }

    public getParam() {
        return this.param;
    }

}