let customerDataLog = [];

function openEditor(category) {
    document.getElementById('selectedCategoryTitle').innerText = category;
    document.getElementById('editorModal').classList.remove('hidden');
}

function closeEditor() {
    document.getElementById('editorModal').classList.add('hidden');
}

function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.add('hidden');
}

function updatePreview() {
    document.getElementById('previewName').innerText = document.getElementById('inputName').value || 'Nama Lengkap';
    document.getElementById('previewRole').innerText = document.getElementById('inputRole').value || 'Posisi Pekerjaan';
    document.getElementById('previewEmail').innerText = document.getElementById('inputEmail').value || 'email@domain.com';
    document.getElementById('previewPhone').innerText = document.getElementById('inputPhone').value || '08123456789';
    document.getElementById('previewAbout').innerText = document.getElementById('inputAbout').value || 'Ringkasan profil profesional akan muncul di sini...';
    document.getElementById('previewExperience').innerText = document.getElementById('inputExperience').value || 'Riwayat pekerjaan atau magang...';
    document.getElementById('previewSkills').innerText = document.getElementById('inputSkills').value || 'Daftar keahlian...';
}

function downloadPDF() {
    const name = document.getElementById('inputName').value || 'Tanpa Nama';
    const email = document.getElementById('inputEmail').value || '-';
    const phone = document.getElementById('inputPhone').value || '-';
    const role = document.getElementById('selectedCategoryTitle').innerText;

    // Simpan data customer ke log admin
    customerDataLog.push({ name, email, phone, role, date: new Date().toLocaleTimeString() });
    renderAdminData();

    const element = document.getElementById('cvContent');
    const options = {
        margin:       10,
        filename:     `CV_${name.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save().then(() => {
        alert('CV Berhasil Diunduh! Terima kasih telah menggunakan layanan kami.');
        closeEditor();
    });
}

function renderAdminData() {
    const container = document.getElementById('customerList');
    if (customerDataLog.length === 0) {
        container.innerHTML = `<p class="text-sm text-slate-500 text-center py-4">Belum ada data customer yang mengunduh.</p>`;
        return;
    }

    let htmlContent = '';
    customerDataLog.forEach((item, index) => {
        htmlContent += `
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                    <p class="font-bold text-slate-800">${index + 1}. ${item.name} <span class="text-xs font-normal text-sky-600 bg-sky-50 px-2 py-0.5 rounded">${item.role}</span></p>
                    <p class="text-xs text-slate-500">Email: ${item.email} | Telp: ${item.phone}</p>
                </div>
                <span class="text-xs text-slate-400">${item.date}</span>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}
