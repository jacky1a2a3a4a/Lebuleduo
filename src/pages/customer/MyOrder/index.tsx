import styled from 'styled-components';
import { HiCalendar, HiTruck } from 'react-icons/hi2';

//最外層容器
const MyOrderSectionStyled = styled.section`
  background-color: var(--color-gray-100);
`;

// 使用者卡片區塊
const UserCardSection = styled.div`
  background-color: var(--color-gray-300);
`;

// 使用者卡片
const UserCard = styled.div`
  background-color: var(--color-gray-200);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 0 var(--spacing-lg);
`;

// 使用者卡片 問候語
const Greeting = styled.div`
  color: var(--color-gray-600);

  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-sm);
`;

// 使用者卡片 容器
const CardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 使用者卡片 標題 容器
const CardTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// 使用者卡片 圖示
const IconItem = styled.div`
  background-color: var(--color-gray-100);
  color: var(--color-gray-600);
`;

// 使用者卡片 文字
const TextItem = styled.div`
  background-color: var(--color-gray-100);
`;

// 使用者卡片 內容
const CardContent = styled.div`
  background-color: var(--color-gray-100);
`;

// 進度條區塊
const ProgressBarSection = styled.div`
  background-color: var(--color-gray-100);
`;

// 進度條
const ProgressBar = styled.div`
  background-color: var(--color-gray-100);
`;

//訂單列表區塊
const OrderListSection = styled.div`
  background-color: var(--color-gray-100);
`;

const OrderList = styled.div`
  background-color: var(--color-gray-100);
`;

function MyOrder() {
  return (
    <MyOrderSectionStyled>
      <UserCardSection>
        <UserCard>
          <Greeting>您好，尊貴的會員</Greeting>

          <CardItem>
            <CardTitle>
              <IconItem>
                <HiCalendar />
              </IconItem>
              <TextItem>2025/03/25</TextItem>
            </CardTitle>
            <CardContent>10:00 - 11:00</CardContent>
          </CardItem>

          <CardItem>
            <CardTitle>
              <IconItem>
                <HiTruck />
              </IconItem>
              <TextItem>2025/03/25</TextItem>
            </CardTitle>
            <CardContent>訂單狀態</CardContent>
          </CardItem>
        </UserCard>
      </UserCardSection>
      <ProgressBarSection>
        <ProgressBar />
      </ProgressBarSection>
      <OrderListSection>
        <OrderList />
      </OrderListSection>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
