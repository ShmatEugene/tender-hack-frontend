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
        const date = moment(data.date).format('YYYY.MM.DD');

        try {
            const response = await axios.post(`${API_URL}/calculate`, {
                session_name: data.name,
                OKPD: data.odpk,
                KPGZ: data.kpgz,
                Region: data.region,
                start_price: data.nmck,
                date: date,
                INN: data.inn,
            });
            // const response = await axios.get(`./response_1666522055380.json`);
            // console.log(response);

            let res: IModelResult = response.data;

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
            console.log(response.data);

            onSuccess('Ok');

            console.log('server res: ', response);
            return 'response';
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
