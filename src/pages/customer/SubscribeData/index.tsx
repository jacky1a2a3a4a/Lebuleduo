import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressAutocomplete from './AddressAutocomplete'; // 引入地址自動完成組件
import { IoAdd, IoClose } from 'react-icons/io5'; // 導入圖標

// 為styled-components定義類型
interface StyledProps {
  $active?: boolean; // 定義元件是否處於活動狀態
  $light?: boolean; // 定義元件是否使用淺色樣式
  $open?: boolean; // 定義元件（如下拉選單）是否展開
  $error?: boolean; // 定義元件是否處於錯誤狀態
}

// 圖片類型
interface FixedPointImage {
  id: string;
  url: string;
  file: File;
}

//組件本體
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

  //// 狀態管理
  // 載入狀態，暫未使用但可能在未來用於API整合
  const [isLoading] = useState(false);

  ////收運資料
  const [name, setName] = useState(''); // 聯絡人姓名
  const [nameError, setNameError] = useState<string | null>(null); // 姓名錯誤提示
  const [phone, setPhone] = useState(''); // 聯絡電話
  const [phoneError, setPhoneError] = useState<string | null>(null); // 電話格式錯誤提示
  const [address, setAddress] = useState(''); // 收運地址
  const [addressError, setAddressError] = useState<string | null>(null); // 地址錯誤提示
  const [notes, setNotes] = useState(''); // 附加備註
  const [notesError, setNotesError] = useState<string | null>(null); // 備註錯誤提示

  //// 處理Google Map位置資料
  const [, setMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // google map位置

  // 處理地址選擇
  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setMapLocation(location);
    validateAddress(address); // 當地址有變更時驗證
  };

  ////收運方式 + 照片上傳
  const [deliveryMethod, setDeliveryMethod] = useState('fixedpoint'); // 如果選擇放置固定點收運方式 則會顯示照片上傳區域
  // 陣列儲存已上傳照片
  const [fixedPointImages, setFixedPointImages] = useState<FixedPointImage[]>(
    [],
  );

  // 處理照片上傳
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // 驗證文件類型
      if (!file.type.startsWith('image/')) {
        setPhotoError('*請上傳圖片格式的檔案');
        return;
      }

      // 驗證文件大小 (限制為5MB)
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('*圖片大小不得超過5MB');
        return;
      }

      // 檢查是否已經上傳了兩張照片
      if (fixedPointImages.length >= 2) {
        setPhotoError('*最多只能上傳兩張照片');
        return;
      }

      // 創建臨時URL以預覽圖片
      const imageUrl = URL.createObjectURL(file);
      const imageId = Date.now().toString();

      // 添加到圖片列表
      setFixedPointImages([
        ...fixedPointImages,
        {
          id: imageId,
          url: imageUrl,
          file,
        },
      ]);

      // 清除錯誤訊息
      setPhotoError(null);

      // 清除文件選擇器的值，以便可以再次選擇相同的文件
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

  // 照片錯誤提示
  const [photoError, setPhotoError] = useState<string | null>(null);

  ////資料驗證
  // 檢查 API 金鑰是否設置
  useEffect(() => {
    if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      console.error('Google Maps API 金鑰未設置！請檢查 .env 檔案。');
    }
  }, []);

  // 姓名驗證函數
  const validateName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError('*請輸入聯絡人姓名');
      return false;
    }
    setNameError(null);
    return true;
  };

  // 電話格式驗證函數
  const validatePhone = (phoneNumber: string): boolean => {
    // 台灣手機號碼格式 (09開頭的10位數字)
    const mobilePattern = /^09\d{8}$/;
    // 台灣市話格式 (區號+號碼，例如 02-12345678 或 02-1234-5678)
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

  // 地址驗證函數
  const validateAddress = (address: string): boolean => {
    if (!address.trim()) {
      setAddressError('*請輸入收運地址');
      return false;
    }
    setAddressError(null);
    return true;
  };

  // 備註驗證函數
  const validateNotes = (notes: string): boolean => {
    if (!notes.trim()) {
      setNotesError('*請填寫地點備註');
      return false;
    }
    setNotesError(null);
    return true;
  };

  // 檢查所有欄位是否填寫完整，才能進行下一步
  const isFormValid = () => {
    return (
      !!name.trim() &&
      !!address.trim() &&
      !!phone.trim() &&
      !!notes.trim() &&
      phoneError === null &&
      // 如果選擇了固定點收運，則需要有兩張照片
      (deliveryMethod !== 'fixedpoint' || fixedPointImages.length === 2)
    );
  };

  // 處理下一步按鈕
  //將狀態傳遞到結帳頁面
  const handleNext = () => {
    // 驗證所有欄位
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);
    const isAddressValid = validateAddress(address);
    const isNotesValid = validateNotes(notes);

    // 如果某欄位無效，滾動到該欄位
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
      // 備註區域滾動
      notesRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 如果選擇了固定點收運方式，檢查是否上傳了兩張照片
    if (deliveryMethod === 'fixedpoint') {
      if (fixedPointImages.length < 2) {
        setPhotoError('*請上傳兩張固定點照片');
        return;
      }
    }

    // 將選擇的數據傳遞到下一個頁面
    navigate('/customer/Subscribe-checkout', {
      state: {
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
        })),
      },
    });
  };

  // 載入中
  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

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
            <StepLine $active={isFormValid()} />
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
            {/* 使用自動完成地址組件 */}
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

        {/* 收運方式 */}
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

                {/* 固定點照片上傳區域 */}
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

                      {/* 隱藏的文件輸入 */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handlePhotoUpload}
                      />

                      {/* 添加照片按鈕 - 只在照片少於2張時顯示 */}
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

                    {/* 照片錯誤提示 */}
                    {photoError && <ErrorMessage>{photoError}</ErrorMessage>}

                    {/* 照片上傳說明 - 更新為必須上傳兩張 */}
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

        {/* 總計金額與下一步 */}
        <TotalPrice>
          <TotalPriceText>總金額</TotalPriceText>
          <TotalPriceTCount>NT${totalPrice || 580}</TotalPriceTCount>
        </TotalPrice>
        <NextButton
          onClick={handleNext}
          $active={isFormValid()} //根據表單有效性設置樣式
        >
          下一步
        </NextButton>
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

// 錯誤訊息
const ErrorMessage = styled.div`
  color: var(--color-red-500);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-sm);
`;

// 區段標題 模板
const SectionTitle = styled.div`
  margin-bottom: var(--spacing-sm);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 區段主標題 模板
const SectionMainTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-xs);
`;

// 區段副標題 模板
const SectionSubtitle = styled.p`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-400);
`;

// 表單區段
const FormSection = styled.div`
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);

  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// 表單組
const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 輸入標籤
const InputLabel = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--color-gray-600);
`;

// 樣式化輸入框
const StyledInput = styled.input<StyledProps>`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
  }

  // 注目框
  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$error ? 'var(--color-red-500)' : 'var(--color-gray-400)'};
    outline-offset: 0px;
  }
`;

// 樣式化文本區域
const StyledTextarea = styled.textarea<StyledProps>`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  min-height: 100px;
  resize: none;

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
  }

  // 注目框
  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$error ? 'var(--color-red-500)' : 'var(--color-gray-400)'};
    outline-offset: 0px;
  }
`;

//// 收貨方式 最外層大容器
const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
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

// 選項內容容器 文字+照片
const DeliveryOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: var(--spacing-md);
`;

// 收貨方式文本容器
const DeliveryOptionText = styled.div`
  margin-bottom: var(--spacing-sm);
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

// 收貨方式圖片容器
const DeliveryOptionImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 收貨方式圖片區
const DeliveryOptionImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

// 照片項目容器 - 修改高度從100px到125px以實現4:5比例
const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100px;
  height: 125px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

// 照片顯示 - 確保圖片完整顯示
const DeliveryOptionImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// 刪除照片按鈕
const DeleteImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

// 上傳照片按鈕 - 同樣修改為4:5比例
const DeliveryOptionImageUpload = styled.div`
  width: 100px;
  height: 125px;
  background-color: var(--color-gray-200);
  border: 2px dashed var(--color-gray-400);
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

// 照片上傳說明
const PhotoInstructions = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  margin-top: var(--spacing-sm);
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
const NextButton = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);

  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);
  transition: background-color 0.2s;
  cursor: ${(props) => (props.$active ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-gray-700)' : 'var(--color-gray-400)'};
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;

export default SubscribeData;
