import Image from "next/image";

export default function WorksGrid() {
  return (
    <div className="flex flex-col gap-11.5">
      <div className="grid grid-cols-[repeat(3,max-content)] gap-6 place-content-center">
        <div className="cursor-pointer">
          <Image
            src="/images/celler.svg"
            alt="celler"
            height={546}
            width={379}
          />
        </div>

        <div className="cursor-pointer">
          <Image src="/images/cwito.svg" alt="cwito" height={546} width={379} />
        </div>

        <div className="cursor-pointer">
          <Image
            src="/images/gambit.svg"
            alt="gambit"
            height={546}
            width={379}
          />
        </div>
      </div>

      <div className="flex xl:flex-row flex-col justify-center items-center gap-6.75">
        <Image
          className="cursor-pointer"
          src="/images/tawq.svg"
          alt="celler"
          height={601}
          width={591}
        />

        <Image
          className="cursor-pointer"
          src="/images/rhoble.svg"
          alt="rhoble"
          height={609}
          width={591}
        />
      </div>
    </div>
  );
}
