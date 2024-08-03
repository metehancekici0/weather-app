export default function SkeletonContent() {
  return (
    <>
      <section className="w-full bg-white/50 dark:bg-black/50 dark:border-white/20 backdrop-blur-2xl border-black/20 border border-solid rounded-xl p-8 overflow-auto">
        <div className="bg-black/5 dark:bg-white/5 rounded-md mb-8">
          <div className="h-[121px] px-8 py-5 border-b border-black/10 flex justify-between items-center">
            <div className="bg-black/10 dark:bg-white/10 h-[60px] w-40 animate-pulse relative overflow-hidden">
              <div className="absolute h-full w-10 pulse bg-white/30 dark:bg-black/30 top-0 left-0"></div>
            </div>
            <div className="bg-black/10 dark:bg-white/10 h-[60px] w-40 animate-pulse relative overflow-hidden">
              <div className="absolute h-full w-10 pulse bg-white/30 dark:bg-black/30 top-0 left-0"></div>
            </div>
          </div>
          <div className="p-10 mb-5 rounded-md">
            <div className="h-[275px] w-full bg-black/10 dark:bg-white/10 rounded-md overflow-hidden relative">
              <div className="absolute h-full w-10 pulse bg-white/30 dark:bg-black/30 top-0 left-0"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-md p-4 flex flex-col items-center bg-black/5 dark:bg-white/5 relative overflow-hidden">
              <div className="absolute h-full w-10 pulse bg-white/30 dark:bg-black/30 top-0 left-0"></div>
              <div className="h-7 w-full mb-1 bg-black/10 dark:bg-white/10 rounded-md"></div>
              <div className="w-[50%] aspect-square bg-black/10 dark:bg-white/10 rounded-md mb-1"></div>
              <div className="h-8 w-full rounded-md bg-black/10 dark:bg-white/10"></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
