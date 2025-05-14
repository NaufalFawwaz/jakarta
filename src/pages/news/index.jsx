import { news } from '@/utils/data/news';
import Link from 'next/link';

export default function NewsList() {
  const categoryColors = {
    "Theater": "bg-red-500",
    "Other": "bg-blue-500",
    "Comedy": "bg-green-500",
    "Music": "bg-purple-500",
    "Event": "bg-yellow-500"
  };

  return (
    <div className="flex justify-center min-h-screen py-8">
      <div className="w-full max-w-4xl px-4 ">
        <h1 className="text-3xl font-bold text-center mb-8">News</h1>
        
        <div className="space-y-6">
          {news.map((item) => (
            <Link 
              key={item.id}
              href={`/news/${item.id}`}
              className="block p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className={`${categoryColors[item.category]} text-white font-bold py-1 px-3 rounded-full text-sm w-fit mb-3`}>
                {item.category}
              </div>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-500 text-sm mb-3">{item.date}</p>
              <p className="text-gray-700 line-clamp-2">{item.konten}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}