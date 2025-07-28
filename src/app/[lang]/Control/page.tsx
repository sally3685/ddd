import Link from "next/link";
import React from "react";
import { LucidePlus, PenBoxIcon, Trash2Icon } from "lucide-react";
import { getDictionary } from "../dictionaries";
const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const LinkStyle =
    'relative rounded-xl flex justify-center items-center flex-auto rounded-xl w-[300px] min-w-[300px] max-w-[300px] h-[250px] bg-white block text-xl sm:text-2xl before:absolute before:content-[""] before:w-3/4 before:h-3/4 before:border before:border-4 before:border-[#7abc43] text-black before:rounded-xl flex flex-col gap-4 ';
  return (
    //linear-gradient(to_left_bottom,#ffcd00,#0f7a00)
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#ffffff] p-8 before:absolute before:top-0 before:block before:h-full before:w-full before:bg-[#7abc43] before:mask-[url(/pattern2.svg)] before:mask-cover before:mask-center before:content-['']">
      <div className="relative z-[1] flex h-3/4 w-full max-w-7xl flex-wrap items-center justify-center gap-12 px-14 py-48">
        <Link
          href={`Control/Add/Catigory`}
          className={`${LinkStyle} before:border-[#7abc43]`}
        >
          {" "}
          <LucidePlus size={50} color="#7abc43" />
          {t.control.add}
        </Link>
        <Link
          href={`Control/Update/Catigory`}
          className={`${LinkStyle} before:border-[#7abc43]`}
        >
          {" "}
          <PenBoxIcon size={50} color="#7abc43" />
          {t.control.update}
        </Link>
        <Link
          href={`Control/Delete/Catigory`}
          className={`${LinkStyle} before:border-[#da9040]`}
        >
          {" "}
          <Trash2Icon size={50} color="#da9040" />
          {t.control.delete}
        </Link>
      </div>
    </main>
  );
};

export default Page;
