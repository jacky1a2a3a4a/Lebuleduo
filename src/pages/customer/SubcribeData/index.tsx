import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

// 週期天數選項
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

// 為styled-components定義類型
interface StyledProps {
  active?: boolean; // 定義元件是否處於活動狀態
  light?: boolean; // 定義元件是否使用淺色樣式
  open?: boolean; // 定義元件（如下拉選單）是否展開
}

// 定義方案類型
interface Plan {
  PlanID: number;
  PlanName: string;
  Liter: number;
  kg: number;
  Price: number;
}

//組件本體
const SubscribeData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planId = location.state?.planId;

  //// 狀態管理
  const [isLoading, setIsLoading] = useState(true); // 是否正在加載

  const [dropdownOpen, setDropdownOpen] = useState(false); // 是否開啟下拉選單
  const [plan, setPlan] = useState<Plan | null>(null); // 選擇的方案
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]); // 所有可用方案

  const [selectedFrequency, setSelectedFrequency] = useState('1'); // 選擇的頻率
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // 選擇的收集日
  const [startDate, setStartDate] = useState(''); // 開始日期
  const [totalPrice, setTotalPrice] = useState(0); // 總價格

  // 獲取所有可用方案
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        // 這裡應該是從API獲取所有方案
        // 假設API返回的數據結構
        const mockPlans: Plan[] = [
          {
            PlanID: 1,
            PlanName: '小汪方案 (1-2人用)',
            Liter: 25,
            kg: 5,
            Price: 299,
          },
          {
            PlanID: 2,
            PlanName: '中汪方案 (3-5人用)',
            Liter: 50,
            kg: 10,
            Price: 599,
          },
          {
            PlanID: 3,
            PlanName: '巨汪方案 (5人以上)',
            Liter: 75,
            kg: 15,
            Price: 899,
          },
        ];

        setAvailablePlans(mockPlans);

        // 設置當前選中的方案
        const selectedPlan =
          mockPlans.find((p) => p.PlanID === Number(planId)) || mockPlans[0];
        setPlan(selectedPlan);
        updateTotalPrice(selectedPlan.Price, selectedFrequency);

        // 設置今天日期為默認開始日期
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setStartDate(formattedDate);
      } catch (error) {
        console.error('獲取方案詳情失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [planId]);

  // 更新總價格
  const updateTotalPrice = (price: number, frequency: string) => {
    setTotalPrice(price * parseInt(frequency));
  };

  // 處理方案切換
  const handlePlanChange = (selectedPlan: Plan) => {
    setPlan(selectedPlan);
    updateTotalPrice(selectedPlan.Price, selectedFrequency);
    setDropdownOpen(false);
  };

  // 處理週期選擇
  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(frequency);
    // 更新總價
    if (plan) {
      updateTotalPrice(plan.Price, frequency);
    }
  };

  // 處理收集日選擇
  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 處理下一步按鈕
  const handleNext = () => {
    // 將選擇的數據傳遞到下一個頁面
    navigate('/customer/checkout/user-data', {
      state: {
        planId: plan?.PlanID,
        frequency: selectedFrequency,
        days: selectedDays,
        startDate,
        totalPrice,
      },
    });
  };

  // 切換下拉選單
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

  return (
    <PageWrapper>
      {/* 固定在頂部的進度指示器 */}
      <FixedStepsContainer>
        <StepWrapper>
          <StepItem>
            <StepNumber active={true}>1</StepNumber>
            <StepText active={true}>選擇方案</StepText>
          </StepItem>

          <StepConnector>
            <StepLine active={true} />
          </StepConnector>

          <StepItem>
            <StepNumber active={true}>2</StepNumber>
            <StepText active={true}>填選收運資料</StepText>
          </StepItem>

          <StepConnector>
            <StepLine active={true} />
          </StepConnector>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>結帳</StepText>
          </StepItem>
        </StepWrapper>
      </FixedStepsContainer>

      {/* 可滾動的內容區域 */}
      <ScrollableContent>
        {/* 已選方案 */}
        <SectionTitle>
          已選方案
          <SectionSubtitle>請選擇您要訂閱的方案</SectionSubtitle>
        </SectionTitle>

        {/* 方案下拉選擇器 */}
        <PlanSelector>
          <PlanSelectorHeader onClick={toggleDropdown} open={dropdownOpen}>
            <PlanInfo>
              <PlanTitle>{plan?.PlanName || '請選擇方案'}</PlanTitle>
            </PlanInfo>
            <DropdownIcon>
              {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </DropdownIcon>
          </PlanSelectorHeader>

          {dropdownOpen && (
            <PlanDropdown>
              {availablePlans.map((availablePlan) => (
                <PlanOption
                  key={availablePlan.PlanID}
                  active={plan?.PlanID === availablePlan.PlanID}
                  onClick={() => handlePlanChange(availablePlan)}
                >
                  <PlanOptionTitle>
                    <div>{availablePlan.PlanName}</div>
                    <div>
                      {availablePlan.Liter}L / {availablePlan.kg}kg
                    </div>
                  </PlanOptionTitle>
                </PlanOption>
              ))}
            </PlanDropdown>
          )}
        </PlanSelector>

        {/* 取貨頻率 */}
        <SectionTitle>
          預定期程
          <SectionSubtitle>週期越長越優惠</SectionSubtitle>
        </SectionTitle>

        <FrequencyOptions>
          <FrequencyOption
            active={selectedFrequency === '1'}
            onClick={() => handleFrequencyChange('1')}
          >
            <RadioButton active={selectedFrequency === '1'} />
            <FrequencyTextContainer>
              <FrequencyText>1 個月</FrequencyText>
              <FrequencySubtext>(共收運4週)</FrequencySubtext>
            </FrequencyTextContainer>
          </FrequencyOption>

          <FrequencyOption
            active={selectedFrequency === '3'}
            onClick={() => handleFrequencyChange('3')}
          >
            <RadioButton active={selectedFrequency === '3'} />
            <FrequencyTextContainer>
              <FrequencyText>3 個月</FrequencyText>
              <FrequencySubtext>(共收運12週)</FrequencySubtext>
            </FrequencyTextContainer>
            <DiscountTag>95 折優惠</DiscountTag>
          </FrequencyOption>

          <FrequencyOption
            active={selectedFrequency === '5'}
            onClick={() => handleFrequencyChange('5')}
          >
            <RadioButton active={selectedFrequency === '5'} />
            <FrequencyTextContainer>
              <FrequencyText>5 個月</FrequencyText>
              <FrequencySubtext>(共收運24週)</FrequencySubtext>
            </FrequencyTextContainer>
            <DiscountTag>9 折優惠</DiscountTag>
          </FrequencyOption>
        </FrequencyOptions>

        {/* 定期收集日 */}
        <SectionTitle>
          每周收運日
          <SectionSubtitle>請點選每週固定收運時間</SectionSubtitle>
        </SectionTitle>

        <WeekdaysContainer>
          {WEEKDAYS.map((day, index) => (
            <WeekdayButton
              key={index}
              active={selectedDays.includes(day)}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </WeekdayButton>
          ))}
        </WeekdaysContainer>

        {/* 開始日期 */}
        <SectionTitle>
          開始日期
          <SectionSubtitle>請選擇開始收運的日期</SectionSubtitle>
        </SectionTitle>

        <DatePickerContainer>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </DatePickerContainer>

        {/* 總計金額與下一步 */}
        <TotalPrice>
          <TotalPriceText>總金額</TotalPriceText>
          <TotalPriceTCount>NT${totalPrice}</TotalPriceTCount>
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
    props.active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
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
    props.active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
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
    props.active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
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

// 已選定方案 最大容器
const PlanSelector = styled.div`
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

// 已選定方案 頭部
const PlanSelectorHeader = styled.div<StyledProps>`
  background-color: var(--color-gray-100);
  border: 2px solid var(--color-gray-200);
  border-radius: ${(props) =>
    props.open
      ? 'var(--border-radius-lg) var(--border-radius-lg) 0 0'
      : 'var(--border-radius-lg)'};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

// 方案信息
const PlanInfo = styled.div`
  flex: 1;
`;

// 下拉圖標
const DropdownIcon = styled.div`
  font-size: var(--font-size-lg);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 方案下拉菜單
const PlanDropdown = styled.div`
  border: 1px solid var(--color-gray-200);
  border-top: none;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  overflow: hidden;
`;

// 方案選項
const PlanOption = styled.div<StyledProps>`
  padding: var(--spacing-md);
  background-color: ${(props) =>
    props.active ? 'var(--color-gray-200)' : 'var(--color-gray-0)'};
  cursor: pointer;
  border-bottom: 1px solid var(--color-gray-200);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.active ? 'var(--color-gray-200)' : 'var(--color-gray-100)'};
  }
`;

// 方案選項標題
const PlanOptionTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-xs) 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 方案標題
const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 0 var(--spacing-xs) 0;
`;

// 預定期程 大容器
const FrequencyOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

// 預定期程 選項
const FrequencyOption = styled.div<StyledProps>`
  background-color: var(--color-gray-0);
  border: 1px solid
    ${(props) =>
      props.active ? 'var(--color-gray-400)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-xl);

  display: flex;
  align-items: center;
  padding: var(--spacing-md);

  position: relative;
  cursor: pointer;
`;

// 預定期程 按鈕
const RadioButton = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-gray-600);
    display: ${(props) => (props.active ? 'block' : 'none')};
  }
`;

// 預定期程 文字容器
const FrequencyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 預定期程 文字
const FrequencyText = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 預定期程 子文字
const FrequencySubtext = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
`;

// 預定期程 折扣標籤
const DiscountTag = styled.span`
  position: absolute;
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
`;

//// 每周收運日 大容器
const WeekdaysContainer = styled.div`
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);

  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);

  padding: var(--spacing-md);
`;

// 每周收運日 按鈕
const WeekdayButton = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.active ? 'var(--color-gray-500)' : 'var(--color-gray-0)'};
  color: ${(props) =>
    props.active ? 'var(--color-gray-0)' : 'var(--color-gray-500)'};
  border: 1px solid var(--color-gray-300);
  border-radius: 50%;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-sm);

  &:hover {
    background-color: ${(props) =>
      props.active ? 'var(--color-gray-700)' : 'var(--color-gray-300)'};
  }
`;

//// 日期選擇器 大容器
const DatePickerContainer = styled.div`
  margin-bottom: var(--spacing-lg);
`;

// 日期輸入
const DateInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
`;

// 總計價格
const TotalPrice = styled.div`
  font-weight: var(--font-weight-bold);

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 總計價格 文字
const TotalPriceText = styled.div`
  font-size: var(--font-size-sm);
  line-height: 1;

  margin-right: var(--spacing-sm);
`;

// 總計價格 數字
const TotalPriceTCount = styled.div`
  font-size: var(--font-size-2xl);
`;

// 下一步按鈕
const NextButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-gray-300);
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);

  &:hover {
    background-color: var(--color-gray-400);
  }
`;

export default SubscribeData;
