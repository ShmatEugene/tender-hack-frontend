import { Badge, Col, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import ModelResult from '../../components/ModelResult/ModelResult';
import TenderForm from '../../components/TenderForm/TenderForm';
import { useStores } from '../../hooks/useStores';

import './Home.scss';

const Home: FC = observer(() => {
    const { operatorStore } = useStores();
    const result = operatorStore.result;
    console.log(result);

    return (
        <>
            <Row className='home-page' justify='center'>
                <Col flex={'0 0 1200px'} xs={{ span: 20 }}>
                    <Row justify='space-between'>
                        <Col span={12}>
                            <Typography.Title level={1}>
                                Предсказание модели котировочной сессии
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col span={12}>
                            <FileInput />
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        <Col span={12}>
                            <TenderForm />
                        </Col>
                        <Col span={11} offset={1}>
                            {result.participants !== 0 && <ModelResult />}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
});

export default Home;
