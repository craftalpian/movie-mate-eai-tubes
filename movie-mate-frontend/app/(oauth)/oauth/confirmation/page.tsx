const termsAndConditions = [
  "Akun Anda akan digunakan sebagai tanda sah dalam autentikasi",
  "Kami tidak menyimpan kata sandi Anda",
  "Penyalahgunaan oleh pengguna OAuth dan/atau API di luar tanggungjawab kami",
  "Segala kerusakan/cacat/masalah yang terjadi kedepannya sebelum/sedang/setelah menggunakan layanan kami di luar tanggungjawab kami",
];

const ConfirmationPage = () => {
  return (
    <div className="max-w-sm w-full flex">
      <div className="card bg-base-100 shadow-xl m-auto">
        <div className="card-body">
          <h2 className="card-title">Terms and Conditions</h2>
          <div className="space-y-4 my-2 bg-gray-100 p-4 max-h-64 overflow-y-auto">
            {termsAndConditions?.map((text) => (
              <div className="inline-flex gap-x-2" key={text}>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  disabled
                  checked
                />
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p>
            Dengan menekan <b>Setuju</b>, berarti Anda menyetujui seluruh{" "}
            <i>Terms and Conditions</i> kami.
          </p>
          <div className="card-actions justify-end mt-2">
            <button className="btn btn-error text-white">Setuju</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
