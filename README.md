# 🎬 CineVerse

CineVerse, film tutkunları için geliştirilmiş modern bir film keşif platformudur. TMDB API'sini kullanarak en güncel film bilgilerini sunar.

## 🚀 Özellikler

- 🎯 Popüler, trend ve yakında gelecek filmleri keşfedin
- 🔍 Film ve oyuncu arama
- 🎭 Türlere göre film filtreleme
- 👤 Kullanıcı hesap yönetimi
- ❤️ Favori filmlerinizi kaydedin
- 🎦 Film fragmanlarını izleyin
- 📱 Tam responsive tasarım

## 🛠️ Teknolojiler

- React.js
- React Router
- TMDB API
- CSS3 (Modern animasyonlar ve geçişler)
- Font Awesome
- Vite

## ⚙️ Kurulum

1. Projeyi klonlayın:
\`\`\`bash
git clone https://github.com/kullaniciadi/cineverse.git
\`\`\`

2. Proje dizinine gidin:
\`\`\`bash
cd cineverse
\`\`\`

3. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

4. TMDB API anahtarınızı ayarlayın:
- `.env` dosyası oluşturun
- Aşağıdaki değişkeni ekleyin:
\`\`\`env
VITE_TMDB_API_KEY=sizin_api_anahtariniz
\`\`\`

5. Uygulamayı başlatın:
\`\`\`bash
npm run dev
\`\`\`

## 🔑 Ortam Değişkenleri

| Değişken | Açıklama |
|----------|-----------|
| VITE_TMDB_API_KEY | TMDB API anahtarı |

## 📁 Proje Yapısı

\`\`\`
cineverse/
├── src/
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── pages/         # Sayfa bileşenleri
│   ├── styles/        # CSS dosyaları
│   ├── App.jsx        # Ana uygulama bileşeni
│   └── main.jsx       # Giriş noktası
├── public/           # Statik dosyalar
└── index.html        # HTML şablonu
\`\`\`

## 🎨 Özelleştirme

\`\`\`css
:root {
  --primary-color: #1a237e;
  --secondary-color: #ff6f00;
  --text-color: #ffffff;
}
\`\`\`

## 📱 Responsive Tasarım

- Desktop (1200px ve üzeri)
- Tablet (768px - 1199px)
- Mobil (768px altı)

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (\`git checkout -b feature/yeniOzellik\`)
3. Değişikliklerinizi commit edin (\`git commit -am 'Yeni özellik: Açıklama'\`)
4. Branch'inizi push edin (\`git push origin feature/yeniOzellik\`)
5. Bir Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- [TMDB](https://www.themoviedb.org/) - Film veritabanı API'si
- [Font Awesome](https://fontawesome.com/) - İkonlar
- [React](https://reactjs.org/) - UI kütüphanesi
- [Vite](https://vitejs.dev/) - Build tool
