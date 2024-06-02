"use client";

const ConfirmationPage = ({
  callback_url,
  owner_name,
  cookie,
  full_name,
}: {
  owner_name: string;
  full_name: string;
  cookie: string;
  callback_url: string;
}) => {
  const termsAndConditions = [
    `Anda menggunakan aplikasi yang terintegrasi dengan layanan ${owner_name}`,
    "Akun Anda akan digunakan sebagai tanda sah dalam autentikasi",
    "Kami tidak menyimpan kata sandi Anda",
    "Penyalahgunaan oleh pengguna OAuth dan/atau API di luar tanggungjawab kami",
    "Anda hanya bisa terintegrasi dengan satu layanan OAuth, dan kami hanya menyimpan layanan OAuth paling terakhir yang Anda gunakan",
    "Segala kerusakan/cacat/masalah yang terjadi kedepannya sebelum/sedang/setelah menggunakan layanan kami di luar tanggungjawab kami",
  ];

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
            Dengan menekan <b>Setuju</b>, berarti Anda <b>({full_name})</b>{" "}
            menyetujui seluruh <i>Terms and Conditions</i> kami.
          </p>
          <div className="card-actions justify-end mt-2">
            <a
              className="btn btn-error text-white"
              href={`${callback_url}?cookie=${cookie}`}
            >
              Setuju
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
