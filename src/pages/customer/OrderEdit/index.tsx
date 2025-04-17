import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiExclamationCircle, HiPencil, HiMiniQrCode } from 'react-icons/hi2';
import { IoAdd, IoClose } from 'react-icons/io5';
import {
  ErrorMessage,
  OrderEditContainer,
  ContentArea,
  OrderCard,
  CardHeader,
  OrderTitle,
  CardHeaderEditButtons,
  EditButton,
  OrderPhotoArea,
  PhotoContainer,
  SinglePhotoContainer,
  Photo,
  NoPhotoPlaceholder,
  DetailList,
  DetailItem,
  DetailLabel,
  DetailValue,
  OrderListSection,
  OrderListContainer,
  FormSection,
  FormGroup,
  InputLabel,
  StyledInput,
  StyledTextarea,
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
} from './styled';
import OrderNavHeader from '../../../components/customer/OrderNavHeader';
import AddressAutocomplete from '../SubscribeData/AddressAutocomplete';

// 虛擬機URL
const BASE_URL = 'http://lebuleduo.rocket-coding.com';

// 圖片類型
interface FixedPointImage {
  id: string;
  url: string;
  file: File;
}

interface OrderData {
  OrdersID: number;
  OrderNumber: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  Months: number;
  WeekDay: string;
  RemainingCount: number;
  StartDate: string;
  EndDate: string;
  OrderName: string;
  OrderPhone: string;
  Addresses: string;
  OrderImageUrl: string[];
  Notes: string;
}

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 參考元素用於滾動
  const nameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 取得訂單資料
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`api/GET/user/RevisedMemInfo/${orderId}`);
        const data = await response.json();

        if (data.status) {
          setOrderData(data.result[0]);
        } else {
          console.error('Failed to fetch order data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  // 狀態管理
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

  // 當 orderData 更新時，更新表單狀態
  useEffect(() => {
    if (orderData) {
      setName(orderData.OrderName);
      setPhone(orderData.OrderPhone);
      setAddress(orderData.Addresses);
      setNotes(orderData.Notes);
    }
  }, [orderData]);

  if (isLoading) {
    return <ErrorMessage>載入中...</ErrorMessage>;
  }

  if (!orderData) {
    return <ErrorMessage>無法載入訂單資料</ErrorMessage>;
  }

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

  // 處理儲存按鈕
  const handleSave = () => {
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

    // TODO: 處理儲存邏輯
    console.log('儲存修改的資料:', {
      name,
      phone,
      address,
      notes,
      deliveryMethod,
      fixedPointImages,
    });
  };

  return (
    <OrderEditContainer>
      {/* navbar */}
      <OrderNavHeader
        title="修改收運方式"
        orderNumber={orderData.OrderNumber}
      />

      <ContentArea>
        {/* 方案卡片 */}
        <OrderCard>
          <CardHeader>
            <OrderTitle>
              {orderData.PlanName} {orderData.Liter}L/{orderData.PlanKG}kg
            </OrderTitle>
            <CardHeaderEditButtons>
              <EditButton>
                <HiMiniQrCode />
              </EditButton>
              <EditButton
                onClick={() =>
                  navigate(`/customer/order/${orderId}/edit`, {
                    state: {
                      orderData,
                    },
                  })
                }
              >
                <HiPencil />
              </EditButton>
            </CardHeaderEditButtons>
          </CardHeader>

          <OrderPhotoArea>
            <PhotoContainer>
              {orderData.OrderImageUrl?.map((photo, index) => {
                return (
                  <SinglePhotoContainer key={index}>
                    {photo ? (
                      <Photo
                        src={`${BASE_URL}${photo}`}
                        alt={`收運定點照片 ${index + 1}`}
                      />
                    ) : (
                      <NoPhotoPlaceholder>
                        <HiExclamationCircle size={24} />
                      </NoPhotoPlaceholder>
                    )}
                  </SinglePhotoContainer>
                );
              })}
            </PhotoContainer>
          </OrderPhotoArea>

          <DetailList>
            <DetailItem>
              <DetailLabel>方案期間</DetailLabel>
              <DetailValue>
                {orderData.StartDate} - {orderData.EndDate}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>每周收運日</DetailLabel>
              <DetailValue>{orderData.WeekDay}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>收運地址</DetailLabel>
              <DetailValue>{orderData.Addresses}</DetailValue>
            </DetailItem>
          </DetailList>
        </OrderCard>

        {/* 收運任務 */}
        <OrderListSection>
          <OrderListContainer>
            <FormSection>
              <FormGroup ref={nameRef}>
                <InputLabel>聯絡人姓名</InputLabel>
                <StyledInput
                  type="text"
                  placeholder={orderData?.OrderName || '請輸入您的真實姓名'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => validateName(name)}
                  $error={!!nameError}
                />
                {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
              </FormGroup>

              <FormGroup ref={phoneRef}>
                <InputLabel>聯絡電話</InputLabel>
                <StyledInput
                  type="tel"
                  placeholder={orderData?.OrderPhone || '請輸入手機或市話號碼'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => validatePhone(phone)}
                  $error={!!phoneError}
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
                  error={!!addressError}
                />
                {addressError && <ErrorMessage>{addressError}</ErrorMessage>}
              </FormGroup>
            </FormSection>

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

                        {photoError && (
                          <ErrorMessage>{photoError}</ErrorMessage>
                        )}

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
                  <DeliveryOptionContent>
                    <DeliveryOptionTitle>面交收運</DeliveryOptionTitle>
                    <DeliveryOptionDescription>
                      用戶選擇面交請於備注欄位填寫面交詳細位置，此服務需在預約時段內於指定地點與代收員見面，需配合本公司安排服務時間。
                    </DeliveryOptionDescription>
                  </DeliveryOptionContent>
                </DeliveryOption>
              </DeliveryOptions>

              <FormGroup ref={notesRef}>
                <InputLabel>地點備註</InputLabel>
                <StyledTextarea
                  placeholder={
                    orderData?.Notes || '請備註放置固定點或面交收運的詳細位置'
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => validateNotes(notes)}
                  $error={!!notesError}
                />
                {notesError && <ErrorMessage>{notesError}</ErrorMessage>}
              </FormGroup>
            </FormSection>

            <FormGroup>
              <StyledInput
                type="button"
                value="儲存修改"
                onClick={handleSave}
                disabled={!isFormValid()}
                style={{
                  backgroundColor: isFormValid() ? '#1890ff' : '#d9d9d9',
                  color: 'white',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                }}
              />
            </FormGroup>
          </OrderListContainer>
        </OrderListSection>
      </ContentArea>
    </OrderEditContainer>
  );
}

export default OrderDetail;
