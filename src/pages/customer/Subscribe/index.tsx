import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Plan } from './types';
import {
  LoadingMessage,
  PageWrapper,
  FixedStepsContainer,
  StepWrapper,
  StepItem,
  StepNumber,
  StepText,
  StepConnector,
  StepLine,
  ScrollableContent,
  SectionTitle,
  SectionMainTitle,
  SectionSubtitle,
  PlanSelector,
  PlanSelectorHeader,
  PlanInfo,
  PlanTitle,
  DropdownIcon,
  PlanDropdown,
  PlanOption,
  PlanOptionTitle,
  FrequencyOptions,
  FrequencyOption,
  RadioButton,
  FrequencyTextContainer,
  FrequencyText,
  FrequencySubtext,
  DiscountTag,
  WeekdaysContainer,
  WeekdayButton,
  ErrorMessage,
  DatePickerContainer,
  DateInput,
  TotalPrice,
  TotalPriceText,
  TotalPriceContainer,
  PriceDetails,
  TotalPriceTCount,
  OriginalPriceText,
  DiscountText,
  NextButton,
} from './styled';

// 週期天數選項
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

//組件本體
const Subscribe = () => {
  const navigate = useNavigate(); // 獲取導航功能
  const location = useLocation(); // 獲取當前位置對象
  const { planId } = location.state || {}; // 只取出需要使用的planId

  //// 狀態管理
  const [isLoading, setIsLoading] = useState(true); // 是否正在加載

  const [dropdownOpen, setDropdownOpen] = useState(false); // 是否開啟下拉選單
  const [plan, setPlan] = useState<Plan | null>(null); // 選擇的方案
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]); // 所有可用方案

  const [selectedFrequency, setSelectedFrequency] = useState('1'); // 預定預定期程:選擇的頻率
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // 預定收集日:選擇的收集日
  const [hasSelectedDays, setHasSelectedDays] = useState(false); // 預定收集日:是否已選擇收集日
  const [showDaysError, setShowDaysError] = useState(false); // 預定收集日:是否顯示收集日錯誤提示

  const [startDate, setStartDate] = useState(''); // 開始日期

  const [originalPrice, setOriginalPrice] = useState(0); // 折扣前總價格
  const [discount, setDiscount] = useState(0); // 折扣金額
  const [totalPrice, setTotalPrice] = useState(0); // 折扣後總價格

  // 總價格計算函式
  const updateTotalPrice = (price: number, frequency: string) => {
    const freq = parseInt(frequency);
    const rawPrice = price * freq;
    let discountRate = 1; //折扣率(無)
    let discountAmount = 0; //折扣價差(無)

    // 套用折扣：3個月95折，5個月9折
    if (freq === 3) {
      discountRate = 0.9;
    } else if (freq === 6) {
      discountRate = 0.85;
    }

    // 計算折扣後價格
    const discountedPrice = Math.round(rawPrice * discountRate);
    // 計算折扣價差
    discountAmount = rawPrice - discountedPrice;

    setOriginalPrice(rawPrice);
    setTotalPrice(discountedPrice);
    setDiscount(discountAmount);
  };

  // 獲取所有可用方案
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);

        // 模擬從API獲取所有方案
        const mockPlans: Plan[] = [
          {
            PlanID: 3,
            PlanName: '小汪方案',
            Liter: 25,
            kg: 5,
            Price: 299,
            PlanPeople: '1-2人用',
          },
          {
            PlanID: 4,
            PlanName: '中汪方案',
            Liter: 50,
            kg: 10,
            Price: 599,
            PlanPeople: '3-5人用',
          },
          {
            PlanID: 5,
            PlanName: '巨汪方案',
            Liter: 75,
            kg: 15,
            Price: 899,
            PlanPeople: '5人以上',
          },
        ];

        // 設置所有可用方案列表
        setAvailablePlans(mockPlans);

        // 如果從Plan頁面傳入了planId，則選中該方案
        // 否則默認選中第一個方案
        let selectedPlan;
        if (planId) {
          selectedPlan =
            mockPlans.find((p) => p.PlanID === Number(planId)) || mockPlans[0];
        } else {
          selectedPlan = mockPlans[0];
        }

        // 設置當前選中的方案
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
  }, [planId, selectedFrequency]);

  // 載入中
  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

  // 處理方案切換
  const handlePlanChange = (selectedPlan: Plan) => {
    setPlan(selectedPlan);
    updateTotalPrice(selectedPlan.Price, selectedFrequency);
    setDropdownOpen(false);
  };

  // 切換下拉選單
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    let newSelectedDays;
    if (selectedDays.includes(day)) {
      newSelectedDays = selectedDays.filter((d) => d !== day);
    } else {
      newSelectedDays = [...selectedDays, day];
    }

    setSelectedDays(newSelectedDays);
    // 如果有任何選擇的收集日，設置hasSelectedDays為true
    setHasSelectedDays(newSelectedDays.length > 0);
    // 清除錯誤提示
    if (newSelectedDays.length > 0) {
      setShowDaysError(false);
    }
  };

  // 處理下一步按鈕
  const handleNext = () => {
    // 如果沒有選擇收集日，則顯示錯誤提示
    if (selectedDays.length === 0) {
      setShowDaysError(true);
      // 滾動到收集日區域
      const weekdaysElement = document.getElementById('weekdays-section');
      if (weekdaysElement) {
        weekdaysElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // 將選擇的數據傳遞到下一個頁面
    navigate('/customer/SubscribeData', {
      state: {
        planId: plan?.PlanID,
        frequency: selectedFrequency,
        days: selectedDays,
        startDate,
        totalPrice,
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
            <StepLine $active={hasSelectedDays} />
          </StepConnector>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>填選收運資料</StepText>
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
        {/* 已選方案 */}
        <SectionTitle>
          <SectionMainTitle>已選方案</SectionMainTitle> 
          <SectionSubtitle>請選擇您要訂閱的方案</SectionSubtitle>
        </SectionTitle>

        {/* 方案下拉選擇器 */}
        <PlanSelector>
          <PlanSelectorHeader onClick={toggleDropdown} $open={dropdownOpen}>
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
                  $active={plan?.PlanID === availablePlan.PlanID}
                  onClick={() => handlePlanChange(availablePlan)}
                >
                  <PlanOptionTitle>
                    <div>
                      {availablePlan.PlanName} ({availablePlan.PlanPeople})
                    </div>
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
            $active={selectedFrequency === '1'}
            onClick={() => handleFrequencyChange('1')}
          >
            <RadioButton $active={selectedFrequency === '1'} />
            <FrequencyTextContainer>
              <FrequencyText>1 個月</FrequencyText>
              <FrequencySubtext>(共收運4週)</FrequencySubtext>
            </FrequencyTextContainer>
          </FrequencyOption>

          <FrequencyOption
            $active={selectedFrequency === '3'}
            onClick={() => handleFrequencyChange('3')}
          >
            <RadioButton $active={selectedFrequency === '3'} />
            <FrequencyTextContainer>
              <FrequencyText>3 個月</FrequencyText>
              <FrequencySubtext>(共收運12週)</FrequencySubtext>
            </FrequencyTextContainer>
            <DiscountTag>9 折優惠</DiscountTag>
          </FrequencyOption>

          <FrequencyOption
            $active={selectedFrequency === '6'}
            onClick={() => handleFrequencyChange('6')}
          >
            <RadioButton $active={selectedFrequency === '6'} />
            <FrequencyTextContainer>
              <FrequencyText>6 個月</FrequencyText>
              <FrequencySubtext>(共收運24週)</FrequencySubtext>
            </FrequencyTextContainer>
            <DiscountTag>85 折優惠</DiscountTag>
          </FrequencyOption>
        </FrequencyOptions>

        {/* 定期收集日 */}
        <SectionTitle id="weekdays-section">
          每周收運日
          <SectionSubtitle>請點選每週固定收運時間</SectionSubtitle>
        </SectionTitle>

        <WeekdaysContainer $error={showDaysError}>
          {WEEKDAYS.map((day, index) => (
            <WeekdayButton
              key={index}
              $active={selectedDays.includes(day)}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </WeekdayButton>
          ))}
        </WeekdaysContainer>

        {showDaysError && <ErrorMessage>*請至少選擇一個收運日</ErrorMessage>}

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
          <TotalPriceContainer>
            <TotalPriceTCount>NT${totalPrice}</TotalPriceTCount>
            {discount > 0 && (
              <PriceDetails>
                <OriginalPriceText>NT${originalPrice}</OriginalPriceText>
                <DiscountText>節省 NT${discount}</DiscountText>
              </PriceDetails>
            )}
          </TotalPriceContainer>
        </TotalPrice>

        <NextButton onClick={handleNext} $active={hasSelectedDays}>
          下一步
        </NextButton>
      </ScrollableContent>
    </PageWrapper>
  );
};

export default Subscribe;
