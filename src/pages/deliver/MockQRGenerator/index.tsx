import { useCallback, useState } from 'react';
import QRCodeGenerator from '../../../components/common/QRCodeGenerator';

function MockQRGenerator() {
  const [orderDetailID, setOrderDetailID] = useState<string>(''); //ID(後台用)
  const [customerNumber, setCustomerNumber] = useState<string>(''); //顧客編號(後台用)
  const [orderDetailsNumber, setOrderDetailsNumber] = useState<string>(''); //訂單編號(前台可以看)

  // 生成訂單 QR Code 所需的數據
  const generateOrderQRData = useCallback(() => {
    if (!orderDetailID || !customerNumber) return null;

    return {
      OrderDetailID: parseInt(orderDetailID), //任務ID
      CustomerNumber: customerNumber, //顧客編號
      OrderDetailsNumber: orderDetailsNumber, //訂單編號
    };
  }, [orderDetailID, customerNumber, orderDetailsNumber]);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>QR Code 產成器</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="number"
          placeholder="請輸入 OrderDetailID"
          value={orderDetailID}
          onChange={(e) => setOrderDetailID(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="text"
          placeholder="請輸入 CustomerNumber"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="text"
          placeholder="請輸入訂單編號"
          value={orderDetailsNumber}
          onChange={(e) => setOrderDetailsNumber(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        {orderDetailID && customerNumber && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <QRCodeGenerator
              data={generateOrderQRData()}
              size={150}
              level="H"
              includeMargin={true}
              onDownload={(fileName) => {
                console.log(`QR Code downloaded as: ${fileName}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MockQRGenerator;
