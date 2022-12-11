import { observable, runInAction, makeAutoObservable } from 'mobx';
import { DashboardServiceInstanse } from '../api/DashboardService';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';

export interface IOperatorStore {
    result: IModelResult;
    isResultActive: boolean;
    linkToResultFile: string;

    fetchResultByData(data: ITenderInput): Promise<IModelResult>;
    fetchResultByFile(options: any): Promise<string>;
}

export class OperatorStore implements IOperatorStore {
    fetchedFlights: IFlightRequest[];
    result: IModelResult;
    isResultActive: boolean;
    linkToResultFile: string;

    constructor() {
        makeAutoObservable(this, {
            fetchedFlights: observable,
            result: observable,
            linkToResultFile: observable,
        });

        this.fetchedFlights = [];
        this.result = {
            percent: 0,
            participants: 0,
        };
        this.isResultActive = false;
        this.linkToResultFile = '';
    }

    public async fetchResultByData(data: ITenderInput): Promise<IModelResult> {
        const result = await DashboardServiceInstanse.fetchResultByData(data);
        console.log(result);
        if (result) {
            runInAction(() => {
                this.result = result;
            });
        }

        return result;
    }

    public async fetchResultByFile(options: any): Promise<string> {
        const linkToFile = await DashboardServiceInstanse.fetchResultByFile(options);

        console.log(linkToFile);
        if (linkToFile) {
            runInAction(() => {
                this.linkToResultFile = linkToFile;
            });
        }
        console.log(linkToFile);

        return linkToFile;
    }
}
