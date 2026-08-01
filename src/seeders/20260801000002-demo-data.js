'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    // 1. Seed admin user
    await queryInterface.bulkInsert('users', [{
      id: 1,
      nama: 'Administrator Desa Tenjonagara',
      email: 'admin@tenjonagara.desa.id',
      password_hash: adminPassword,
      role: 'super_admin',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // 2. Seed profil_desa
    await queryInterface.bulkInsert('profil_desa', [{
      id: 1,
      sejarah: 'Desa Tenjonagara merupakan salah satu desa di Kecamatan Cigalontang, Kabupaten Tasikmalaya, Jawa Barat. Berada di kawasan perbukitan yang asri dengan mata pencaharian utama masyarakat di bidang pertanian dan perkebunan. Desa ini berdiri sejak puluhan tahun lalu dengan kearifan lokal yang terjaga erat.',
      visi: 'Terwujudnya Desa Tenjonagara yang Mandiri, Sejahtera, Agamis, dan Berbudaya Berbasis Potensi Pertanian dan Ekonomi Kerakyatan.',
      misi: '1. Meningkatkan kualitas pelayanan publik dan transparansi tata kelola pemerintahan desa.\n2. Mengembangkan sarana dan prasarana pertanian serta UMKM desa.\n3. Meningkatkan derajat kesehatan dan pendidikan masyarakat desa.\n4. Memelihara kelestarian lingkungan hidup dan nilai kearifan lokal Sunda.',
      luas_wilayah: '14.52 km²',
      jumlah_dusun: 4,
      jumlah_rt: 22,
      jumlah_rw: 6,
      updated_at: new Date()
    }]);

    // 3. Seed perangkat_desa
    await queryInterface.bulkInsert('perangkat_desa', [
      {
        nama: 'Asep Saepulloh, S.IP',
        jabatan: 'Kepala Desa',
        no_hp: '081234567890',
        foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
        urutan: 1,
        created_at: new Date()
      },
      {
        nama: 'Deden Kurnia, S.ST',
        jabatan: 'Sekretaris Desa',
        no_hp: '081234567891',
        foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        urutan: 2,
        created_at: new Date()
      },
      {
        nama: 'Rina Rahmawati',
        jabatan: 'Kaur Keuangan / Bendahara',
        no_hp: '081234567892',
        foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
        urutan: 3,
        created_at: new Date()
      },
      {
        nama: 'Hendrik Herdiana',
        jabatan: 'Kasi Pemerintahan',
        no_hp: '081234567893',
        foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        urutan: 4,
        created_at: new Date()
      }
    ]);

    // 4. Seed potensi_desa
    await queryInterface.bulkInsert('potensi_desa', [
      {
        kategori: 'pertanian',
        nama: 'Perkebunan Teh & Padi Sawah Organik',
        deskripsi: 'Komoditas utama Desa Tenjonagara dengan hasil panen padi berkualitas tinggi serta perkebunan teh produktif di lereng Cigalontang.',
        gambar_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        created_at: new Date()
      },
      {
        kategori: 'umkm',
        nama: 'Kerajinan Olahan Kopi & Makanan Olahan Singkong',
        deskripsi: 'Kelompok tani dan warga memproduksi kopi olahan asli Cigalontang dan aneka olahan singkong bernilai jual tinggi.',
        gambar_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
        created_at: new Date()
      },
      {
        kategori: 'wisata',
        nama: 'Wisata Alam & Camping Ground Curug Tenjonagara',
        deskripsi: 'Destinasi wisata panorama alam pegunungan, udara sejuk, dan aliran sungai jernih yang alami.',
        gambar_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        created_at: new Date()
      }
    ]);

    // 5. Seed layanan
    await queryInterface.bulkInsert('layanan', [
      {
        nama_layanan: 'Surat Keterangan Usaha (SKU)',
        deskripsi: 'Pelayanan penerbitan surat keterangan bagi warga yang memiliki usaha mikro/kecil untuk keperluan perbankan atau legalitas.',
        syarat: '1. Fotokopi KTP Pemohon\n2. Fotokopi Kartu Keluarga\n3. Surat Pengantar dari RT/RW setempat\n4. Foto lokasi tempat usaha',
        created_at: new Date()
      },
      {
        nama_layanan: 'Surat Keterangan Domisili',
        deskripsi: 'Surat bukti tempat tinggal resmi warga di wilayah Desa Tenjonagara.',
        syarat: '1. Fotokopi KTP\n2. Fotokopi KK\n3. Pengantar RT/RW',
        created_at: new Date()
      },
      {
        nama_layanan: 'Surat Keterangan Tidak Mampu (SKTM)',
        deskripsi: 'Surat keterangan bantuan pendidikan/kesehatan untuk keluarga pra-sejahtera.',
        syarat: '1. Fotokopi KTP & KK Pemohon\n2. Surat Pengantar RT/RW dengan stempel\n3. Kartu KIS/BPJS jika ada',
        created_at: new Date()
      }
    ]);

    // 6. Seed berita
    await queryInterface.bulkInsert('berita', [
      {
        judul: 'Pelatihan Kewirausahaan UMKM Pemuda Desa Tenjonagara',
        slug: 'pelatihan-kewirausahaan-umkm-pemuda-desa-tenjonagara',
        konten: 'Pemerintah Desa Tenjonagara menggelar pelatihan digital marketing dan pengemasan produk UMKM lokal bagi generasi muda. Kegiatan ini diikuti oleh 40 peserta dari perwakilan karang taruna setiap dusun.',
        gambar_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        penulis_id: 1,
        status: 'published',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        judul: 'Kerja Bakti Masal Pembersihan Saluran Irigasi Sawah Dusun 1',
        slug: 'kerja-bakti-masal-pembersihan-saluran-irigasi-sawah-dusun-1',
        konten: 'Antusiasme warga dalam memperlancar pasokan air menjelang musim tanam padi tercermin dari tingginya partisipasi dalam kerja bakti pembersihan gorong-gorong sawah.',
        gambar_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
        penulis_id: 1,
        status: 'published',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    // 7. Seed statistik_penduduk
    await queryInterface.bulkInsert('statistik_penduduk', [
      {
        tahun: 2026,
        jumlah_total: 4250,
        jumlah_laki: 2180,
        jumlah_perempuan: 2070,
        jumlah_kk: 1120,
        created_at: new Date()
      }
    ]);

    // 8. Seed apbdes
    await queryInterface.bulkInsert('apbdes', [
      {
        tahun: 2026,
        bidang: 'Penyelenggaraan Pemerintahan Desa',
        pagu_anggaran: 450000000.00,
        realisasi: 380000000.00,
        created_at: new Date()
      },
      {
        tahun: 2026,
        bidang: 'Pelaksanaan Pembangunan Desa',
        pagu_anggaran: 680000000.00,
        realisasi: 520000000.00,
        created_at: new Date()
      },
      {
        tahun: 2026,
        bidang: 'Pembinaan & Pemberdayaan Masyarakat',
        pagu_anggaran: 210000000.00,
        realisasi: 175000000.00,
        created_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('apbdes', null, {});
    await queryInterface.bulkDelete('statistik_penduduk', null, {});
    await queryInterface.bulkDelete('berita', null, {});
    await queryInterface.bulkDelete('layanan', null, {});
    await queryInterface.bulkDelete('potensi_desa', null, {});
    await queryInterface.bulkDelete('perangkat_desa', null, {});
    await queryInterface.bulkDelete('profil_desa', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
