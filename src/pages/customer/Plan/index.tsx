import { IoMdCart, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
  PlanSectionStyled,
  PlanContainer,
  PlanDescription,
  PlanDescriptionTitle,
  PlanDescriptionContent,
  ContentItem,
  IconCheckedStyled,
  ContentText,
  ContentMainText,
  ContentSubText,
  PlanCard,
  PlanCardHeader,
  PlanCardTitle,
  PlanCardPrice,
  Divider,
  PlanCardDescription,
  PlanCardDescriptionItem,
  PlanButtons,
  PlanButton,
  IconStyled,
} from './styled';

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
  const handleSubscribe = (plan) => {
    const {
      PlanID,
      PlanName,
      Liter,
      Price,
      PlanKG,
      PlanDescription,
      PlanPeople,
    } = plan;
    navigate('/customer/subscribe', {
      state: {
        planId: PlanID,
        planName: PlanName,
        liter: Liter,
        price: Price,
        planKg: PlanKG,
        planDescription: PlanDescription,
        planPeople: PlanPeople,
      },
    });
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
          const {
            PlanID,
            PlanName,
            Liter,
            Price,
            PlanKG,
            PlanDescription,
            PlanPeople,
          } = plan;

          return (
            <PlanCard key={PlanID || index}>
              <PlanCardHeader>
                <PlanCardTitle>
                  {PlanName || '錯誤'} ({PlanPeople || '錯誤'})
                </PlanCardTitle>
                <PlanCardPrice>NT$ {Price || '錯誤'}起/月</PlanCardPrice>
              </PlanCardHeader>
              <Divider />
              <PlanCardDescription>
                <PlanCardDescriptionItem>
                  ．每次收運: 一般垃圾 + 回收 + 廚餘 = {Liter || '錯誤'}公升 /{' '}
                  {PlanKG || '錯誤'}公斤
                </PlanCardDescriptionItem>
                <PlanCardDescriptionItem>
                  ．{PlanDescription || '錯誤'}
                </PlanCardDescriptionItem>
              </PlanCardDescription>

              <PlanButtons>
                <PlanButton onClick={() => handleSubscribe(plan)}>
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

export default Plan;
