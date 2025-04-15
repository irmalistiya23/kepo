'use client';

import React, { useState } from 'react';
import './index.css';
import type { Article, Video } from '@/lib/types/dashboard';


const EducationPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: 'Cara Mengatur Keuangan untuk Pemula',
      description: 'Panduan lengkap untuk memulai perencanaan keuangan pribadi yang baik dan benar.',
      imageUrl: '/images/finance-basics.jpg',
      category: 'Perencanaan Keuangan',
      date: '15 Maret 2024',
      readTime: '5 menit',
      content: `Perencanaan keuangan adalah langkah penting untuk mencapai stabilitas finansial. Berikut beberapa tips dasar:

1. Buat Anggaran Bulanan
- Catat semua pemasukan dan pengeluaran
- Alokasikan dana untuk kebutuhan pokok
- Sisihkan untuk tabungan dan investasi

2. Prioritaskan Tabungan
- Minimal 20% dari pendapatan
- Pisahkan rekening tabungan
- Buat dana darurat

3. Kelola Utang dengan Bijak
- Hindari utang konsumtif
- Bayar cicilan tepat waktu
- Prioritaskan pelunasan utang dengan bunga tinggi

4. Mulai Berinvestasi
- Pilih instrumen sesuai profil risiko
- Diversifikasi portofolio
- Investasi jangka panjang

5. Asuransi
- Miliki asuransi kesehatan
- Pertimbangkan asuransi jiwa
- Sesuaikan dengan kebutuhan

Dengan menerapkan langkah-langkah ini, Anda akan lebih siap menghadapi tantangan finansial di masa depan.`
    },
    {
      id: 2,
      title: 'Investasi Saham untuk Pemula',
      description: 'Belajar dasar-dasar investasi saham dan tips memilih saham yang tepat.',
      imageUrl: '/images/stock-investment.jpg',
      category: 'Investasi',
      date: '10 Maret 2024',
      readTime: '8 menit',
      content: `Investasi saham bisa menjadi pilihan yang menarik untuk mengembangkan kekayaan. Berikut panduan dasar untuk pemula:

1. Memahami Dasar-dasar Saham
- Saham adalah bukti kepemilikan perusahaan
- Harga saham dipengaruhi oleh kinerja perusahaan
- Dividen adalah pembagian keuntungan perusahaan

2. Memilih Saham yang Tepat
- Analisis fundamental perusahaan
- Perhatikan sektor bisnis
- Cek track record manajemen

3. Strategi Investasi
- Diversifikasi portofolio
- Investasi jangka panjang
- Beli saat harga turun

4. Manajemen Risiko
- Jangan investasi uang pinjaman
- Tetapkan stop loss
- Pelajari analisis teknikal

5. Tips untuk Pemula
- Mulai dengan modal kecil
- Gunakan platform trading terpercaya
- Rajin belajar dan update informasi

Dengan pengetahuan dan strategi yang tepat, investasi saham bisa menjadi sumber penghasilan pasif yang menguntungkan.`
    },
    {
      id: 3,
      title: 'Cara Menghindari Utang Konsumtif',
      description: 'Strategi efektif untuk menghindari jebakan utang konsumtif dan hidup bebas utang.',
      imageUrl: '/images/debt-management.jpg',
      category: 'Manajemen Utang',
      date: '5 Maret 2024',
      readTime: '6 menit',
      content: `Utang konsumtif sering menjadi masalah keuangan yang serius. Berikut cara menghindarinya:

1. Kenali Jenis Utang
- Utang produktif vs konsumtif
- Bunga dan biaya tersembunyi
- Jangka waktu pelunasan

2. Buat Anggaran yang Ketat
- Catat semua pengeluaran
- Prioritaskan kebutuhan pokok
- Sisihkan untuk tabungan

3. Hindari Gaya Hidup Konsumtif
- Beli sesuai kebutuhan
- Bandingkan harga dan kualitas
- Manfaatkan promo dengan bijak

4. Strategi Pembayaran
- Bayar tepat waktu
- Prioritaskan utang dengan bunga tinggi
- Negosiasikan cicilan jika perlu

5. Tips Tambahan
- Miliki dana darurat
- Gunakan kartu kredit dengan bijak
- Cari penghasilan tambahan

Dengan disiplin dan perencanaan yang baik, Anda bisa terhindar dari jebakan utang konsumtif.`
    },
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: 'Dasar-dasar Perencanaan Keuangan',
      description: 'Video tutorial lengkap tentang cara membuat perencanaan keuangan yang baik.',
      thumbnailUrl: '/images/finance-planning-thumb.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      category: 'Perencanaan Keuangan',
      duration: '15:30',
    },
    {
      id: 2,
      title: 'Tips Investasi Reksadana',
      description: 'Belajar cara memilih dan mengelola investasi reksadana yang tepat.',
      thumbnailUrl: '/images/mutual-fund-thumb.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      category: 'Investasi',
      duration: '12:45',
    },
    {
      id: 3,
      title: 'Cara Menabung yang Efektif',
      description: 'Teknik-teknik menabung yang efektif untuk mencapai tujuan keuangan.',
      thumbnailUrl: '/images/saving-tips-thumb.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      category: 'Menabung',
      duration: '10:20',
    },
  ];

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setSelectedVideo(null);
  };

  return (
    <div className="education-container">
      <div className="flex justify-between items-center mb-12">
        <h2 className="education-title">
          Edukasi Keuangan
        </h2>
      </div>

      <div className="education-content">
        <section className="articles-section">
          <h3 className="section-title">Artikel Keuangan</h3>
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <span className="category-badge">{article.category}</span>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="article-title">{article.title}</h4>
                  <p className="article-description">{article.description}</p>
                  <button 
                    className="read-more-btn"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="videos-section">
          <h3 className="section-title">Video Edukasi</h3>
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="duration-badge">
                    {video.duration}
                  </div>
                </div>
                <div className="video-content">
                  <div className="video-meta">
                    <span className="category-badge">{video.category}</span>
                  </div>
                  <h4 className="video-title">{video.title}</h4>
                  <p className="video-description">{video.description}</p>
                  <button 
                    className="watch-btn"
                    onClick={() => setSelectedVideo(video)}
                  >
                    Tonton Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedArticle.title}</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="article-meta mb-4">
                <span className="category-badge">{selectedArticle.category}</span>
                <span>{selectedArticle.date}</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <div className="article-full-content">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedVideo.title}</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="video-container">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-description mt-4">
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationPage; 