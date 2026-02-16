import Image from "next/image";

export default function MadeByOrganiq() {
  return (
    <a
      href="https://www.organiqtraffic.com/web-design-columbia-sc"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-6 z-50 group flex items-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#181b1d] cursor-pointer overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#181b1d] to-[#313131] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-[8px]"
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center gap-1.5">
        <Image
          alt="Organiq Logo"
          src="/organiqlogo.png"
          width={18}
          height={18}
          className="w-[18px] h-[18px]"
        />
        <span
          className="font-medium text-[14px] leading-[20px] tracking-[-1px]"
          style={{ color: "rgb(204, 251, 176)", fontFamily: "system-ui, sans-serif" }}
        >
          Made by Organiq
        </span>
      </div>
    </a>
  );
}
