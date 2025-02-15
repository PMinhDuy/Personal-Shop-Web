import { Button, Col, Row, Typography } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { type ReactNode, Suspense, memo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_URL } from '#/shared/ultils/constant';

interface ContentLayoutInterface {
  title?: string;
  className?: {
    backgroundColor?: string;
    productNameColor?: string;
    titleColor?: string;
    backgroundButtonColor?: string;
    buttonTextColor?: string;
  };
  children?: ReactNode;
  id: string;
  showButton?: boolean;
  showSidebar?: boolean;
}

const CONTENT_SIDEBAR = [
  {
    id: 0,
    title: 'Quần áo',
  },
  {
    id: 1,
    title: 'Phụ kiện',
  },
  {
    id: 2,
    title: 'Giày dép',
  },
  {
    id: 3,
    title: 'Bé gái',
  },
  {
    id: 4,
    title: 'Bé trai',
  },
];

function CategoryLayout({
  title,
  className,
  children,
  showButton = true,
  showSidebar = true,
  id,
}: ContentLayoutInterface) {
  const [selectedId, setSelectedId] = useState(0);
  const navigate = useNavigate();

  const onViewDetailCategory = (id: string) => {
    navigate(generatePath(PATH_URL.category, { id }));
  };

  return (
    <div className={`flex flex-col justify-between ${className?.backgroundColor} px-[200px] py-[50px]`}>
      <div className={`w-full flex justify-between pb-[30px]`}>
        <Typography.Text className={`uppercase font-bold text-4xl ${className?.titleColor}`}>{title}</Typography.Text>
        {showSidebar && (
          <div className="flex items-center space-x-10">
            <DoubleLeftOutlined
              className="hover:text-primary-green-color cursor-pointer"
              onClick={() => {
                setSelectedId((id) => (id === 0 ? 4 : id - 1));
              }}
            />
            <Row gutter={[12, 0]}>
              {CONTENT_SIDEBAR.map((item) => (
                <Col key={item.id}>
                  <div
                    className={`px-[20px] text-base py-2 hover:cursor-pointer ${
                      item.id === selectedId ? 'bg-primary-yellow-color text-white transition-all duration-400' : ''
                    } rounded-xl`}
                    onClick={() => {
                      setSelectedId(item.id);
                    }}
                  >
                    {item.title}
                  </div>
                </Col>
              ))}
            </Row>
            <DoubleRightOutlined
              className="hover:text-primary-green-color cursor-pointer"
              onClick={() => {
                setSelectedId((id) => (id === 4 ? 0 : id + 1));
              }}
            />
          </div>
        )}
      </div>
      <Suspense fallback={<div>Loading....</div>}>{children}</Suspense>
      {showButton && (
        <div className="flex justify-center pt-[50px]">
          <Button
            className={`px-[70px] py-[25px] text-lg font-bold flex justify-center items-center ${className?.backgroundButtonColor} ${className?.buttonTextColor}`}
            onClick={() => {
              onViewDetailCategory(id);
            }}
          >
            Xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(CategoryLayout);
