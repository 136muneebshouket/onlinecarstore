import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import suggestionarray from "./suggestionarray";

const Textareamodal = forwardRef((props, ref) => {
  const [showbtns, setShowbtns] = useState("textarea_btns");
  const [suggetion, setSuggetion] = useState(suggestionarray);

  const resetfunc = () => {
    setSuggetion(suggestionarray);
  };
  // Expose the function to the parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    resetfunc,
  }));

  const change = () => {
    if (showbtns == "textarea_btns") {
      setShowbtns("textarea_btns showall");
    } else {
      setShowbtns("textarea_btns");
    }
  };

  const addtext = (index, event) => {
    event.preventDefault();
    props.adddtext(suggetion[index].desc);
    const suggestion = suggetion.filter((obj) => {
      return obj.name !== suggetion[index].name;
    });
    setSuggetion(suggestion);
  };

  return (
    <>
      <div className={showbtns}>
        {suggetion.map((obj, index) => {
          return (
            <button
              key={index}
              onClick={(e) => {
                addtext(index, e);
              }}
            >
              {obj.name}
            </button>
          );
          {
            /* <div key={obj.name} style={{display:'none'}}></div> */
          }
        })}
      </div>
      <div className="showmore_btn">
        <span>
          <span onClick={change}>Show More Suggestions</span>
        </span>
      </div>
    </>
  );
});

export default React.memo(Textareamodal);
