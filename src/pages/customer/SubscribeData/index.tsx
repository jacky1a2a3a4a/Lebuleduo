import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';

// 為styled-components定義類型
interface StyledProps {
  $active?: boolean; // 定義元件是否處於活動狀態
  $light?: boolean; // 定義元件是否使用淺色樣式
  $open?: boolean; // 定義元件（如下拉選單）是否展開
}

//組件本體
const SubscribeData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 從上一頁獲取方案數據
  const { planId, planName, frequency, days, startDate, totalPrice } =
    location.state || {};

  //// 狀態管理
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' 或 'ereceipt'

  // 載入中
  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

  // 處理下一步按鈕
  const handleNext = () => {
    navigate('/customer/checkout', {
      state: {
        planId,
        planName,
        frequency,
        days,
        startDate,
        totalPrice,
        name,
        phone,
        address,
        notes,
        deliveryMethod,
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
            <StepLine />
          </StepConnector>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>結帳</StepText>
          </StepItem>
        </StepWrapper>
      </FixedStepsContainer>

      {/* 可滾動的內容區域 */}
      <ScrollableContent>
        {/* 收運資料 */}
        <FormSection>
          <SectionTitle>
            收運資料
            <SectionSubtitle>請輸入正確的收運地址與資料</SectionSubtitle>
          </SectionTitle>

          <FormGroup>
            <InputLabel>輸入人姓名</InputLabel>
            <StyledInput
              type="text"
              placeholder="請輸入您的真實姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>聯絡電話</InputLabel>
            <StyledInput
              type="tel"
              placeholder="請輸入手機或市話號碼"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <InputLabel>收運地址</InputLabel>
            <MapContainer>
              <MapIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0027965864907!2d121.51840807617604!3d25.04781513972173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z5Y-w5YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1682865618561!5m2!1szh-TW!2stw"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></MapIframe>
              <MapOverlay>
                <MapMarker>
                  <IoLocationSharp />
                </MapMarker>
                <EditButton>
                  <BsPencil />
                  <span>編輯地址</span>
                </EditButton>
              </MapOverlay>
            </MapContainer>
          </FormGroup>

          <FormGroup>
            <InputLabel>附加備註</InputLabel>
            <StyledTextarea
              placeholder="如有特殊收運需求，請在此備註"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
        </FormSection>

        {/* 收據方式 */}
        <FormSection>
          <SectionTitle>
            收據方式
            <SectionSubtitle>請選擇收據開立方式</SectionSubtitle>
          </SectionTitle>

          <DeliveryOptions>
            <DeliveryOption
              $active={deliveryMethod === 'delivery'}
              onClick={() => setDeliveryMethod('delivery')}
            >
              <RadioButton $active={deliveryMethod === 'delivery'} />
              <DeliveryOptionText>
                <DeliveryOptionTitle>專員親送</DeliveryOptionTitle>
                <DeliveryOptionDescription>
                  請向上門收運的專員索取收據，可當場確認無誤。
                </DeliveryOptionDescription>
              </DeliveryOptionText>
            </DeliveryOption>

            <DeliveryOption
              $active={deliveryMethod === 'ereceipt'}
              onClick={() => setDeliveryMethod('ereceipt')}
            >
              <RadioButton $active={deliveryMethod === 'ereceipt'} />
              <DeliveryOptionText>
                <DeliveryOptionTitle>電子收據</DeliveryOptionTitle>
                <DeliveryOptionDescription>
                  將以您留下的聯絡資訊，寄送電子收據供您存檔，無紙化環保。
                </DeliveryOptionDescription>
              </DeliveryOptionText>
            </DeliveryOption>
          </DeliveryOptions>
        </FormSection>

        {/* 總計金額與下一步 */}
        <TotalPrice>
          <TotalPriceText>總金額</TotalPriceText>
          <TotalPriceTCount>NT${totalPrice || 580}</TotalPriceTCount>
        </TotalPrice>
        <NextButton onClick={handleNext}>下一步</NextButton>
      </ScrollableContent>
    </PageWrapper>
  );
};

// 載入訊息
const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

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

// 區段標題 模板
const SectionTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 區段副標題 模板
const SectionSubtitle = styled.p`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-400);
`;

// 表單區段
const FormSection = styled.div`
  margin-bottom: var(--spacing-lg);
`;

// 表單組
const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 輸入標籤
const InputLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--color-gray-600);
`;

// 樣式化輸入框
const StyledInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
  }
`;

// 樣式化文本區域
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  min-height: 100px;
  resize: none;

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
  }
`;

// 地圖容器
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
`;

// 地圖iframe
const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// 地圖覆蓋層
const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
`;

// 地圖標記
const MapMarker = styled.div`
  color: var(--color-red-500);
  font-size: 32px;
  margin-top: 30px;
`;

// 編輯按鈕
const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-xs);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

// 收貨方式選項容器
const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

// 收貨方式選項
const DeliveryOption = styled.div<StyledProps>`
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

// 收貨方式文本容器
const DeliveryOptionText = styled.div`
  margin-left: var(--spacing-md);
`;

// 收貨方式標題
const DeliveryOptionTitle = styled.div`
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

// 收貨方式描述
const DeliveryOptionDescription = styled.div`
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

// 下一步按鈕
const NextButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-gray-500);
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-gray-600);
  }
`;

export default SubscribeData;
