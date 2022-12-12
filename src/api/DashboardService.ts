import axios, { AxiosResponse, ResponseType } from 'axios';
import { message } from 'antd';
import { API_URL } from '../config';
import { IFlightRequest } from '../models/TasksInterfaces';
import { IModelResult, ITenderInput } from '../models/TenderInterfaces';
import moment from 'moment';

export interface IDashboardService {
    fetchResultByData(data: ITenderInput): Promise<IModelResult>;
    fetchResultByFile(options: any): Promise<string>;
}

class DashboardService implements IDashboardService {
    public async fetchResultByData(data: ITenderInput): Promise<IModelResult> {
        const date = moment(data.date).format('DD.MM.YYYY');
        try {
            const response = await axios.post(`${API_URL}/calculate`, {
                id: 287205,
                session_name: data.name,
                OKPD: data.odpk,
                KPGZ: data.kpgz,
                Region: data.region,
                start_price: data.nmck,
                date: date,
                INN: 'asdf023820s',
            });
            // const response = await axios.get(`./response_1666522055380.json`);
            // console.log(response);

            let res: IModelResult = response.data;
            console.log(res);

            return res;
        } catch (err) {
            message.error('Ошибка получения результата');
            console.log('Eroor: ', err);
            const error = new Error('Ошибка получения результата');
            throw error;
        }
    }

    public async fetchResultByFile(options: any): Promise<string> {
        const { onSuccess, onError, file } = options;

        const fmData = new FormData();

        const type: ResponseType = 'blob';
        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' },
        //     // responseType: type,
        // };
        fmData.append('file', file);

        console.log(fmData);

        try {
            // const response = await axios.post(`${API_URL}/calculate_csv`, fmData, config);
            const response = await axios.post(`${API_URL}/calculate_csv`, fmData);
            // const href = URL.createObjectURL(response.data);
            // console.log(href);
            console.log(response);

            onSuccess('Ok');

            console.log('server res: ', response.data);
            // return 'blob:http://94.45.223.241:46873/35ae6522-de4b-4960-a843-398c7b1818fc';
            return response.data;
            return 'https://www.stats.govt.nz/assets/Uploads/Tools/CSV-files-for-download/analysis-public-place-assaults-sexual-assaults-and-robberies-2015-csv.csv';
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Some error');
            message.error('Не удалось загрузить таблицу');
            onError({ err });
            throw error;
        }
    }
}

export const DashboardServiceInstanse = new DashboardService();
