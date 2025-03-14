import Image from "next/image";

export default function Landing() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center gap-20 mt-10 h-[50vh]">
      <div>
        <h1 className="text-5xl font-extrabold text-[#3D96E9] py-5">Todos</h1>
        <p className="leading-[30px] text-lg">
          Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker -
          Your Personal Productivity Ally for Seamless Goal Achievement and
          Stress-Free Task Management.
        </p>
      </div>
      <Image
        src="/note.png"
        height={400}
        width={400}
        alt="note"
        // priority
        loading="lazy"
      />
    </div>
  );
}
