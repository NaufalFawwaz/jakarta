import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { news } from "@/utils/data/news";
import { useRouter } from "next/router";
import { bandLogos } from "../../assets";

const CustomDropdown = ({ selected, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-lg text-blue-900 font-bold"
      >
        {selected}
      </div>

      {open && (
        <ul className="absolute z-10 mt-1 w-40 bg-white border border-gray-300 rounded shadow-md">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Mypage = () => {
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [selectedBand, setSelectedBand] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedBand") || "Hindia";
    }
    return "Hindia";
  });


  useEffect(() => {
    localStorage.setItem("selectedBand", selectedBand);
  }, [selectedBand]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            let formattedDate = data.birthdate;
            if (data.birthdate && data.birthdate.includes("-")) {
              const [year, month, day] = data.birthdate.split("-");
              const monthNames = [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember",
              ];
              formattedDate = `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
            }

            setUserData({
              name: data.name || "",
              location: data.location || "",
              birthdate: formattedDate || "",
            });
          }
        } catch (error) {
          console.error("Gagal memuat data user:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNewsClick = () => {
    router.push("/news");
  };

  if (loading) {
    return <div className="p-6">Memuat data...</div>;
  }

  return (
    <div className="w-full pt-4 relative">
      <div className="flex pt-6 pr-3">
        <div className="w-1/3 p-4 border-blue-400 border-2 rounded-t mr-4 ml-4 pt-5">
          <div className="bg-blue-400 -mt-5 -ml-4 -mr-4 pt-2 pb-2 pl-4 pr-4 rounded-t">
            <h3 className="font-bold text-center">News</h3>
          </div>
          <div className="pt-4">
            {news.map((newsItem, index) => (
              <div
                key={index}
                onClick={handleNewsClick}
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
              onClick={handleNewsClick}
              className="bg-blue-400 hover:bg-gray-300 py-2 px-4 rounded-3xl w-full cursor-pointer"
            >
              Selengkapnya
            </button>
          </div>
        </div>

        <div className="w-2/3 p-8 gap-8 border-2 border-sky-400 rounded-xl flex">
          <div className="flex flex-col items-center mr-6">
            <img
              src={bandLogos[selectedBand] || "/user-placeholder.png"}
              alt={`Logo ${selectedBand}`}
              className="w-32 h-32 object-contain border-2 border-gray-300 mb-2"
            />
            Tertarik pada:&nbsp;
            <CustomDropdown
              selected={selectedBand}
              onChange={setSelectedBand}
              options={Object.keys(bandLogos)}
            />
          </div>
          <div>
            <p className="text-xl font-semibold mb-2">
              <strong>Nama:</strong> {userData.name}
            </p>
            <p className="text-xl font-semibold mb-2">
              <strong>Lokasi:</strong> {userData.location}
            </p>
            <p className="text-xl font-semibold">
              <strong>Tanggal Lahir:</strong> {userData.birthdate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
