document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const mainTitle = document.getElementById('main-title');
    const profileButton = document.getElementById('profile-button');
    const profileModal = document.getElementById('profile-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    // --- Başlangıç Ayarları ---
    // Başlangıçta tüm içerikleri göster ve "Tümü" butonunu aktif yap
    timelineItems.forEach(item => {
        item.style.display = 'block';
    });
    document.querySelector('.sidebar-button[data-category="all"]').classList.add('active');
    // Başlığın varsayılan metni
    mainTitle.textContent = 'En Son Güncellemeler (Tümü)';


    // --- Mobil Menü İşlevselliği ---
    if (mobileMenuButton) { // Mobil menü butonu varsa
        mobileMenuButton.addEventListener('click', function() {
            sidebar.classList.toggle('hidden'); // Masaüstünde hidden class'ı olacağı için toggle'lamak işe yarayabilir
            sidebar.classList.toggle('open'); // Mobil görünümde kaydırma efekti için "open" sınıfını değiştir
        });
    }


    // --- Kategori Filtreleme İşlevselliği ---
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            const buttonText = this.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim(); // SVG ve fazla boşlukları temizle

            // Tüm butonlardan aktif sınıfını kaldır
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            // Tıklanan butona aktif sınıfını ekle
            this.classList.add('active');

            // Başlığı güncelle
            // Buton metninden SVG ikonunun metnini çıkararak başlığı daha temiz yapabiliriz.
            const cleanButtonText = buttonText.replace(/(Tümü|Twitter \(X\)|Telegram|YouTube|Discord)/, '$1').trim();
            mainTitle.textContent = `En Son Güncellemeler (${cleanButtonText})`;

            // Tüm zaman çizelgesi öğelerini gizle
            timelineItems.forEach(item => {
                item.style.display = 'none';
            });

            // Sadece seçilen kategoriye ait öğeleri veya "Tümü" seçiliyse hepsini göster
            if (category === 'all') {
                timelineItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                document.querySelectorAll(`.timeline-category.${category}`).forEach(item => {
                    item.style.display = 'block';
                });
            }

            // Mobil menü açıksa kapat (mobil deneyim için)
            if (window.innerWidth < 768 && sidebar.classList.contains('open')) {
                 sidebar.classList.remove('open');
                 // hidden sınıfını da kaldır ki, display: flex kuralı sayesinde tekrar görünmez olmasın
                 // Çünkü CSS'te .sidebar.open için transform kullanıyoruz, hidden ile display:none çakışabilir
                 // Mobil menü açıldıktan sonra kategori seçildiğinde kapatmak için hidden'ı kaldırmaya gerek yok, open'ı toggle'lamak yeterli.
                 // sidebar.classList.add('hidden'); // Eğer mobil menü tamamen kapanacaksa bu satır eklenmeli
            }
        });
    });

    // --- Profil Modal İşlevselliği ---
    profileButton.addEventListener('click', function() {
        profileModal.classList.remove('hidden');
        // Mobil menü açıksa kapat
        if (window.innerWidth < 768 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    closeModalButton.addEventListener('click', function() {
        profileModal.classList.add('hidden');
    });

    // Modal dışına tıklayınca kapatma
    profileModal.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.classList.add('hidden');
        }
    });

    // --- Pencere Boyutu Değiştiğinde Mobil Menü Durumunu Sıfırlama ---
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // Masaüstü boyutuna geçildiğinde
            sidebar.classList.remove('hidden', 'open'); // Hidden ve open sınıflarını kaldır
            sidebar.style.display = ''; // CSS'deki varsayılan display'e dön (flex)
        } else { // Mobil boyutuna geçildiğinde
            // Eğer sidebar zaten gizli değilse, tekrar gizle
            if (!sidebar.classList.contains('open')) {
                sidebar.classList.add('hidden');
            }
        }
    });

    // Sayfa ilk yüklendiğinde boyut kontrolü yap
    if (window.innerWidth < 768) {
        sidebar.classList.add('hidden');
    }
});
