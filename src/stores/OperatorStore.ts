import { observable, runInAction, makeAutoObservable } from 'mobx';
import { DashboardServiceInstanse } from '../api/DashboardService';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';

export interface IOperatorStore {
    result: IModelResult;
    isResultActive: boolean;
    linkToResultFile: string;
    isLoading: boolean;

    fetchResultByData(data: ITenderInput): Promise<IModelResult>;
    fetchResultByFile(options: any): Promise<string>;
}

export class OperatorStore implements IOperatorStore {
    fetchedFlights: IFlightRequest[];
    result: IModelResult;
    isResultActive: boolean;
    linkToResultFile: string;
    isLoading: boolean;

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
        this.isLoading = false;
    }

    public async fetchResultByData(data: ITenderInput): Promise<IModelResult> {
        this.isLoading = true;

        try {
            const result = await DashboardServiceInstanse.fetchResultByData(data);
            console.log(result);
            if (result) {
                runInAction(() => {
                    this.result = result;
                    this.isLoading = false;
                });
            }
            return result;
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            throw error;
        }
    }

    public async fetchResultByFile(options: any): Promise<string> {
        try {
            const linkToFile = await DashboardServiceInstanse.fetchResultByFile(options);

            console.log(linkToFile);
            if (linkToFile) {
                runInAction(() => {
                    this.linkToResultFile = linkToFile;
                });
            }
            console.log(linkToFile);

            return linkToFile;
        } catch (error) {
            console.log('error');
            return new Promise(() => 'error');
        }
    }
}
