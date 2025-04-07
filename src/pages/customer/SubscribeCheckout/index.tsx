import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

// 為styled-components定義類型
interface StyledProps {
  $active?: boolean; // 定義元件是否處於活動狀態
  $light?: boolean; // 定義元件是否使用淺色樣式
  $open?: boolean; // 定義元件（如下拉選單）是否展開
  $error?: boolean; // 定義元件是否處於錯誤狀態
}

//組件本體
const SubscribeCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 從上一頁獲取所有數據
  const {
    planName,
    liter,
    planKg,
    planPeople,
    planDescription,
    frequency,
    days,
    startDate,
    totalPrice,
    name,
    phone,
    address,
    notes,
    deliveryMethod,
    fixedPointImages,
  } = location.state || {};

  // 根據開始日期計算結束日期
  const calculateEndDate = () => {
    if (!startDate) return { start: '', end: '' };

    // 取得當前日期
    const start = new Date(startDate);

    // 創建結束日期，使用實際月份計算
    const end = new Date(start);

    // 獲取月份數
    const months = parseInt(frequency || '1');

    // 加上對應月數
    end.setMonth(end.getMonth() + months);

    // 如果原始日期是月底(如31日)，而目標月份沒有這一天，JS會自動進位
    // 例如：3月31日+1個月會變成5月1日而不是4月30日
    // 解決方法：如果原始日期的日期數大於結束月份的最後一天，則調整為結束月份的最後一天
    const startDay = start.getDate();
    const endDay = end.getDate();

    // 如果日期不同，說明發生了日期自動進位，需要回到上個月的最後一天
    if (startDay !== endDay) {
      // 將日期設為0，表示上個月的最後一天
      end.setDate(0);
    }

    // 格式化日期為 YYYY年MM月DD日(星期幾)
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const formattedStart = `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日(${weekdays[start.getDay()]})`;
    const formattedEnd = `${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日(${weekdays[end.getDay()]})`;

    return { start: formattedStart, end: formattedEnd };
  };

  // 計算結束日期
  // 解構
  const { start, end } = calculateEndDate();

  // 支付方式
  const [paymentMethod, setPaymentMethod] = useState('linepay'); // 預設使用Line Pay

  // 處理結帳按鈕
  const handleCheckout = () => {
    // 這裡可以實現實際的支付邏輯
    // 例如呼叫支付API等

    // 模擬完成後導航到訂閱成功頁面
    navigate('/customer/SubscribeSuccess', {
      state: {
        orderId: 'ORD' + Date.now(),
        planName,
        liter,
        planKg,
        planPeople,
        frequency,
        totalPrice,
        paymentMethod,
      },
    });
  };

  return (
    <PageWrapper>
      {/* 固定在頂部的進度指示器 */}
      <FixedStepsContainer>
        <StepWrapper>
          <StepItem>
            <StepNumber $active={true}>1</StepNumber>
            <StepText $active={true}>選擇方案</StepText>
          </StepItem>

          <StepConnector>
            <StepLine $active={true} />
          </StepConnector>

          <StepItem>
            <StepNumber $active={true}>2</StepNumber>
            <StepText $active={true}>填選收運資料</StepText>
          </StepItem>

          <StepConnector>
            <StepLine $active={true} />
          </StepConnector>

          <StepItem>
            <StepNumber $active={true}>3</StepNumber>
            <StepText $active={true}>結帳</StepText>
          </StepItem>
        </StepWrapper>
      </FixedStepsContainer>

      {/* 可滾動的內容區域 */}
      <ScrollableContent>
        {/* 訂單明細 - 整合所有資訊 */}
        <SectionTitle>
          <SectionMainTitle>訂單明細</SectionMainTitle>
          <SectionSubtitle>請再次確認訂單資訊</SectionSubtitle>
        </SectionTitle>

        <InfoSection>
          {/* 方案名稱 */}
          <PlanNameSection>
            <PlanNameTitle>
              {planName || '標準方案'} ({planPeople})
            </PlanNameTitle>
            <PlanNameSubtitle></PlanNameSubtitle>
          </PlanNameSection>

          <Divider />

          <InfoSubsection>
            {/* <InfoSubtitle>收運時間</InfoSubtitle> */}
            <InfoRaw>
              <InfoLineColumn>
                <InfoLabel>開始時間</InfoLabel>
                <InfoValue>{start}</InfoValue>
              </InfoLineColumn>
              <VerticalDivider />
              <InfoLineColumn>
                <InfoLabel>結束時間</InfoLabel>
                <InfoValue>{end}</InfoValue>
              </InfoLineColumn>
            </InfoRaw>
          </InfoSubsection>

          <Divider />

          <InfoSubsection>
            <InfoSubtitle>收運方式</InfoSubtitle>
            <InfoLine>
              <InfoLabel>• 每次收運量</InfoLabel>
              <InfoValue>
                一般垃圾+廚餘={liter}L / {planKg}kg
              </InfoValue>
            </InfoLine>

            <InfoLine>
              <InfoLabel>• 方案描述</InfoLabel>
              <InfoValue>{planDescription}</InfoValue>
            </InfoLine>

            <InfoLine>
              <InfoLabel>• 方案時長</InfoLabel>
              <InfoValue>{frequency || '錯誤'}個月</InfoValue>
            </InfoLine>

            <InfoLine>
              <InfoLabel>• 每周收運日</InfoLabel>
              <InfoValue>{days?.join('、') || '週一'}</InfoValue>
            </InfoLine>
          </InfoSubsection>

          <Divider />

          <InfoSubsection>
            <InfoSubtitle>收運資訊</InfoSubtitle>
            <InfoLine>
              <InfoLabel>• 姓名</InfoLabel>
              <InfoValue>{name || '錯誤'}</InfoValue>
            </InfoLine>

            <InfoLine>
              <InfoLabel>• 連絡電話</InfoLabel>
              <InfoValue>{phone || '錯誤'}</InfoValue>
            </InfoLine>

            <InfoLine>
              <InfoLabel>• 收運地址</InfoLabel>
              <InfoValue>{address || '錯誤'}</InfoValue>
            </InfoLine>
            <InfoLine>
              <InfoLabel>• 備註</InfoLabel>
              <InfoValue>{notes || '錯誤'}</InfoValue>
            </InfoLine>
            <InfoLine>
              <InfoLabel>• 收運方式</InfoLabel>
              <InfoValue>
                {deliveryMethod === 'fixedpoint' ? '放置固定點' : '面交收運'}
              </InfoValue>
            </InfoLine>

            {/* 如果選擇固定點且有照片則顯示照片 */}
            {deliveryMethod === 'fixedpoint' &&
              fixedPointImages &&
              fixedPointImages.length > 0 && (
                <>
                  <InfoLine>
                    <InfoLabel>• 固定點照片</InfoLabel>
                  </InfoLine>
                  <FixedPointImagesContainer>
                    {fixedPointImages.map((image) => (
                      <FixedPointImageItem key={image.id}>
                        <FixedPointImagePhoto
                          style={{ backgroundImage: `url(${image.url})` }}
                        />
                      </FixedPointImageItem>
                    ))}
                  </FixedPointImagesContainer>
                </>
              )}
          </InfoSubsection>
        </InfoSection>

        {/* 支付方式 */}
        <SectionTitle>
          <SectionMainTitle>選擇付款方式</SectionMainTitle>
          {/* <SectionSubtitle>請選擇一種便利的付款方式</SectionSubtitle> */}
        </SectionTitle>
        <FormSection>
          <PaymentOptions>
            <PaymentOption
              $active={paymentMethod === 'linepay'}
              onClick={() => setPaymentMethod('linepay')}
            >
              <RadioButton $active={paymentMethod === 'linepay'} />
              <PaymentOptionText>
                <PaymentOptionTitle>Line pay 付款</PaymentOptionTitle>
                <PaymentOptionDescription>
                  使用Line pay快速便利結帳，線上付款免手續費
                </PaymentOptionDescription>
              </PaymentOptionText>
            </PaymentOption>

            <PaymentOption
              $active={paymentMethod === 'credit'}
              onClick={() => setPaymentMethod('credit')}
            >
              <RadioButton $active={paymentMethod === 'credit'} />
              <PaymentOptionText>
                <PaymentOptionTitle>信用卡付款</PaymentOptionTitle>
                <PaymentOptionDescription>
                  使用信用卡安全付款，支援VISA、Master、JCB等主要信用卡
                </PaymentOptionDescription>
              </PaymentOptionText>
            </PaymentOption>
          </PaymentOptions>
        </FormSection>

        {/* 總計金額與結帳按鈕 */}
        <TotalPrice>
          <TotalPriceText>總金額</TotalPriceText>
          <TotalPriceTCount>NT${totalPrice || 580}</TotalPriceTCount>
        </TotalPrice>

        <CheckoutButton onClick={handleCheckout}>結帳</CheckoutButton>
      </ScrollableContent>
    </PageWrapper>
  );
};

// 整個頁面的容器
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--color-gray-0);
`;

// 固定在頂部的進度指示器
const FixedStepsContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-gray-0);
  padding: var(--spacing-lg) 0 var(--spacing-md) 0;
`;

// 步驟包裝器
const StepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

// 步驟連接器
const StepConnector = styled.div`
  flex: 1;
  position: relative;
  height: 2px;
  display: flex;
  align-items: center;
  margin-top: 12px; /* 調整連接器位置，使其與步驟號碼中心對齊 */
  z-index: 1; /* 確保連接線不被遮住 */
`;

// 步驟連接線
const StepLine = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-round);
  height: 2px;
  width: 70px;
`;

// 步驟項目
const StepItem = styled.div<StyledProps>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  min-width: 50px;
  white-space: nowrap;
`;

// 步驟號碼
const StepNumber = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  color: var(--color-gray-0);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  z-index: 3; /* 確保數字在連接線上方 */
  position: relative; /* 添加相對定位 */
  font-size: var(--font-size-sm);
  line-height: 1; //重置行高，才能完全置中
`;

// 步驟文字
const StepText = styled.div<StyledProps>`
  color: ${(props) =>
    props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-align: center;
`;

// 可滾動的內容區域
const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 區段標題
const SectionTitle = styled.div`
  margin-bottom: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 區段主標題
const SectionMainTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

// 區段副標題
const SectionSubtitle = styled.p`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-400);
`;

// 信息區段
const InfoSection = styled.div`
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// 分隔線
const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-300);
  margin: var(--spacing-md) 0;
`;

// 垂直分隔線
const VerticalDivider = styled.div`
  border-left: 1px solid var(--color-gray-300);
  height: 100%;
  margin-right: var(--spacing-md);
`;

// 方案名稱區塊
const PlanNameSection = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 方案名稱標題
const PlanNameTitle = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

// 方案名稱副標題
const PlanNameSubtitle = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
`;

// 訊息子區塊
const InfoSubsection = styled.div`
  margin-bottom: var(--spacing-md);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訊息子區塊行 水平排列
const InfoRaw = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 50px;
`;

// 訊息子標題
const InfoSubtitle = styled.h4`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  color: var(--color-gray-600);
`;

// 訊息行
const InfoLine = styled.div`
  display: flex;
  margin-bottom: var(--spacing-sm);
  &:last-child {
    margin-bottom: 0;
  }
`;

// 訊息行 水平排列
const InfoLineColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

// 訊息標籤
const InfoLabel = styled.span`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  margin-right: var(--spacing-sm);
`;

// 訊息值
const InfoValue = styled.span`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 表單區段
const FormSection = styled.div`
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// 支付方式選項容器
const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

// 支付方式選項
const PaymentOption = styled.div<StyledProps>`
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-md);
  border: 1px solid
    ${(props) =>
      props.$active ? 'var(--color-gray-400)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;

  &:hover {
    border-color: var(--color-gray-400);
  }
`;

// 支付方式文本容器
const PaymentOptionText = styled.div`
  margin-left: var(--spacing-md);
`;

// 支付方式標題
const PaymentOptionTitle = styled.div`
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

// 支付方式描述
const PaymentOptionDescription = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  line-height: 1.4;
`;

// 單選按鈕
const RadioButton = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-gray-600);
    display: ${(props) => (props.$active ? 'block' : 'none')};
  }
`;

// 總計價格
const TotalPrice = styled.div`
  font-weight: var(--font-weight-bold);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 總計價格文字
const TotalPriceText = styled.div`
  font-size: var(--font-size-sm);
  line-height: 1;
  margin-right: var(--spacing-sm);
`;

// 總計價格數字
const TotalPriceTCount = styled.div`
  font-size: var(--font-size-2xl);
`;

// 結帳按鈕
const CheckoutButton = styled.button`
  background-color: var(--color-gray-600);
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-700);
  }
`;

// 收運照片
// 收運照片容器 大容器
const FixedPointImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  margin-left: var(--spacing-sm);
`;

// 照片項目容器
const FixedPointImageItem = styled.div`
  width: 100px;
  height: 125px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

// 照片顯示
const FixedPointImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default SubscribeCheckout;
