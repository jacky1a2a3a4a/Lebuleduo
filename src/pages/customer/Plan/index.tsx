import styled from 'styled-components';
import { IoMdCart, IoMdList } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API使用代理路徑
  // 路徑設定 > vite.config.ts
  const API_Path = '/api/GET/user/plans';

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        //fetch取得API資料，使用相對路徑經過代理
        const response = await fetch(API_Path);
        //解析JSON回應
        const data = await response.json();
        console.log('API 回應數據:', data);

        //更新狀態 - 從response中獲取Plans數組
        if (data && data.Plans && Array.isArray(data.Plans)) {
          setPlans(data.Plans);
        } else {
          setPlans([]);
          console.warn('API返回的數據結構中沒有Plans數組或格式不正確');
        }
      } catch (error) {
        console.error('獲取計劃數據時出錯:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // 處理點擊"立即預定"按鈕的函數
  //儲存planId到state，方便訂閱畫面使用，能夠顯示同樣的方案
  const handleSubscribe = (planId: number) => {
    navigate('/customer/subscribe', { state: { planId } });
  };

  return (
    <PlanSectionStyled>
      <PlanContainer>
        {isLoading && <LoadingMessage>載入中...</LoadingMessage>}

        {error && <ErrorMessage>錯誤: {error}</ErrorMessage>}

        {!isLoading && !error && plans.length === 0 && (
          <EmptyMessage>沒有可用的方案</EmptyMessage>
        )}

        {plans.map((plan, index) => {
          // 使用解構賦值簡化plan對象的處理
          const { PlanID, PlanName, Liter, Price } = plan;

          return (
            <PlanCard key={PlanID || index}>
              <PlanCardTitle>{PlanName || '錯誤'}</PlanCardTitle>
              <PlanCardDescription>
                <span>
                  ．每次收運: 一般垃圾 + 回收 + 廚餘 = {Liter || '錯誤'}公升
                </span>
                <span>．適合租屋族 / 小家庭 / 低垃圾量用戶</span>
              </PlanCardDescription>
              <Divider />
              <PlanCardPrice>NT$ {Price || '錯誤'}起/月</PlanCardPrice>
              <PlanButtons>
                <PlanButton>
                  <IconStyled>
                    <IoMdList />
                  </IconStyled>
                  方案詳情
                </PlanButton>
                <PlanButton onClick={() => handleSubscribe(PlanID)}>
                  <IconStyled>
                    <IoMdCart />
                  </IconStyled>
                  立即預定
                </PlanButton>
              </PlanButtons>
            </PlanCard>
          );
        })}
      </PlanContainer>
    </PlanSectionStyled>
  );
};

//訂閱方案 載入中訊息
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

//訂閱方案 錯誤訊息
const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: red;
`;

//訂閱方案 空訊息
const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

//訂閱方案 最大外容器
const PlanSectionStyled = styled.section`
  background-color: var(--color-gray-200);
  width: 100%;
  height: 100%;
  padding: var(--spacing-md);
  overflow-y: auto;
`;

//訂閱方案 容器
const PlanContainer = styled.div`
  background-color: var(--color-gray-200);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

//訂閱方案 卡片
const PlanCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--card-shadow);

  width: 100%;

  padding: var(--spacing-12) var(--spacing-md);
`;

//訂閱方案 卡片標題
const PlanCardTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin: var(--spacing-xs) 0;
`;

//訂閱方案 卡片描述
const PlanCardDescription = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
`;

//訂閱方案 卡片分隔線
const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-200);

  width: 100%;

  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
`;

//訂閱方案 卡片價格
const PlanCardPrice = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);

  display: flex;
  justify-content: flex-end;

  margin-bottom: var(--spacing-md);
`;

//訂閱方案 卡片按鈕容器
const PlanButtons = styled.div`
  display: flex;
  justify-content: space-around;
  gap: var(--spacing-md);
`;

//訂閱方案 卡片按鈕
const PlanButton = styled.button`
  background-color: var(--color-gray-300);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);

  font-size: var(--font-size-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  width: 100%;

  padding: var(--spacing-12) 0;

  &:hover {
    background-color: var(--color-gray-400);
  }
`;

//訂閱方案 卡片按鈕圖示
const IconStyled = styled.div`
  width: var(--spacing-md);
  height: var(--spacing-md);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Plan;
