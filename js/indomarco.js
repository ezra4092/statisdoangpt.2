// Fungsi untuk setup event listener pada form dengan ID tertentu
function setupFormSubmission(formId) {
  const formElement = document.getElementById(formId);
  formElement.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah reload halaman

    const form = e.target;
    const nama = form.nama.value;
    const kelas = form.kelas.value;
    const posisi = form.posisi.value;
    const dokumenFile = form.dokumen.files[0];
    const perusahaan = form.perusahaan.value; // Nilai hidden input perusahaan

    if (!dokumenFile || dokumenFile.size > 3 * 1024 * 1024) {
      alert("Ukuran file tidak boleh lebih dari 3MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const base64File = reader.result.split(",")[1];

      fetch(
        "https://script.google.com/macros/s/AKfycbxlYMNbCRr2-d3cy6t0c_WmwE56bZXrBIxFMcn1KKI-focPZBxaSoxFr3FBws8uT2Bedw/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            nama: nama,
            kelas: kelas,
            posisi: posisi,
            dokumen: base64File,
            perusahaan: perusahaan,
          }),
        }
      )
        .then((response) => response.text())
        .then(result => {
        Swal.fire({
          title: 'Berhasil!',
          text: result,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        form.reset();
        const modalInstance = bootstrap.Modal.getInstance(form.closest('.modal'));
        if (modalInstance) modalInstance.hide();
      })
      .catch(error => {
        console.error("Error:", error);
        Swal.fire({
          title: 'Error',
          text: "Terjadi kesalahan saat mengirim data.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    };

    reader.readAsDataURL(dokumenFile);
  });
}

// Setup event listener untuk masing-masing form
setupFormSubmission("jobApplicationFormIndomaret");
setupFormSubmission("jobApplicationFormAdvan");
setupFormSubmission("jobApplicationFormPharos")
setupFormSubmission("jobApplicationFormTridaya");
setupFormSubmission("jobApplicationFormIndopsiko");
setupFormSubmission("jobApplicationFormPpkd");
setupFormSubmission("jobApplicationFormAnteraja");
setupFormSubmission("jobApplicationFormSigma");
setupFormSubmission("jobApplicationFormVillamerah");
setupFormSubmission("jobApplicationFormSutindo");
// Tambahkan pemanggilan setupFormSubmission untuk form lainnya sesuai ID-nya
