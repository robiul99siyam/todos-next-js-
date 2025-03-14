import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center space-x-20">
        <div className="flex justify-center items-center gap-3">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          <h1 className="text-3xl font-semibold">Todos</h1>
        </div>
        <div>
          <Button />
        </div>
      </div>
    </>
  );
}
