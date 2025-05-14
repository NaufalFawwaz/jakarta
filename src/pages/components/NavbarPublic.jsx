import Link from "next/link";
import Image from "next/image";
import assets from "../../assets";

export default function NavbarPublic() {
  return (
    <div>
      <nav className="flex justify-end p-4 font-bold ">
        <Link href="/login" className="mr-2 hover:underline">Login</Link> |{" "}
        <Link href="/register" className="ml-2 hover:underline">Register</Link>
      </nav>
      <div className="flex justify-center items-center">
        <Image
          src={assets.logo}
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}