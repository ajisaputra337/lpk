import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RulesContent' });
  return { title: t('title'), description: t('description') };
}

export default function RulesPage() {
  const t = useTranslations('RulesContent');

  // Mengambil data array dari JSON
  const personalList = t.raw('personalList') as string[];
  const sanctionsList = t.raw('sanctionsList') as { v: string; p: string }[];

  return (
    <main className="min-h-screen bg-white py-12 container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-10 pt-20">{t('title')}</h1>

      {/* List Peraturan */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 text-green-700">{t('personalTitle')}</h2>
        <div className="space-y-2">
          {personalList.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-red-500">
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </section>

      {/* Tabel Sanksi */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-red-700">{t('sanctionTitle')}</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">{t('tableHeaderViolation')}</th>
                <th className="p-3 border-b">{t('tableHeaderPenalty')}</th>
              </tr>
            </thead>
            <tbody>
              {sanctionsList.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.v}</td>
                  <td className={`p-3 ${item.p.includes('DO') ? 'text-red-600 font-bold' : ''}`}>
                    {item.p}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}