import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Upload } from 'antd';
import React, { FC } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { useStores } from '../../hooks/useStores';

import './TenderForm.scss';
import { IModelResult, ITenderInput } from '../../models/TenderInterfaces';

const TenderForm = () => {
    const { operatorStore } = useStores();

    const onFinish = (values: ITenderInput) => {
        console.log('Success:1', values);
        operatorStore.fetchResultByData(values);
        // const lotName = values.lotName,
        //     lotPriceInRub = values.lotPriceInRub,
        //     minNumberOfParticipants = values.minNumberOfParticipants;
        // auctionStore.setFormData(lotName, lotPriceInRub, minNumberOfParticipants);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name='tender-form'
                className='tender-form'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
            >
                <Row>
                    <Col className='tender-form__col' span={12}>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите название' }]}
                            label='Название'
                            name='tenderName'
                        >
                            <Input placeholder='Новогодний подарок в тубе' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите дату' }]}
                            label='Дата размещения'
                            name='date'
                        >
                            <DatePicker placeholder='9.12.2022' />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ИНН',
                                },
                            ]}
                            name='inn'
                            label='ИНН заказчика'
                        >
                            <Input placeholder='с00с03dca0a2' />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Регион',
                                },
                            ]}
                            name='region'
                            label='Регион'
                        >
                            <Input placeholder='Москва' />
                        </Form.Item>
                    </Col>
                    <Col className='tender-form__col' span={12}>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите цену' }]}
                            label='НМЦК'
                            name='nmck'
                            tooltip='Кодировка товаров, работ или услуг – объектов котировочной сессии по общему классификатору продукции по видам экономической деятельности'
                        >
                            <InputNumber placeholder='505555 ₽' />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Введите кодировку' }]}
                            label='ОКПД 2'
                            name='okpd'
                            tooltip='Кодировка товаров, работ или услуг – объектов котировочной сессии по общему классификатору продукции по видам экономической деятельности'
                        >
                            <Input placeholder='06.10.10.110' />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите КПГЗ',
                                },
                            ]}
                            name='kpgz'
                            label='КПГЗ'
                            tooltip='Кодировка товаров, работ или услуг – объектов котировочной сессии по общему классификатору продукции по видам экономической деятельности'
                        >
                            <Input placeholder='01.06.01.03.01;01.06.01.03.01' />
                        </Form.Item>
                    </Col>
                    <Col className='tender-form__col' span={24}>
                        <Form.Item>
                            <Button
                                className='submit-btn'
                                type='primary'
                                htmlType='submit'
                                size='large'
                                shape='round'
                            >
                                Рассчитать
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default TenderForm;
