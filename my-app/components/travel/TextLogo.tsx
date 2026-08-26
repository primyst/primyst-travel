export default function TextLogo({ large = false }: { large?: boolean }) {
  return (
    <div className={`font-black tracking-tight ${large ? "text-3xl" : "text-2xl"}`}>
      <span className="text-[#0D9488]">Pure</span><span className="text-[#F97316]">Q</span>
    </div>
  );
}
