import React from 'react';
import { Badge, Col, Row, Typography } from 'antd';

import './ModelResult.scss';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const ModelResult = observer(() => {
    const { operatorStore } = useStores();
    const result = toJS(operatorStore.result);
    let res = 0;
    console.log(result.percent);
    if (result && result.percent) {
        res = +result.percent.toFixed(4);
        if (+result.percent < 0) {
            res = 0;
        } else if (result.percent > 1) {
            res = 1;
        } else {
            res *= 100;
        }
    }
    // res = +res.toFixed(2);
    return (
        <>
            <div className='model-result'>
                <Row justify='center'>
                    <Typography.Title level={2}>Результат анализа</Typography.Title>
                </Row>
                <Row>
                    <div className='metrics'>
                        <div className='metric'>
                            <div className='metric__label'>Отклонение от начальной стоимости</div>
                            <div className='metric__value'>{res.toFixed(2) || 0}%</div>
                        </div>
                        <div className='metric'>
                            <div className='metric__label'>Количество участников</div>
                            <div className='metric__value'>{result.participants || 0}</div>
                        </div>
                        {/* <div className='metric'>
                            <div className='metric__label'>Итоговая стоимость</div>
                            <div className='metric__value'>250000 ₽</div>
                        </div> */}
                    </div>
                </Row>
            </div>
        </>
    );
});

export default ModelResult;
