import React, { useState, memo } from "react";
import Report_modal from "@/components/Modals/Report_ad_modal/Report_modal";

const Reporting_add = ({ selleremail, ad_id,type }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <button className="report_add_btn" onClick={handleOpenModal}>
        Report this add
      </button>

      {isModalOpen && (
        <Report_modal
          seller={selleremail}
          ad_id={ad_id}
          type={type}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default memo(Reporting_add);
