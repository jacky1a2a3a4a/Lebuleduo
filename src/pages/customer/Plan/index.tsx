import styled from 'styled-components';
import { IoMdCart, IoMdCheckmarkCircleOutline } from 'react-icons/io';
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

        {/* 方案描述 */}
        <PlanDescription>
          <PlanDescriptionTitle>方案介紹</PlanDescriptionTitle>
          <PlanDescriptionContent>
            <ContentItem>
              <IconCheckedStyled>
                <IoMdCheckmarkCircleOutline />
              </IconCheckedStyled>
              <ContentText>
                <ContentMainText>大包小包一次搞定</ContentMainText>
                <ContentSubText>
                  每次收運同時處理「一般垃圾＋回收＋廚餘」
                </ContentSubText>
              </ContentText>
            </ContentItem>

            <ContentItem>
              <IconCheckedStyled>
                <IoMdCheckmarkCircleOutline />
              </IconCheckedStyled>
              <ContentText>
                <ContentMainText>每週收運自由選</ContentMainText>
                <ContentSubText>
                  每週1～7天彈性安排，依你生活節奏自由調整
                </ContentSubText>
              </ContentText>
            </ContentItem>

            <ContentItem>
              <IconCheckedStyled>
                <IoMdCheckmarkCircleOutline />
              </IconCheckedStyled>
              <ContentText>
                <ContentMainText>line即時提醒</ContentMainText>
                <ContentSubText>
                  收運前後自動推播通知，隨時更新垃圾處理狀況
                </ContentSubText>
              </ContentText>
            </ContentItem>
          </PlanDescriptionContent>
        </PlanDescription>

        {/* 方案卡片列表 */}
        {plans.map((plan, index) => {
          // 使用解構賦值簡化plan對象的處理
          const { PlanID, PlanName, Liter, Price } = plan;

          return (
            <PlanCard key={PlanID || index}>
              <PlanCardHeader>
                <PlanCardTitle>{PlanName || '錯誤'}</PlanCardTitle>
                <PlanCardPrice>NT$ {Price || '錯誤'}起/月</PlanCardPrice>
              </PlanCardHeader>
              <Divider />
              <PlanCardDescription>
                <PlanCardDescriptionItem>
                  ．每次收運: 一般垃圾 + 回收 + 廚餘 = {Liter || '錯誤'}公升
                </PlanCardDescriptionItem>
                <PlanCardDescriptionItem>
                  ．適合租屋族 / 小家庭 / 低垃圾量用戶
                </PlanCardDescriptionItem>
              </PlanCardDescription>

              <PlanButtons>
                <PlanButton onClick={() => handleSubscribe(PlanID)}>
                  <IconStyled>
                    <IoMdCart />
                  </IconStyled>
                  立即預訂
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//訂閱方案 容器
const PlanContainer = styled.div`
  background-color: var(--color-gray-200);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

////方案介紹 最外層容器
const PlanDescription = styled.div`
  background-color: var(--color-gray-200);
`;

//訂閱方案 方案介紹標題
const PlanDescriptionTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-md);
`;

//訂閱方案 方案介紹內容
const PlanDescriptionContent = styled.p`
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 方案介紹內容項目
const ContentItem = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: var(--spacing-md);
`;

//訂閱方案 打勾icon
const IconCheckedStyled = styled.div`
  color: var(--color-primary);

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: var(--spacing-sm);

  font-size: var(--font-size-2xl);
`;

//訂閱方案 方案介紹內容項目文字容器
const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

//訂閱方案 方案介紹內容項目主文字
const ContentMainText = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 方案介紹內容項目副文字
const ContentSubText = styled.p`
  color: var(--color-gray-500);

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
`;

////訂閱方案 卡片
const PlanCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--card-shadow);

  width: 100%;

  padding: var(--spacing-12) var(--spacing-md);
`;

//訂閱方案 卡片標題容器
const PlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//訂閱方案 卡片標題
const PlanCardTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin: var(--spacing-xs) 0;
`;

//訂閱方案 卡片價格
const PlanCardPrice = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 卡片分隔線
const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-200);

  width: 100%;

  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
`;

//訂閱方案 卡片描述
const PlanCardDescription = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  display: flex;
  flex-direction: column;

  margin-bottom: var(--spacing-md);
`;

//訂閱方案 卡片描述 項目
const PlanCardDescriptionItem = styled.p`
  margin-bottom: var(--spacing-sm);
`;

//訂閱方案 卡片按鈕容器
const PlanButtons = styled.div`
  display: flex;
  justify-content: flex-end;
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

  width: 50%;

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
