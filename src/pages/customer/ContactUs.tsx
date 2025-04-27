const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">聯絡我們</h1>
      <p className="text-lg mb-8">如有任何問題，請聯絡我們的客服團隊</p>
      <div className="space-y-4">
        <p>
          <span className="font-bold">電話：</span> 0800-000-000
        </p>
        <p>
          <span className="font-bold">Email：</span> support@example.com
        </p>
        <p>
          <span className="font-bold">營業時間：</span> 週一至週五 9:00-18:00
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
