import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/init";
import { useRouter } from "next/router";
import { news } from "@/utils/data/news";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/mypage");
        } catch (error) {
            alert("Login gagal: " + error.message);
        }
    };

    const handleSelengkapnyaClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="w-full pt-4 relative">
            <h2 className="text-center font-bold text-3xl bg-blue-500 p-3">Login</h2>
            <div className="flex pt-6 pr-3">
                <div className="w-1/3 p-4 border-blue-400 border-2 rounded-t mr-4 ml-4 pt-5">
                    <div className="bg-blue-400 -mt-5 -ml-4 -mr-4 pt-2 pb-2 pl-4 pr-4 rounded-t">
                        <h3 className="font-bold text-center">News</h3>
                    </div>
                    <div className="pt-4">
                        {news.map((newsItem, index) => (
                            <div
                                key={index}
                                onClick={handleSelengkapnyaClick}
                                className="mb-4 text-left cursor-pointer p-2 rounded hover:bg-gray-100"
                            >
                                <h4 className="font-semibold">{newsItem.title}</h4>
                                <p className="pb-4">{newsItem.date}</p>
                                <hr />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleSelengkapnyaClick}
                            className="bg-blue-400 hover:bg-gray-300 py-2 px-4 rounded-3xl w-full cursor-pointer"
                        >
                            Selengkapnya
                        </button>
                    </div>
                </div>
                <div className="w-2/3 p-8 border-2 border-sky-400 rounded-xl">
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-xl font-bold mb-2">Alamat email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Alamat email"
                            className="w-full p-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-xl font-bold mb-2">Kata sandi</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Kata sandi"
                            className="w-full p-3 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </div>

            </div>

            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-lg border border-gray-200 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            Anda perlu login atau register untuk melihat selengkapnya.
                        </h3>
                        <button
                            onClick={handleClosePopup}
                            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}