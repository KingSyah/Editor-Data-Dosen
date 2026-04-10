let DATA = [];

document.addEventListener('DOMContentLoaded', () => {
    const dz = document.getElementById('dropZone');
    const fi = document.getElementById('fileInput');

    dz.addEventListener('click', () => fi.click());
    dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
    dz.addEventListener('drop', e => {
        e.preventDefault();
        dz.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
    });
    fi.addEventListener('change', () => { if (fi.files[0]) loadFile(fi.files[0]); });

    tryAutoLoad();
});

async function tryAutoLoad() {
    try {
        const res = await fetch('https://mte.usk.ac.id/wp-content/uploads/data-dosen/data-dosen.jsonl');
        if (!res.ok) throw 0;
        const txt = await res.text();
        DATA = txt.trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
        renderTable();
        toast('Data dimuat otomatis dari server', 'info');
    } catch {}
}

function loadFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
        try {
            DATA = e.target.result.trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
            renderTable();
            toast(`Berhasil memuat ${DATA.length} data`, 'success');
        } catch { toast('Format file tidak valid', 'error'); }
    };
    reader.readAsText(file);
}

function renderTable() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    let count = 0;

    DATA.forEach((d, i) => {
        const blob = JSON.stringify(d).toLowerCase();
        if (q && !blob.includes(q)) return;
        count++;

        const tr = document.createElement('tr');

        const photoHtml = d.photo
            ? `<div class="photo-wrap"><img src="${esc(d.photo)}" alt="" onerror="this.outerHTML='<div class=no-photo>${initials(d.name)}</div>'"></div>`
            : `<div class="photo-wrap"><div class="no-photo">${initials(d.name)}</div></div>`;

        const cats = (d.category || []).map(c => {
            const labels = { professor: 'Profesor', doctor: 'Doktor', engineering: 'Elektro', computer: 'Komputer' };
            return `<span class="cat-badge ${c}">${labels[c] || c}</span>`;
        }).join('');

        const research = (d.research || []).map(r => `<li>${esc(r)}</li>`).join('');

        tr.innerHTML = `
            <td class="photo-cell">${photoHtml}</td>
            <td class="name-cell">${esc(d.name)}</td>
            <td class="title-cell">${esc(d.title || '')}</td>
            <td>${cats}</td>
            <td><ul class="research-list">${research}</ul></td>
            <td class="actions-cell">
                <button class="btn btn-sm btn-outline" onclick="editEntry(${i})">✏️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEntry(${i})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('counter').textContent = `${count} data`;
}

function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function initials(n) {
    return (n || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function previewPhoto() {
    const url = document.getElementById('fPhoto').value.trim();
    const wrap = document.getElementById('photoPreview');
    if (url) {
        wrap.style.display = 'flex';
        wrap.innerHTML = `<img src="${esc(url)}" onerror="this.parentElement.innerHTML='<div style=\\'color:#94a3b8;font-size:0.7rem\\'>Gagal muat</div>'">`;
    } else {
        wrap.style.display = 'none';
    }
}

function openModal(idx) {
    document.getElementById('editIndex').value = idx !== undefined ? idx : -1;
    document.getElementById('modalTitle').textContent = idx !== undefined ? 'Edit Dosen' : 'Tambah Dosen';

    document.getElementById('fName').value = '';
    document.getElementById('fTitle').value = '';
    document.getElementById('fId').value = '';
    document.getElementById('fPhoto').value = '';
    document.getElementById('fResearch').value = '';
    document.getElementById('photoPreview').style.display = 'none';
    document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = false);

    if (idx !== undefined && DATA[idx]) {
        const d = DATA[idx];
        document.getElementById('fName').value = d.name || '';
        document.getElementById('fTitle').value = d.title || '';
        document.getElementById('fId').value = d.id || '';
        document.getElementById('fPhoto').value = d.photo || '';
        document.getElementById('fResearch').value = (d.research || []).join('\n');
        (d.category || []).forEach(c => {
            const cb = document.querySelector(`.checkbox-group input[value="${c}"]`);
            if (cb) cb.checked = true;
        });
        previewPhoto();
    }

    document.getElementById('modalOverlay').classList.add('open');
    document.getElementById('fName').focus();
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
}

function saveEntry() {
    const name = document.getElementById('fName').value.trim();
    if (!name) { toast('Nama wajib diisi', 'error'); return; }

    const title = document.getElementById('fTitle').value.trim();
    const idVal = document.getElementById('fId').value.trim() || slugify(name);
    const photo = document.getElementById('fPhoto').value.trim();
    const cats = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
    const research = document.getElementById('fResearch').value.split('\n').map(s => s.trim()).filter(Boolean);

    const entry = { id: idVal, name, title, category: cats, photo, research };

    const idx = parseInt(document.getElementById('editIndex').value);
    if (idx >= 0) {
        DATA[idx] = entry;
        toast('Data berhasil diubah', 'success');
    } else {
        DATA.push(entry);
        toast('Dosen baru ditambahkan', 'success');
    }

    closeModal();
    renderTable();
}

function editEntry(i) { openModal(i); }

function deleteEntry(i) {
    if (!confirm(`Hapus data "${DATA[i].name}"?`)) return;
    DATA.splice(i, 1);
    renderTable();
    toast('Data dihapus', 'success');
}

function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 40);
}

function downloadJSONL() {
    if (!DATA.length) { toast('Tidak ada data', 'error'); return; }
    const lines = DATA.map(d => JSON.stringify(d)).join('\n');
    const blob = new Blob([lines + '\n'], { type: 'application/jsonl' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data-dosen.jsonl';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('File JSONL diunduh', 'success');
}

async function copyToClipboard() {
    if (!DATA.length) { toast('Tidak ada data', 'error'); return; }
    const lines = DATA.map(d => JSON.stringify(d)).join('\n');
    try {
        await navigator.clipboard.writeText(lines);
        toast('JSONL disalin ke clipboard', 'success');
    } catch { toast('Gagal menyalin', 'error'); }
}

function toast(msg, type = 'info') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast ${type} show`;
    setTimeout(() => t.classList.remove('show'), 2500);
}

document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
