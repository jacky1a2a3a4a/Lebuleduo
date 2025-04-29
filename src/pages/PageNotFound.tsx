import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - 頁面未找到</h1>
      <p className="text-lg mb-8">抱歉，您訪問的頁面不存在</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        返回首頁
      </Link>
    </div>
  );
};

export default PageNotFound;
