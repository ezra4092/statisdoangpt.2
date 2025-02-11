document.getElementById("jobApplicationForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah form reload

  const form = e.target;
  const nama = form.nama.value;
  const kelas = form.kelas.value;
  const posisi = form.posisi.value;
  const dokumen = form.dokumen.files[0];

  if (!dokumen || dokumen.size > 3 * 1024 * 1024) {
    alert("Ukuran file tidak boleh lebih dari 3MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64File = reader.result.split(",")[1];

    fetch(
      "https://script.google.com/macros/s/AKfycbxBldGrS5xtCKQ66xY5ZS6kQmpYb18kk_0iUDN1HSyBwhLHYREyKTLLMYMVLKrkm2BAcA/exec",
      {
        // Ganti dengan URL Web App kamu
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nama: nama,
          kelas: kelas,
          posisi: posisi,
          dokumen: base64File,
        }),
      }
    )
      .then((response) => response.text())
      .then((result) => {
        alert("Data berhasil dikirim!");
        form.reset(); // Reset form setelah submit berhasil
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("indomaretForm")
        );
        modal.hide(); // Tutup modal setelah form dikirim
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      });
  };

  reader.readAsDataURL(dokumen);
});
