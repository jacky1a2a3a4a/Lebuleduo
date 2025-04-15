import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoAdd, IoClose } from 'react-icons/io5';
import SubscribeProgressSteps from '../../../components/customer/SubscribeProgressSteps';
import AddressAutocomplete from './AddressAutocomplete';
import {
  PageWrapper,
  ScrollableContent,
  SectionTitle,
  SectionMainTitle,
  SectionSubtitle,
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
  DeliveryOptionImageContainer,
  DeliveryOptionImages,
  DeliveryOptionImage,
  DeliveryOptionImagePhoto,
  DeleteImageButton,
  DeliveryOptionImageUpload,
  PhotoInstructions,
  LoadingMessage,
} from './styled';
import SubscribeBottom from '../../../components/customer/SubscribeBottom';

// 圖片類型
interface FixedPointImage {
  id: string;
  url: string;
  file: File;
}

// 組件本體
const SubscribeData = () => {
  // 參考元素用於滾動
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 啟用路由方法
  const location = useLocation();
  const navigate = useNavigate();

  // 從上一頁獲取方案數據
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
  } = location.state || {};

  // 添加日誌檢查上一頁接收到的數據
  useEffect(() => {
    console.log('SubscribeData - 接收到的數據:', {
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
    });
  }, [
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
  ]);

  // 狀態管理
  const [isLoading] = useState(false);
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

  // 處理地址選擇
  const handleLocationSelect = () => {
    validateAddress(address);
  };

  // 處理照片上傳
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith('image/')) {
        setPhotoError('*請上傳圖片格式的檔案');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('*圖片大小不得超過5MB');
        return;
      }

      if (fixedPointImages.length >= 2) {
        setPhotoError('*最多只能上傳兩張照片');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      const imageId = Date.now().toString();

      setFixedPointImages([
        ...fixedPointImages,
        {
          id: imageId,
          url: imageUrl,
          file,
        },
      ]);

      setPhotoError(null);
      e.target.value = '';
    }
  };

  // 開啟文件選擇器
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  // 處理照片刪除
  const handleDeletePhoto = (id: string) => {
    const newImages = fixedPointImages.filter((image) => image.id !== id);
    setFixedPointImages(newImages);
  };

  // 檢查 API 金鑰是否設置
  useEffect(() => {
    if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API 金鑰未設置！請檢查 .env 檔案。');
    }
  }, []);

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
      nameRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isPhoneValid) {
      phoneRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isAddressValid) {
      addressRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!isNotesValid) {
      notesRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      name,
      phone,
      address,
      notes,
      deliveryMethod,
      fixedPointImages: fixedPointImages.map((img) => ({
        id: img.id,
        url: img.url,
        file: img.file, // 保留檔案物件，以便在結帳頁面使用
      })),
    };

    navigate('/customer/subscribe-checkout', {
      state: { subscriptionData },
    });
  };

  const steps = [
    { number: 1, text: '選擇方案' },
    { number: 2, text: '填選收運資料' },
    { number: 3, text: '結帳' },
  ];

  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

  return (
    <PageWrapper>
      <SubscribeProgressSteps currentStep={2} steps={steps} />
      <ScrollableContent>
        <SectionTitle>
          <SectionMainTitle>收運資料</SectionMainTitle>
          <SectionSubtitle>請填寫基本收運資料</SectionSubtitle>
        </SectionTitle>
        <FormSection>
          <FormGroup ref={nameRef}>
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

          <FormGroup ref={phoneRef}>
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

          <FormGroup ref={addressRef}>
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

        <SectionTitle>
          <SectionMainTitle>收運方式</SectionMainTitle>
          <SectionSubtitle>請選擇收運方式</SectionSubtitle>
        </SectionTitle>
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
                  <DeliveryOptionImageContainer>
                    <DeliveryOptionImages>
                      {fixedPointImages.map((image) => (
                        <DeliveryOptionImage key={image.id}>
                          <DeliveryOptionImagePhoto
                            style={{ backgroundImage: `url(${image.url})` }}
                          />
                          <DeleteImageButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePhoto(image.id);
                            }}
                          >
                            <IoClose />
                          </DeleteImageButton>
                        </DeliveryOptionImage>
                      ))}

                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handlePhotoUpload}
                      />

                      {fixedPointImages.length < 2 && (
                        <DeliveryOptionImageUpload
                          onClick={(e) => {
                            e.stopPropagation();
                            openFileSelector();
                          }}
                        >
                          <IoAdd size={24} />
                        </DeliveryOptionImageUpload>
                      )}
                    </DeliveryOptionImages>

                    {photoError && <ErrorMessage>{photoError}</ErrorMessage>}

                    <PhotoInstructions>
                      *請務必上傳兩張固定點照片，每張不超過5MB
                    </PhotoInstructions>
                  </DeliveryOptionImageContainer>
                )}
              </DeliveryOptionContent>
            </DeliveryOption>

            <DeliveryOption
              $active={deliveryMethod === 'ereceipt'}
              onClick={() => setDeliveryMethod('ereceipt')}
            >
              <RadioButton $active={deliveryMethod === 'ereceipt'} />
              <DeliveryOptionText>
                <DeliveryOptionTitle>面交收運</DeliveryOptionTitle>
                <DeliveryOptionDescription>
                  用戶選擇面交請於備注欄位填寫面交詳細位置，此服務需在預約時段內於指定地點與代收員見面，需配合本公司安排服務時間。
                </DeliveryOptionDescription>
              </DeliveryOptionText>
            </DeliveryOption>

            <FormGroup ref={notesRef}>
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
