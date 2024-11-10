import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <div className="container flex flex-col items-center justify-around w-full h-[50vh]">
      <h2 className="font-bold text-5xl">
        به پروژه‌ی تمرینی بوت‌کمپ بوتواستارت خوش آمدید
      </h2>
      <Link href="/products">
        <button className="flex items-center justify-center px-6 py-2.5 text-center text-white duration-200 bg-blue-900 border-2 border-blue-900 rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">
          مشاهده‌ی همه‌ی محصولات
        </button>
      </Link>
    </div>
  );
}

export default Home;
