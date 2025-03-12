import Image from "next/image";
import FileUpload from "./(components)/FileUpload";
import Header from "./(components)/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="py-6 px-4 md:px-16 lg:px2-24">
        <h1 className="text-blue-900 font-extralight text-7xl">
          Additonal Information request
        </h1>
      </section>

      <section className="py-6 px-4 md:px-16 lg:px2-24">
        <h2 className="text-blue-900 font-normal text-2xl pb-4">
          Upload Documents
        </h2>
        <hr className="text-gray-300 py-4" />
        <p>
          Select up to 10 files to upload, totaling no more than 10MB in size.
          If needed, this link can be accessed multiple times for more than 10
          files or to split larger files. Uploaded files should be PDF, PNG,
          JPG, or TIF format
        </p>
        <FileUpload />
      </section>

      <section className="py-6 px-4 md:px-16 lg:px2-24">
        <h2 className="text-blue-900 font-normal text-2xl pb-4">
          Case Information
        </h2>
        <hr className="text-gray-300 py-4" />
        <div className="mb-4">
        <h3 className="font-semibold">Case Number</h3>
        <p className="text-xs">250225162634441</p>
        </div>
        <div>
        <h3 className="font-semibold">Upload Reason</h3>
        <p className="text-xs">Linker Case Documentation</p>
        </div>
      </section>

      <footer className="flex items-center  px-4 md:px-16 lg:px2-24">
      <Image src="/logo.png" alt="logo" width={100} height={0} className=""/>
      <span className="w-full flex-1 text-center text-xs">Copyright &copy; LifeLock Inc.</span>
      </footer>
    </>
  );
}
