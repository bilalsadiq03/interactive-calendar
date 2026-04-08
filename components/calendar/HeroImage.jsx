export default function HeroImage() {
  const date = new Date();

  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div className="relative h-64 md:h-full">
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4">
        <h2 className="text-xl font-semibold">
          {monthName} {year}
        </h2>
      </div>
    </div>
  );
}