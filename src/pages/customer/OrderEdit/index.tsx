import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import {
  ErrorMessage,
  OrderEditContainer,
  ContentArea,
  OrderCard,
  CardHeader,
  OrderTitle,
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
  DeliverySelect,
  DeliveryOptionImageContainer,
  DeliveryOptionImages,
  DeliveryOptionImage,
  DeliveryOptionImagePhoto,
  DeleteImageButton,
  DeliveryOptionImageUpload,
  PhotoInstructions,
  SelectGroup,
  SelectIcon,
  SuccessMessage,
} from './styled';
import OrderNavHeader from '../../../components/customer/OrderNavHeader';
import AddressAutocomplete from '../SubscribeData/AddressAutocomplete';
import LoadingMessage from '../../../components/common/LoadingMessage';

// 虛擬機URL
const BASE_URL = 'https://lebuleduo.rocket-coding.com';

// 圖片類型
interface Image {
  id: string;
  url: string;
  file: File | null;
  isOriginal: boolean;
  originalPath?: string;
}

// 訂單資料類型
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

// ===組件本體===
function OrderEdit() {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedOriginalImages, setDeletedOriginalImages] = useState<string[]>(
    [],
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

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
        console.log(data);

        if (data.status) {
          setOrderData(data.result[0]);
          console.log(data.result[0]);
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
  const [images, setImages] = useState<Image[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // 當 orderData 更新時，更新表單狀態(用戶原來的資料)
  useEffect(() => {
    if (orderData) {
      setName(orderData.OrderName);
      setPhone(orderData.OrderPhone);
      setAddress(orderData.Addresses);
      setNotes(orderData.Notes);

      // 初始化圖片列表
      if (orderData.OrderImageUrl && orderData.OrderImageUrl.length > 0) {
        const initialImages = orderData.OrderImageUrl.map(
          (photoUrl, index) => ({
            id: `original-${index}`,
            url: `${BASE_URL}${photoUrl}`,
            file: null,
            isOriginal: true,
            originalPath: photoUrl,
          }),
        );
        setImages(initialImages);
      }
    }
  }, [orderData]);

  // 載入中
  if (isLoading) {
    return <LoadingMessage />;
  }

  // 無法載入訂單資料
  if (!orderData) {
    return <ErrorMessage>無法載入訂單資料</ErrorMessage>;
  }

  // 處理地址選擇
  const handleLocationSelect = () => {
    validateAddress(address);
  };

  // 處理照片上傳
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setPhotoError(null);

    // 驗證檔案
    if (!file.type.startsWith('image/')) {
      setPhotoError('*請上傳圖片格式的檔案');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('*圖片大小不得超過5MB');
      return;
    }

    // 計算當前照片總數
    const currentImageCount = images.length;
    if (currentImageCount >= 2) {
      setPhotoError('*最多只能上傳兩張照片');
      return;
    }

    // 創建新的圖片物件
    const newImage: Image = {
      id: `new-${Date.now()}`,
      url: URL.createObjectURL(file),
      file,
      isOriginal: false,
    };

    setImages((prev) => [...prev, newImage]);
    e.target.value = '';
  };

  // 處理照片刪除
  const handleDeletePhoto = (id: string) => {
    setImages((prev) => {
      const imageToDelete = prev.find((img) => img.id === id);
      if (!imageToDelete) return prev;

      // 如果是原始照片，添加到已刪除列表
      if (imageToDelete.isOriginal && imageToDelete.originalPath) {
        setDeletedOriginalImages((prev) => [
          ...prev,
          imageToDelete.originalPath!,
        ]);
      }

      return prev.filter((img) => img.id !== id);
    });
  };

  // 開啟文件選擇器
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  // 檢查照片是否有效
  const validatePhotos = (): boolean => {
    if (deliveryMethod !== 'fixedpoint') return true;

    if (images.length < 2) {
      setPhotoError('*請確保有兩張固定點照片');
      return false;
    }

    setPhotoError(null);
    return true;
  };

  // ===驗證填寫資料函數===
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
    // 計算總照片數量（原始照片 + 新上傳的照片）
    const totalImages = images.length;

    return (
      !!name.trim() &&
      !!address.trim() &&
      !!phone.trim() &&
      !!notes.trim() &&
      phoneError === null &&
      (deliveryMethod !== 'fixedpoint' || totalImages >= 2)
    );
  };

  // 處理儲存按鈕
  const handleSave = async () => {
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

    if (!validatePhotos()) return;

    try {
      // 準備表單資料
      const formData = new FormData();
      formData.append('OrdersID', orderId || '');
      formData.append('OrderName', name);
      formData.append('OrderPhone', phone);
      formData.append('Addresses', address);
      formData.append('Notes', notes);

      // 處理圖片上傳
      if (deliveryMethod === 'fixedpoint') {
        // 將所有圖片都當作新圖片上傳
        const allImages = images.filter((img) => img.file);
        console.log(
          '所有要上傳的照片:',
          allImages.map((img) => ({
            id: img.id,
            fileName: img.file?.name,
            size: img.file?.size,
            isOriginal: img.isOriginal,
          })),
        );

        allImages.forEach((image) => {
          if (image.file) {
            formData.append('OrderImageUrl', image.file);
          }
        });

        // 添加已刪除的圖片路徑
        console.log('已刪除的照片路徑:', deletedOriginalImages);
        deletedOriginalImages.forEach((path) => {
          formData.append('DeletedImageUrls', path);
        });

        // 顯示最終的 FormData 內容
        console.log('FormData 內容:');
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
      }

      // 發送 PUT 請求
      const response = await fetch(`api/Put/user/RevisedMemInfo/${orderId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        setShowSuccessMessage(true);
        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // 3秒後跳轉回前一頁
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      } else {
        console.error('修改失敗：', data.message);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <OrderEditContainer>
      {/* navbar */}
      <OrderNavHeader
        title="修改收運方式"
        orderNumber={orderData.OrderNumber}
      />

      <ContentArea>
        {showSuccessMessage && (
          <SuccessMessage>修改成功！將在3秒後返回上一頁...</SuccessMessage>
        )}

        {/* 方案卡片 */}
        <OrderCard>
          <CardHeader>
            <OrderTitle>
              {orderData.PlanName} {orderData.Liter}L/{orderData.PlanKG}kg
            </OrderTitle>
          </CardHeader>

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
              <FormGroup>
                <InputLabel>收運方式</InputLabel>
                <SelectGroup>
                  <DeliverySelect
                    value={deliveryMethod}
                    onChange={(e) =>
                      setDeliveryMethod(
                        e.target.value as 'fixedpoint' | 'receipt',
                      )
                    }
                  >
                    <option value="fixedpoint">放置固定點</option>
                    <option value="receipt">面交收運</option>
                  </DeliverySelect>
                  <SelectIcon>
                    <IoIosArrowDown />
                  </SelectIcon>
                </SelectGroup>
              </FormGroup>

              {deliveryMethod === 'fixedpoint' && (
                <FormGroup>
                  <InputLabel>固定點照片</InputLabel>
                  <DeliveryOptionImageContainer>
                    <DeliveryOptionImages>
                      {images.map((image) => (
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
                            <IoMdClose />
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

                      {images.length < 2 && (
                        <DeliveryOptionImageUpload
                          onClick={(e) => {
                            e.stopPropagation();
                            openFileSelector();
                          }}
                        >
                          <IoMdAdd size={24} />
                        </DeliveryOptionImageUpload>
                      )}
                    </DeliveryOptionImages>

                    {photoError && <ErrorMessage>{photoError}</ErrorMessage>}

                    <PhotoInstructions>
                      *請務必上傳兩張固定點照片，每張不超過5MB
                    </PhotoInstructions>
                  </DeliveryOptionImageContainer>
                </FormGroup>
              )}

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

export default OrderEdit;
