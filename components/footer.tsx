import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
         <footer className="bg-[#121212] py-10  px-6 md:px-0 md:mx-auto border-t">
      <div className="flex flex-col  justify-between gap-y-3 xl:w-4/5 2xl:w-[68%] mx-auto">
        <h1 className="text-3xl md:text-5xl font-medium ">
                     <Image
             src={"/logo/logo.png"}
             width={10000}
             height={10000}
             className="w-40"
             alt="image"
           />{" "}
        </h1>
                 <p className="text-left  text-xl  text-gray-400">+91 9916728506</p>
                 <p className="text-left  text-xl  text-gray-400">
           admin@astrox.ca
         </p>
      </div>

              <div className="flex md:justify-center gap-x-4 mt-10">
          © 2024 AstroX. All Rights Reserved.
          <Link href="/" className="text-blue-500">
            Privacy Policy
          </Link>
        </div>
    </footer>
  );
};

export default Footer;
