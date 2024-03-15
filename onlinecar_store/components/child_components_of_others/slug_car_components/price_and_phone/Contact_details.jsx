import React, { memo } from "react";
import price_converter from "@/components/processing_functions/Price_calculator";

const Contact_details = ({ price, phone , managed_by }) => {
  return (
    <div className="seller_details contact_dtals">
      <h5 style={{ color: "#3EB549", fontFamily: "monospace",fontSize:'xx-large' }}>PKR: {price_converter(price)} </h5>
      {managed_by == true ? <> <span className="pending_banner">Managed by CarSelection</span> </>: null}
      <div style={{ background: "#3EB549",color:'white',borderRadius:'5px' }} className="seller_name">
        <span style={{fontSize:'xx-large', marginRight:'5px'}}>&#9990;</span>
        <span style={{fontSize:'x-large'}}>{phone}</span>
      </div>

    </div>
  );
};

export default memo(Contact_details);
