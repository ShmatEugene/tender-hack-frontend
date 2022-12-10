export interface ITenderInput {
    name: string;
    date: Date;
    inn: string;
    nmck: number;
    odpk: string;
    kpgz: string;
    region: string;
}

export interface IModelResult {
    percent: number;
    participants: number;
}
