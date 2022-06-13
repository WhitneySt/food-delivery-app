import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { EditOutlined, EllipsisOutlined} from '@ant-design/icons';
const { Meta } = Card

const Food = (props = {}) => {
    const { image, name, price, id } = props;
    const navigate = useNavigate();

    return (
        <Card id={id}
            hoverable
            style={{
                width: 240, margin: '1em'
            }}
            cover={<img alt={name} src={image} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />}
            // actions={[
            //     <EditOutlined key="edit" />,
            //     <EllipsisOutlined key="ellipsis" />
            //   ]}
            onClick={() => {
                navigate(`/food/${id}`);
            }}
        >
            <Meta title={name} description={`$ ${price.toLocaleString()}`} />
        </Card>
    )
}

export default Food