import Link from 'next/link';

interface ProgramCardProps {
  title: string;
  description: string;
//   linkHref: string;
  icon: React.ReactNode; // Untuk ikon visual program (misalnya: SVG)
}

const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-red-100">
      
      {/* Icon Area (Visualisasi Jepang: Sederhana & Simbolis) */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-700">
        {icon}
      </div>

      {/* Konten */}
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 flex-grow mb-4">{description}</p>

    </div>
  );
};

export default ProgramCard;