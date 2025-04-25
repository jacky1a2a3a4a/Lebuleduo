import { MdAddShoppingCart, MdOutlineTaskAlt } from 'react-icons/md';
import Lebuledou_trashcan from '../../../assets/images/Lebuledou_trashcan.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlans } from '../../../apis/customer/getPlan';
import {
  EmptyMessage,
  PlanSectionStyled,
  PlanContainer,
  PlanDescription,
  PlanDescriptionContent,
  PlanDescriptionText,
  PlanDescriptionImg,
  ContentItem,
  IconCheckedStyled,
  ContentText,
  ContentMainText,
  ContentSubText,
  PlanCardListContainer,
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
} from './styles';

import LoadingMessage from '../../../components/common/LoadingMessage';
import ErrorReport from '../../../components/common/ErrorReport';

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const plansData = await getPlans();
        setPlans(plansData);
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
        {isLoading && <LoadingMessage />}

        {error && <ErrorReport error={error} />}

        {!isLoading && !error && plans.length === 0 && (
          <EmptyMessage>沒有可用的方案</EmptyMessage>
        )}

        {/* 方案描述 */}
        <PlanDescription>
         
          <PlanDescriptionContent>
            <PlanDescriptionText>
              <ContentItem>
                <IconCheckedStyled>
                  <MdOutlineTaskAlt />
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
                  <MdOutlineTaskAlt />
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
                  <MdOutlineTaskAlt />
                </IconCheckedStyled>
                <ContentText>
                  <ContentMainText>line即時提醒</ContentMainText>
                  <ContentSubText>
                    收運前後自動推播通知，隨時更新垃圾處理狀況
                  </ContentSubText>
                </ContentText>
              </ContentItem>
            </PlanDescriptionText>

            <PlanDescriptionImg>
              <img src={Lebuledou_trashcan} alt="Lebuledou_trashcan" />
            </PlanDescriptionImg>
          </PlanDescriptionContent>
        </PlanDescription>

        {/* 方案卡片列表 */}
        <PlanCardListContainer>
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
                      <MdAddShoppingCart />
                    </IconStyled>
                    立即預訂
                  </PlanButton>
                </PlanButtons>
              </PlanCard>
            );
          })}
        </PlanCardListContainer>
      </PlanContainer>
    </PlanSectionStyled>
  );
};

export default Plan;
