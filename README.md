# 📚 Sistem Profil Dosen MTE - Universitas Syiah Kuala

Sistem manajemen profil dosen yang modern, responsif, dan user-friendly untuk Program Studi Magister Teknik Elektro (MTE) Universitas Syiah Kuala.

## 🌟 Fitur Utama

### ✨ Tampilan WordPress yang Compact & Responsif
- **Desain Compact**: Tidak memenuhi layar, tampilan yang ringkas dan elegan
- **Bidang Penelitian Tersembunyi**: Muncul dengan animasi smooth saat card diklik
- **Transisi Halus**: Animasi yang mulus dari compact ke full panel
- **Mobile Friendly**: Responsif di semua perangkat
- **Ringan & Cepat**: Optimasi performa untuk loading yang cepat

### 🛠️ Editor JSONL yang User-Friendly
- **Interface Intuitif**: Mudah digunakan bahkan untuk user awam
- **Drag & Drop**: Upload file JSONL dengan mudah
- **Edit Real-time**: Perubahan langsung terlihat
- **Manajemen Foto**: Upload dan edit gambar dosen
- **Pencarian Cepat**: Filter dan cari dosen dengan mudah
- **Export/Import**: Unduh dan muat file JSONL

## 📁 Struktur File

```
PROFIL-DOSEN-MTE/
├── index.html                    # Aplikasi editor JSONL
├── script.js                     # JavaScript untuk editor
├── README.md                     # Dokumentasi ini

```

## 🚀 Cara Penggunaan

### 1. Setup di WordPress

1. **Upload File JSONL**:
   ```
   Upload file `data-dosen.jsonl` ke:
   https://mte.usk.ac.id/wp-content/uploads/data-dosen/data-dosen.jsonl
   ```

2. **Implementasi di WordPress**:
   - Buka WordPress Admin Dashboard
   - Buat halaman baru atau edit halaman yang sudah ada
   - Pilih mode "Text/HTML" (bukan Visual)
   - Copy-paste seluruh kode dari `wordpress-compact.html`
   - Publish halaman

### 2. Menggunakan Editor JSONL

#### 🌐 Akses Online
Buka aplikasi editor di: `https://your-github-username.github.io/PROFIL-DOSEN-MTE/`

#### 💻 Akses Lokal
1. Clone repository ini
2. Buka `index.html` di browser
3. Mulai mengedit data dosen

#### ⚡ Fitur Editor

**Menambah Dosen Baru:**
1. Klik tombol "➕ Tambah Dosen Baru"
2. Isi form dengan data lengkap:
   - Nama Lengkap (wajib)
   - Gelar/Jabatan (wajib)
   - Kategori (pilih yang sesuai)
   - URL Foto (opsional)
   - Bidang Penelitian (bisa multiple)
3. Klik "💾 Simpan"

**Mengedit Dosen:**
1. Klik tombol "✏️ Edit" pada card dosen
2. Ubah data yang diperlukan
3. Klik "💾 Simpan"

**Menghapus Dosen:**
1. Klik tombol "🗑️ Hapus" pada card dosen
2. Konfirmasi penghapusan

**Import/Export Data:**
- **Import**: Klik "📁 Muat File JSONL" untuk upload file
- **Export**: Klik "💾 Unduh JSONL" untuk download file

## 📊 Format Data JSONL

Setiap baris dalam file `data-dosen.jsonl` berisi satu objek JSON dengan struktur:

```json
{
  "id": "unique-identifier",
  "name": "Nama Lengkap Dosen",
  "title": "Profesor/Doktor/Magister",
  "category": ["professor", "computer"],
  "photo": "https://example.com/photo.jpg",
  "research": [
    "Bidang Penelitian 1",
    "Bidang Penelitian 2"
  ]
}
```

### 🏷️ Kategori yang Tersedia
- `professor`: Profesor
- `doctor`: Doktor  
- `engineering`: Teknik
- `computer`: Komputer

## 🎨 Kustomisasi Tampilan

### Mengubah Warna Tema
Edit bagian CSS di `wordpress-compact.html`:

```css
/* Ganti gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Ganti warna accent */
color: #667eea;
border-color: #667eea;
```

### Mengubah Layout Grid
```css
/* Ubah ukuran minimum card */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

/* Ubah gap antar card */
gap: 15px;
```

## 📱 Responsivitas

Sistem ini telah dioptimasi untuk berbagai ukuran layar:

- **Desktop**: Grid 3-4 kolom dengan layout compact
- **Tablet**: Grid 2 kolom dengan spacing yang disesuaikan  
- **Mobile**: Grid 1 kolom dengan layout vertikal

## 🔧 Troubleshooting

### ❌ Data Tidak Muncul di WordPress
1. Pastikan file JSONL sudah diupload ke path yang benar
2. Cek console browser untuk error CORS
3. Pastikan URL JSONL dapat diakses publik

### ❌ Foto Tidak Muncul
1. Pastikan URL foto valid dan dapat diakses
2. Cek format gambar (JPG, PNG, WebP)
3. Pastikan tidak ada CORS blocking

### ❌ Editor Tidak Berfungsi
1. Pastikan JavaScript diaktifkan di browser
2. Cek console untuk error
3. Refresh halaman dan coba lagi

## 🚀 Deployment ke GitHub Pages

1. **Fork/Clone Repository**
2. **Enable GitHub Pages**:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main/master
   - Folder: / (root)
3. **Akses**: `https://username.github.io/PROFIL-DOSEN-MTE/`

## 🔄 Update Workflow

1. **Edit Data**: Gunakan editor online untuk mengubah data
2. **Download JSONL**: Unduh file yang sudah diedit
3. **Upload ke WordPress**: Upload file ke server WordPress
4. **Auto Update**: Website WordPress otomatis menampilkan data terbaru

## 🤝 Kontribusi

Untuk berkontribusi pada proyek ini:

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📞 Support

Jika mengalami masalah atau butuh bantuan:

1. **Buat Issue** di GitHub repository
2. **Email**: [email-support]
3. **Dokumentasi**: Baca README ini dengan teliti

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Bebas digunakan dan dimodifikasi.

## 🎯 Roadmap

### Versi Mendatang:
- [ ] Integrasi dengan API WordPress
- [ ] Upload foto langsung ke server
- [ ] Export ke format lain (PDF, Excel)
- [ ] Sistem backup otomatis
- [ ] Multi-language support
- [ ] Advanced filtering & sorting

---

**Dibuat dengan ❤️ untuk Program Studi Magister Teknik Elektro - Universitas Syiah Kuala**

*Terakhir diupdate: 2025-06-26*
