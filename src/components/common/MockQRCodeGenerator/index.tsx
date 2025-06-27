import { useCallback, useState } from 'react';
import {
  Container,
  Title,
  InputGroup,
  Input,
  QRContainer,
} from './styled';

import QRCodeGenerator from '../QRCodeGenerator';

interface MockQRCodeGeneratorProps {
  onDownload?: (fileName: string) => void;
}

function MockQRCodeGenerator({ onDownload }: MockQRCodeGeneratorProps) {
  const [orderDetailID, setOrderDetailID] = useState<string>(''); //任務ID(後台用)
  const [orderDetailsNumber, setOrderDetailsNumber] = useState<string>(''); //任務編號(前台可以看)
  const [customerNumber, setCustomerNumber] = useState<string>(''); //客戶編號

  // 生成任務 QR Code 所需的數據
  // 要查為什麼使用useCallback
  const generateOrderQRData = useCallback(() => {
    if (!orderDetailsNumber || !orderDetailID) return null;

    return {
      OrderDetailID: parseInt(orderDetailID), // 確保是數字類型
      OrderDetailsNumber: orderDetailsNumber,
      CustomerNumber: customerNumber || 'N/A',
    };
  }, [orderDetailsNumber, orderDetailID, customerNumber]);

  return (

      <Container>
        <Title>QR Code 臨時產成器</Title>
        <InputGroup>
          <Input
            type="text"
            placeholder="請輸入任務ID"
            value={orderDetailID}
            onChange={(e) => setOrderDetailID(e.target.value)}
          />
          <Input
            type="text"
            placeholder="請輸入任務編號"
            value={orderDetailsNumber}
            onChange={(e) => setOrderDetailsNumber(e.target.value)}
          />
          <Input
            type="text"
            placeholder="請輸入客戶編號"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
          />
          {orderDetailsNumber && orderDetailID && (
            <QRContainer>
              <QRCodeGenerator
                data={generateOrderQRData()}
                size={150}
                level="H"
                includeMargin={true}
                onDownload={onDownload}
              />
            </QRContainer>
          )}
        </InputGroup>
      </Container>

  );
}

export default MockQRCodeGenerator;
