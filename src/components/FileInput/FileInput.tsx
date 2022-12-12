import React from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Upload } from 'antd';
import { useStores } from '../../hooks/useStores';
//@ts-ignore
import { CSVLink, CSVDownload } from 'react-csv';

import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

import './FileInput.scss';
import { observer } from 'mobx-react-lite';

const FileInput = observer(() => {
    const { operatorStore } = useStores();
    const [isPurchasesUploadHidden, setIsPurchasesUploadHidden] = React.useState(true);
    const [isMissionsUploadHidden, setIsMissionsUploadHidden] = React.useState(true);

    const linkToFile = operatorStore.linkToResultFile;
    console.log(linkToFile);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onFileUploadSuccess = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'done') {
            // setIsPurchasesUploadHidden(false);
        } else {
            // setIsMissionsUploadHidden(true);
            // setIsPurchasesUploadHidden(true);
        }
    };

    return (
        <>
            <Form
                name='upload-form'
                className='upload-form'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name='table' label='csv file'>
                    <Form.Item
                        rules={[{ required: true, message: 'Загрузите таблицу' }]}
                        name='dragger'
                        noStyle
                    >
                        <Upload.Dragger
                            name='table'
                            customRequest={async (options) => {
                                operatorStore.fetchResultByFile(options);
                            }}
                            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                            maxCount={1}
                            onChange={onFileUploadSuccess}
                        >
                            <p className='ant-upload-drag-icon'>
                                <UploadOutlined />
                            </p>
                            <p className='ant-upload-text'>Перетащите</p>
                            <p className='ant-upload-hint'>файлы или выберите с компьютера</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
            {
                <Button
                    className='submit-btn file-download-btn'
                    type='primary'
                    size='large'
                    shape='round'
                    disabled={!linkToFile}
                >
                    <CSVLink data={linkToFile}>Скачать</CSVLink>
                    {/* <a href={linkToFile} download>
                        Cкачать
                    </a> */}
                </Button>
            }
        </>
    );
});

export default FileInput;
