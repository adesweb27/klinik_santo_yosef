document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // Variabel Modal Lightbox
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close-btn');

    // --- 1. Fungsionalitas Navigasi (Hamburger Menu & Link Scroll) ---
    
    // Toggle menu saat hamburger diklik
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Menutup menu mobile ketika salah satu link diklik
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Fokus kembali ke konten utama setelah navigasi (A11Y)
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#janji') {
                setTimeout(() => {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }
                }, 50); 
            }
        });
    });
    
    // --- 2. Fungsionalitas Back to Top Button ---
    
    // Tampilkan/sembunyikan tombol saat scroll
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Scroll ke atas dengan animasi smooth saat tombol diklik
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 3. Fungsionalitas Modal Image Lightbox (untuk Galeri, Kegiatan, Staf, dan Dokter) ---
    
    // PERBAIKAN: Menambahkan selector '.dokter-list li'
    const popUpElements = document.querySelectorAll('.galeri-item, .kegiatan-item, .staf-item, .dokter-list li');

    popUpElements.forEach(item => {
        item.addEventListener('click', function(e) {
            // Mencegah konflik jika ada link di dalam item (seperti tombol di Kegiatan)
            if (e.target.tagName === 'A' || e.target.closest('a')) return; 

            let imgElement;
            let captionText = 'Foto Klinik Santo Yosef';
            
            // Logika untuk menentukan Gambar dan Caption
            if (item.classList.contains('galeri-item')) {
                imgElement = item.querySelector('.galeri-img');
                captionText = item.querySelector('.galeri-caption').textContent;
            } else if (item.classList.contains('kegiatan-item')) {
                imgElement = item.querySelector('.kegiatan-img');
                captionText = item.querySelector('h3').textContent; // Ambil H3 sebagai caption
            } else if (item.classList.contains('staf-item')) {
                imgElement = item.querySelector('.staf-img');
                // Gabungkan Nama dan Jabatan sebagai caption
                captionText = item.querySelector('h3').textContent + ' - ' + item.querySelector('p').textContent; 
            } else if (item.closest('.dokter-list')) { // LOGIKA BARU UNTUK DOKTER
                imgElement = item.querySelector('img');
                const name = item.querySelector('strong').textContent;
                const schedule = item.querySelector('p').textContent;
                // Gabungkan Nama Dokter dan Jadwal sebagai caption
                captionText = name + ' | ' + schedule; 
            }
            
            else {
                return; 
            }

            // Buka modal
            modal.classList.add('visible');
            modalImg.src = imgElement.src;
            modalCaption.textContent = captionText;

            document.addEventListener('keydown', closeModalOnEscape);
        });
    });

    // Fungsi untuk menutup modal
    function closeModal() {
        modal.classList.remove('visible');
        document.removeEventListener('keydown', closeModalOnEscape);
    }
    
    // Fungsi untuk menutup modal dengan tombol ESC
    function closeModalOnEscape(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    // Tutup ketika tombol close (X) diklik
    closeBtn.addEventListener('click', closeModal);

    // Tutup ketika pengguna mengklik area gelap di luar gambar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

});