import moment from "moment-timezone";

export const formatToRupiah = (angka: number) => {
  return "🎫 Rp" + angka.toLocaleString("id-ID");
};

export const indonesianTimestamp = () => {
  moment.tz.setDefault("Asia/Jakarta");
  return moment();
};

export const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};
