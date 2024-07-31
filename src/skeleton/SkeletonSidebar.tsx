export default function SkeletonSidebar() {
  return (
    <>
      <section className="bg-black/15 flex flex-col rounded-md mt-5 items-center py-5 px-8 relative overflow-hidden">
        <div className="absolute h-full w-10 pulse bg-white/30 top-0 left-0"></div>
        <div className="h-8 bg-black/20 rounded-md mb-1 w-full animate-pulse"></div>
        <div className="w-48 h-48 bg-black/20 mb-4 rounded-md animate-pulse"></div>
        <div className="h-10 w-full mb-2 bg-black/20 rounded-md animate-pulse"></div>
        <div className="h-7 w-full bg-black/20 rounded-md animate-pulse"></div>
      </section>
      <section className="grid grid-cols-2 gap-2 mt-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-black/15 rounded-md flex justify-between items-center p-4 relative overflow-hidden">
            <div className="absolute h-full w-10 pulse bg-white/30 top-0 left-0"></div>
            <div className="flex flex-col w-3/5">
              <div className="h-5 w-full rounded-md bg-black/15 mb-1 animate-pulse"></div>
              <div className="h-7 w-full rounded-md bg-black/15 animate-pulse"></div>
            </div>
            <div className="w-6 h-6 rounded-md bg-black/15 animate-pulse"></div>
          </div>
        ))}
      </section>
    </>
  );
}
