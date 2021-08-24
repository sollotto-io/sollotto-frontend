import "./index.scss";
import { Modal, Fade } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@material-ui/icons/Close";
import { useState, useCallback } from "react";
import useDidUpdateEffect from "../../../hooks/useDidUpdateEffect";

interface ISollottoModal {
  open: boolean;
  handleClose: () => void;
  max: number;
  onSubmit: (value: number) => void;
  title: string;
  inputLabel: string;
  countTitle: string;
  disablevalidation?: boolean;
}
export default function SollottoModal({
  open,
  handleClose,
  max,
  onSubmit,
  title,
  inputLabel,
  countTitle,
  disablevalidation,
}: ISollottoModal): JSX.Element {
  const [inputValue, setInputValue] = useState<number>(max ?? 0);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useDidUpdateEffect(() => {
    handleHasChanged();
  }, [inputValue]);

  const handleHasChanged = useCallback(() => {
    if (inputValue != 0 && inputValue > 0 && !isNaN(inputValue)) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [inputValue]);

  const handleInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(parseInt(e.target.value));
    },
    [inputValue]
  );

  const handleSubmit = () => {
    onSubmit(inputValue);
  };
  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="s-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Fade in={open}>
          <div className="s-modal-content gradientBg gradientBorder">
            <div className="s-modal-body">
              <div className="s-modal-header">
                <h3>{title}</h3>
                <p>
                  {!disablevalidation && (
                    <>
                      {countTitle}:{" "}
                      {((): number => {
                        if (!hasChanged) {
                          return max;
                        } else {
                          if (max > inputValue) {
                            if (inputValue < 0) {
                              return max;
                            } else {
                              return max - inputValue;
                            }
                          }
                        }
                        return 0;
                      })()}
                    </>
                  )}
                </p>
                <div onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="s-modal-main">
                <div className="s-modal-voting-area">
                  <input
                    value={inputValue}
                    type="number"
                    onChange={handleInputValue}
                    onBlur={() => {
                      if (!disablevalidation) {
                        if (inputValue > max) {
                          setInputValue(max);
                        } else if (inputValue < 0) {
                          setInputValue(0);
                        }
                      } else if (inputValue < 0) {
                        setInputValue(0);
                      }
                    }}
                  />
                  <p>{inputLabel}</p>
                </div>
              </div>
              <div className="s-modal-footer">
                <button type="button" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!hasChanged || inputValue === 0}
                  onClick={handleSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
