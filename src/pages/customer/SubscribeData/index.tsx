import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PageWrapper,
  ScrollableContent,
  FormSection,
  FormGroup,
  InputLabel,
  StyledInput,
  StyledTextarea,
  ErrorMessage,
  DeliveryOptions,
  DeliveryOption,
  RadioButton,
  DeliveryOptionContent,
  DeliveryOptionText,
  DeliveryOptionTitle,
  DeliveryOptionDescription,
} from './styles';
import { SubscriptionData, FixedPointImage } from './types';

import LoadingMessage from '../../../components/common/LoadingMessage';
import ProgressSteps from '../../../components/customer/Subscribe/ProgressSteps';
import AddressAutocomplete from './AddressAutocomplete';
import SubscribeBottom from '../../../components/customer/Subscribe/Bottom';
import SectionTitle from '../../../components/customer/Subscribe/SectionTitle';
import ImageUpload from '../../../components/customer/Subscribe/ImageUpload';
import { SubscribeSteps } from '../../../components/customer/Subscribe/SubscribeSteps';

// 組件本體
const SubscribeData = () => {
  // 參考元素用於滾動
  // const nameRef = useRef<HTMLDivElement>(null);
  // const phoneRef = useRef<HTMLDivElement>(null);
  // const addressRef = useRef<HTMLDivElement>(null);
  // const notesRef = useRef<HTMLDivElement>(null);

  // 啟用路由方法
  const navigate = useNavigate();

  // 狀態管理
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [notesError, setNotesError] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState('fixedpoint');
  const [fixedPointImages, setFixedPointImages] = useState<FixedPointImage[]>(
    [],
  );
  const [photoError, setPhotoError] = useState<string | null>(null);

  // 檢查 API 金鑰是否設置
  useEffect(() => {
    if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API 金鑰未設置！請檢查 .env 檔案。');
    }
  }, []);

  // 從 Session Storage 讀取資料
  useEffect(() => {
    const storedData = sessionStorage.getItem('subscriptionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSubscriptionData(parsedData);
    }
    setIsLoading(false);
  }, []);

  // 如果沒有資料，顯示載入中
  if (isLoading) {
    return <LoadingMessage size="normal" animationType="bounce" />;
  }

  // 如果沒有訂閱資料，返回上一頁
  if (!subscriptionData) {
    navigate('/customer/subscribe');
    return null;
  }

  // 解構訂閱資料
  const {
    planId,
    planName,
    liter,
    price,
    planKg,
    planPeople,
    planDescription,
    frequency,
    days,
    startDate,
    totalPrice,
    qrCodeMethod,
  } = subscriptionData;

  // 處理地址選擇
  const handleLocationSelect = () => {
    validateAddress(address);
  };

  // 驗證函數
  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError('*請輸入聯絡人姓名');
      return false;
    }
    setNameError(null);
    return true;
  };

  const validatePhone = (phoneNumber: string): boolean => {
    const mobilePattern = /^09\d{8}$/;
    const telPattern = /^0\d{1,2}[-\s]?\d{6,8}$/;

    if (!phoneNumber.trim()) {
      setPhoneError('*請輸入聯絡電話');
      return false;
    } else if (
      mobilePattern.test(phoneNumber) ||
      telPattern.test(phoneNumber)
    ) {
      setPhoneError(null);
      return true;
    } else {
      setPhoneError('*請輸入有效的台灣手機或市話號碼');
      return false;
    }
  };

  const validateAddress = (address: string): boolean => {
    if (!address.trim()) {
      setAddressError('*請輸入收運地址');
      return false;
    }
    setAddressError(null);
    return true;
  };

  const validateNotes = (notes: string): boolean => {
    if (!notes.trim()) {
      setNotesError('*請填寫地點備註');
      return false;
    }
    setNotesError(null);
    return true;
  };

  // 檢查表單是否有效
  const isFormValid = () => {
    return (
      !!name.trim() &&
      !!address.trim() &&
      !!phone.trim() &&
      !!notes.trim() &&
      phoneError === null &&
      (deliveryMethod !== 'fixedpoint' || fixedPointImages.length === 2)
    );
  };

  // 處理下一步按鈕
  const handleNext = () => {
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isAddressValid = validateAddress(address);
    const isNotesValid = validateNotes(notes);

    if (!isNameValid) {
      return;
    }
    if (!isPhoneValid) {
      return;
    }
    if (!isAddressValid) {
      return;
    }
    if (!isNotesValid) {
      return;
    }

    if (deliveryMethod === 'fixedpoint' && fixedPointImages.length < 2) {
      setPhotoError('*請上傳兩張固定點照片');
      return;
    }

    const subscriptionData = {
      planId,
      planName,
      liter,
      price,
      planKg,
      planPeople,
      planDescription,
      frequency,
      days,
      startDate,
      totalPrice,
      qrCodeMethod,
      name,
      phone,
      address,
      notes,
      deliveryMethod,
      paymentMethod: 'linePay',
      fixedPointImages: fixedPointImages.map((img) => ({
        id: img.id,
        url: img.url,
        file: img.file,
      })),
    };

    // 將資料儲存在 session storage 中
    sessionStorage.setItem(
      'subscriptionData',
      JSON.stringify(subscriptionData),
    );

    navigate('/customer/subscribe-checkout');
  };

  return (
    <PageWrapper>
      <ProgressSteps steps={SubscribeSteps} currentStep={2} />
      <ScrollableContent>
        <SectionTitle mainTitle="收運資料" subTitle="請填寫基本收運資料" />
        <FormSection>
          <FormGroup>
            <InputLabel>聯絡人姓名</InputLabel>
            <StyledInput
              type="text"
              placeholder="請輸入您的真實姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateName(name)}
              $error={nameError !== null}
            />
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <InputLabel>聯絡電話</InputLabel>
            <StyledInput
              type="tel"
              placeholder="請輸入手機或市話號碼"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => validatePhone(phone)}
              $error={phoneError !== null}
            />
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <InputLabel>收運地址</InputLabel>
            <AddressAutocomplete
              value={address}
              onChange={(value) => {
                setAddress(value);
                if (value.trim()) validateAddress(value);
              }}
              onLocationSelect={handleLocationSelect}
              error={addressError !== null}
            />
            {addressError && <ErrorMessage>{addressError}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        <SectionTitle mainTitle="收運方式" subTitle="請選擇收運方式" />
        <FormSection>
          <DeliveryOptions>
            <DeliveryOption
              $active={deliveryMethod === 'fixedpoint'}
              onClick={() => setDeliveryMethod('fixedpoint')}
            >
              <RadioButton $active={deliveryMethod === 'fixedpoint'} />
              <DeliveryOptionContent>
                <DeliveryOptionText>
                  <DeliveryOptionTitle>放置固定點</DeliveryOptionTitle>
                  <DeliveryOptionDescription>
                    請用戶上傳垃圾放置固定點的照片。
                    建議放置易辨識位置，例如：門口、鞋櫃、花盆旁等，未來專員會依據照片位置進行收運。
                  </DeliveryOptionDescription>
                </DeliveryOptionText>

                {deliveryMethod === 'fixedpoint' && (
                  <ImageUpload
                    fixedPointImages={fixedPointImages}
                    setFixedPointImages={setFixedPointImages}
                    photoError={photoError}
                    setPhotoError={setPhotoError}
                  />
                )}
              </DeliveryOptionContent>
            </DeliveryOption>

            <DeliveryOption
              $active={deliveryMethod === 'receipt'}
              onClick={() => setDeliveryMethod('receipt')}
            >
              <RadioButton $active={deliveryMethod === 'receipt'} />
              <DeliveryOptionText>
                <DeliveryOptionTitle>面交收運</DeliveryOptionTitle>
                <DeliveryOptionDescription>
                  用戶選擇面交請於備注欄位填寫面交詳細位置，此服務需在預約時段內於指定地點與代收員見面，需配合本公司安排服務時間。
                </DeliveryOptionDescription>
              </DeliveryOptionText>
            </DeliveryOption>

            <FormGroup>
              <InputLabel>地點備註</InputLabel>
              <StyledTextarea
                placeholder="請備註放置固定點或面交收運的詳細位置"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => validateNotes(notes)}
                $error={notesError !== null}
              />
              {notesError && <ErrorMessage>{notesError}</ErrorMessage>}
            </FormGroup>
          </DeliveryOptions>
        </FormSection>
      </ScrollableContent>

      <SubscribeBottom
        totalPrice={totalPrice}
        isActive={isFormValid()}
        onNext={handleNext}
      />
    </PageWrapper>
  );
};

export default SubscribeData;
