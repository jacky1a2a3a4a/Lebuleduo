import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdInfoOutline } from 'react-icons/md';

import {
  PageWrapper,
  ScrollableContent,
  PlanSelector,
  PlanSelectorHeader,
  PlanInfo,
  PlanTitle,
  DropdownIcon,
  PlanDropdown,
  PlanOption,
  PlanOptionTitle,
  PlanOptionMainTitle,
  PlanOptionSubtitle,
  ButtonCardOptions,
  DiscountTag,
  WeekdaysContainer,
  WeekdayButton,
  ErrorMessage,
  IconButton,
} from './styles';
import { Plan } from './types';

import LoadingMessage from '../../../components/common/LoadingMessage';
import AnimationLoading from '../../../components/common/AnimationLoading';
import SubscribeBottom from '../../../components/customer/Subscribe/Bottom';
import ProgressSteps from '../../../components/customer/Subscribe/ProgressSteps';
import ButtonCard from '../../../components/customer/Subscribe/ButtonCard';
import DatePicker from '../../../components/customer/Subscribe/DatePicker';
import SectionTitle from '../../../components/customer/Subscribe/SectionTitle';
import Modal from '../../../components/common/Modal'; //通用Modal
import QRCodeInfo from '../../../components/customer/Subscribe/QRCodeInfo';

import { getPlans } from '../../../apis/customer/getPlan'; //api 取得方案
import { getTomorrowDate } from '../../../utils/getDate';
import { SubscribeSteps } from '../../../components/customer/Subscribe/SubscribeSteps';
import { formatWeekdaysToNumbers } from '../../../utils/formatDate';

// 週期天數選項
const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

//組件本體
const Subscribe = () => {
  const navigate = useNavigate(); // 獲取導航功能
  const location = useLocation(); // 獲取當前位置對象
  const { planName } = location.state || {}; // 只獲取從Plan頁面傳遞的planName

  //// 狀態管理
  const [isLoading, setIsLoading] = useState(true); // 是否正在加載

  const [dropdownOpen, setDropdownOpen] = useState(false); // 是否開啟下拉選單
  const [plan, setPlan] = useState<Plan | null>(null); // 選擇的方案
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]); // 所有可用方案

  const [selectedFrequency, setSelectedFrequency] = useState<number>(1); // 預定預定期程:選擇的頻率
  const [selectedDays, setSelectedDays] = useState<string[]>([]); // 預定收集日:選擇的收集日
  const [hasSelectedDays, setHasSelectedDays] = useState(false); // 預定收集日:是否已選擇收集日
  const [showDaysError, setShowDaysError] = useState(false); // 預定收集日:是否顯示收集日錯誤提示

  const [qrCodeMethod, setQrCodeMethod] = useState<'print' | 'ship'>('print'); // QR code 取得方式
  const [selectedDate, setSelectedDate] = useState<Date>(getTomorrowDate());

  const [originalPrice, setOriginalPrice] = useState(0); // 折扣前總價格
  const [discount, setDiscount] = useState(0); // 折扣金額
  const [totalPrice, setTotalPrice] = useState(0); // 折扣後總價格

  const [isQRInfoModalOpen, setIsQRInfoModalOpen] = useState(false); // QR code 資訊 Modal

  // 獲取所有可用方案
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);

        // 使用API取得所有方案
        const apiPlans = await getPlans();
        console.log('api 所有方案', apiPlans);

        // 設置所有可用方案列表
        setAvailablePlans(apiPlans);

        // 如果從Plan頁面傳入了方案名稱，則找到對應的方案
        if (planName) {
          const selectedPlan = apiPlans.find(
            (plan) => plan.PlanName === planName,
          );
          if (selectedPlan) {
            setPlan(selectedPlan);
          } else if (apiPlans.length > 0) {
            // 如果找不到對應方案，默認選中第一個方案
            setPlan(apiPlans[0]);
          }
        } else if (apiPlans.length > 0) {
          // 否則默認選中第一個方案
          setPlan(apiPlans[0]);
        }
      } catch (error) {
        console.error('獲取方案詳情失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [planName]);

  // 監聽 QR code 取得方式的變化
  useEffect(() => {
    const tomorrow = getTomorrowDate();
    if (qrCodeMethod === 'ship') {
      // 如果是郵寄貼紙，設置為三天後的日期
      const threeDaysLater = new Date(tomorrow);
      threeDaysLater.setDate(tomorrow.getDate() + 3);
      setSelectedDate(threeDaysLater);
    } else {
      // 如果是自行列印，設置為今天日期
      setSelectedDate(tomorrow);
    }
  }, [qrCodeMethod]);

  // 總價格計算函式 只重新計算有改變的參數
  const updateTotalPrice = useCallback(
    (price: number, frequency: string) => {
      const freq = parseInt(frequency); //後段設定1:原價 2:95折 3:85折
      const daysPerWeek = selectedDays.length;
      const rawPrice = price * freq * daysPerWeek;
      let discountRate = 1; //折扣率(無)
      let discountAmount = 0; //折扣價差(無)

      // 套用折扣：3個月95折，5個月9折
      if (freq === 2) {
        discountRate = 0.9;
      } else if (freq === 3) {
        discountRate = 0.85;
      }

      // 計算折扣後價格
      const discountedPrice = Math.round(rawPrice * discountRate);
      // 計算折扣價差
      discountAmount = rawPrice - discountedPrice;

      setOriginalPrice(rawPrice);
      setTotalPrice(discountedPrice);
      setDiscount(discountAmount);
    },
    [selectedDays],
  );

  // 處理價格計算 只要方案、收日頻率、收運日改變，就重新計算總價格
  useEffect(() => {
    if (plan) {
      updateTotalPrice(plan.Price, selectedFrequency.toString());
    }
  }, [plan, selectedFrequency, updateTotalPrice]);

  // 載入中
  if (isLoading) {
    return <AnimationLoading size="normal" animationType="bounce" />;
  }

  // 處理方案切換
  const handlePlanChange = (selectedPlan: Plan) => {
    setPlan(selectedPlan);
    setDropdownOpen(false);
  };

  // 切換下拉選單
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 處理週期選擇
  const handleFrequencyChange = (frequency: string) => {
    setSelectedFrequency(parseInt(frequency));
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

    // 將選擇的日期轉換為數字格式（1-7）
    const formattedDays = formatWeekdaysToNumbers(selectedDays);

    //將qrcode取得方式轉換成數字格式
    const formattedQrCodeMethod = qrCodeMethod === 'print' ? 1 : 2;

    // 準備要儲存的資料
    const subscriptionData = {
      planId: plan?.PlanID,
      planName: plan?.PlanName,
      liter: plan?.Liter,
      kg: plan?.PlanKG,
      price: plan?.Price,
      planPeople: plan?.PlanPeople,
      planDescription: plan?.PlanDescription,
      frequency: selectedFrequency.toString(),
      days: formattedDays,
      qrCodeMethod: formattedQrCodeMethod,
      startDate: selectedDate.toISOString().split('T')[0],
      totalPrice,
    };

    console.log('準備儲存的資料:', subscriptionData);

    // 儲存到 Session Storage
    sessionStorage.setItem(
      'subscriptionData',
      JSON.stringify(subscriptionData),
    );

    // 檢查是否成功儲存
    const storedData = sessionStorage.getItem('subscriptionData');
    console.log(
      '已儲存的資料:',
      storedData ? JSON.parse(storedData) : '無資料',
    );

    // 導航到下一頁
    navigate('/customer/subscribe-data');
  };

  // 處理 QR code 取得方式選擇
  const handleQrCodeMethodChange = (method: 'print' | 'ship') => {
    setQrCodeMethod(method);
  };

  // 處理開始日期選擇
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageWrapper>
      <ProgressSteps steps={SubscribeSteps} currentStep={1} />

      <ScrollableContent>
        {/* 已選方案 */}
        <SectionTitle mainTitle="已選方案" subTitle="請選擇您要訂閱的方案" />

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
                    <PlanOptionMainTitle>
                      {availablePlan.PlanName} ({availablePlan.PlanPeople})
                    </PlanOptionMainTitle>
                    <PlanOptionSubtitle>
                      {availablePlan.Liter}L / {availablePlan.PlanKG}kg
                    </PlanOptionSubtitle>
                  </PlanOptionTitle>
                </PlanOption>
              ))}
            </PlanDropdown>
          )}
        </PlanSelector>

        {/* 取貨頻率 */}
        <SectionTitle mainTitle="預定期程" subTitle="週期越長越優惠" />

        <ButtonCardOptions>
          <ButtonCard
            title="1 個月"
            subtitle="(共收運4週)"
            $active={selectedFrequency === 1}
            onClick={() => handleFrequencyChange('1')}
          />

          <ButtonCard
            title="3 個月"
            subtitle="(共收運12週)"
            $active={selectedFrequency === 2}
            onClick={() => handleFrequencyChange('2')}
          >
            <DiscountTag>9 折優惠</DiscountTag>
          </ButtonCard>

          <ButtonCard
            title="6 個月"
            subtitle="(共收運24週)"
            $active={selectedFrequency === 3}
            onClick={() => handleFrequencyChange('3')}
          >
            <DiscountTag>85 折優惠</DiscountTag>
          </ButtonCard>
        </ButtonCardOptions>

        {/* 每周收運日 */}
        <SectionTitle
          mainTitle="每周收運日"
          subTitle="請點選每週固定收運時間"
          id="weekdays-section"
        />

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

        {/* QR code 取得方式 */}
        <SectionTitle
          mainTitle="QR Code 貼紙取得方式"
          subTitle="請選擇您希望QR Code 專屬貼紙取得的方式"
        >
          <IconButton onClick={() => setIsQRInfoModalOpen(true)}>
            <MdInfoOutline />
          </IconButton>
        </SectionTitle>

        <ButtonCardOptions>
          <ButtonCard
            title="自行列印"
            subtitle="(下單 24 小時後可用）"
            $active={qrCodeMethod === 'print'}
            onClick={() => handleQrCodeMethodChange('print')}
          />

          <ButtonCard
            title="郵寄"
            subtitle="(3 天後可用）"
            $active={qrCodeMethod === 'ship'}
            onClick={() => handleQrCodeMethodChange('ship')}
          />
        </ButtonCardOptions>

        {/* 開始日期 */}
        <SectionTitle mainTitle="開始日期" subTitle="請選擇開始收運的日期" />

        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          qrCodeMethod={qrCodeMethod}
        />
      </ScrollableContent>

      <SubscribeBottom
        totalPrice={totalPrice}
        originalPrice={originalPrice}
        discount={discount}
        isActive={hasSelectedDays}
        onNext={handleNext}
      />

      {/* QR code 資訊 Modal */}
      <Modal
        isOpen={isQRInfoModalOpen}
        onClose={() => setIsQRInfoModalOpen(false)}
      >
        <QRCodeInfo />
      </Modal>
    </PageWrapper>
  );
};

export default Subscribe;
