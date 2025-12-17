export interface Alumni {
  id: number;
  nama: string;
  job?: string;
  perusahaan?: string;
  quote: string;
  img?: string;
}

export const alumni: Alumni[] = [
  {
    id: 1,
    nama: "FAISOL RODHIFI",
    job: "Program: JAPANSE SWASTA",
    perusahaan: "Berangkat: AGUSTUS 2015",
    quote:
      "Asal Jepara, lahir 29 Februari 1992. Terima kasih LPK Aishiro telah menjembatani saya bekerja di Jepang.",
    img: "https://lpk-aishiro.com/wp-content/gallery/sukses-story-di-jepang/thumbs/thumbs_faisol-1.jpg",
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    job: "Kaigo (Caregiver)",
    perusahaan: "Panti Lansia Osaka",
    quote:
      "Kerja di Jepang sangat disiplin. Terima kasih sensei yang sudah melatih mental saya sebelum berangkat.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nama: "Ahmad Fauzi",
    job: "Food Processing",
    perusahaan: "Hokkaido Dairy Farm",
    quote:
      "Prosesnya cepat dan transparan. Tidak ada biaya tersembunyi. Sukses terus LPK Aishiro!",
    img: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    id: 4,
    nama: "Ahmad Fauzi",
    job: "Food Processing",
    perusahaan: "Hokkaido Dairy Farm",
    quote:
      "Prosesnya cepat dan transparan. Tidak ada biaya tersembunyi. Sukses terus LPK Aishiro!",
    img: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];
