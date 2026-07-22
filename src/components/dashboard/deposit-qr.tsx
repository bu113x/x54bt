import { QRCodeSVG } from "qrcode.react";

const DepositQr = ({ value }: { value: string }) => {
  return (
    <div className="flex justify-center rounded-lg bg-white p-4">
      <QRCodeSVG value={value} size={160} />
    </div>
  );
};

export default DepositQr;
