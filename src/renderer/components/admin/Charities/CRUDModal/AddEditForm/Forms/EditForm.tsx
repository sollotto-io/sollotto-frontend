import { useMutation } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { UPDATE_CHARITY } from "../../../../../../../graphql/mutations";
import { ICharity } from "../../../../../../api/types/globalData";
import { AdminDropZone } from "../../../../forms/AdminFormCore";
import { uploadToS3 } from "../../../../../../../utils/api";

export default function EditForm({
  charity,
  handleModalClose,
}: {
  charity: ICharity;
  handleModalClose: () => void;
}): JSX.Element {
  const [updateCharity] = useMutation(UPDATE_CHARITY, {
    onCompleted: (data) => console.log(data),
  });
  const [loading, setLoading] = useState(false);
  const [updateCharityState, setUpdatedCharity] = useState({
    charityName: charity.charityName,
    projectDetails: charity.projectDetails,
    ImageURL: charity.ImageURL,
    fundUse: charity.fundUse,
    Status: true,
    addedBy: charity.addedBy,
    Years: charity.Years,
    URL: charity.URL,
    isWatch: charity.isWatch,
    Grade: charity.Grade,
    Impact: charity.Impact,
    webURL: charity.webURL,
    socialMedia: charity.socialMedia,
    publicKey: charity.publicKey,
  });
  const [errors, setErrors] = useState({
    charityName: "",
    projectDetails: "",
    ImageURL: "",
    fundUse: "",
    Status: "",
    addedBy: "",
    Years: "",
    URL: "",
    isWatch: "",
    Grade: "",
    Impact: "",
    webURL: "",
    socialMedia: "",
    publicKey: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "isWatch") {
      if (e.target.value.substring(0, 3).toLowerCase() == "wat") {
        setUpdatedCharity({
          ...updateCharityState,
          [e.currentTarget.name]: true,
        });
      } else if (e.target.value.substring(0, 3).toLowerCase() == "giv") {
        setUpdatedCharity({
          ...updateCharityState,
          [e.currentTarget.name]: false,
        });
      }
    } else {
      setUpdatedCharity({
        ...updateCharityState,
        [e.currentTarget.name]: e.target.value,
      });
    }
  };
  const handleEditTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedCharity({
      ...updateCharityState,
      [e.currentTarget.name]: e.target.value,
    });
  };
  const handleSubmitEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const charityValues = { ...updateCharityState };
    if (imageFile) {
      const imageUploaded = await uploadToS3(imageFile, "charityImages");
      if (imageUploaded.key) {
        console.log(imageUploaded);
        charityValues.ImageURL = imageUploaded.key;
      }
    }
    await updateCharity({
      variables: {
        charityId: charity.id,
        charityName: charityValues.charityName,
        projectDetails: charityValues.projectDetails,
        ImageURL: charityValues.ImageURL,
        fundUse: charityValues.fundUse,
        addedBy: charityValues.addedBy,
        Status: charityValues.Status,
        Years: charityValues.Years,
        isWatch: charityValues.isWatch,
        URL: charityValues.URL,
        Grade: charityValues.Grade,
        Impact: charityValues.Impact,
        webURL: charityValues.webURL,
        socialMedia: charityValues.socialMedia,
        publicKey: charityValues.publicKey,
      },
    });
    toast.success("Charity Updated Successfully", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false);
    setTimeout(() => handleModalClose(), 2500);
  };
  const handleCancelEdit = () => {
    toast.error("Charity Updated Cancelled", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false);
    setTimeout(() => handleModalClose(), 1500);
  };

  return (
    <div className="form-div">
      <form className="form" noValidate autoComplete="off">
        <span id="form-group">
          <label id="form-group-label">Charity Name</label>
          <input
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            id="form-group-input"
            name="charityName"
            type="text"
            onChange={(e) => handleEditInputChange(e)}
            defaultValue={charity.charityName}
          />
          {errors.charityName === "" ? null : (
            <p id="error">{errors.charityName}</p>
          )}
        </span>
        <span id="form-group">
          <label id="form-group-label">Wallet Address</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="publicKey"
            type="text"
            defaultValue={charity.publicKey}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
          />
          {errors.publicKey === "" ? null : (
            <p id="error">{errors.publicKey}</p>
          )}
        </span>
        <span id="form-group-image">
          <AdminDropZone
            onDrop={(e) => {
              setImageFile(e.image);
              setUpdatedCharity({ ...updateCharityState, ImageURL: e.path });
            }}
            style={{ margin: 0 }}
            initialImage={updateCharityState.ImageURL}
            error={errors.ImageURL === ""}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Website URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="webURL"
            type="text"
            defaultValue={charity.webURL}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
          />
          {errors.webURL === "" ? null : <p id="error">{errors.webURL}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="socialMedia"
            defaultValue={charity.socialMedia}
            type="text"
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
          />
          {errors.socialMedia === "" ? null : (
            <p id="error">{errors.socialMedia}</p>
          )}
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Source</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="isWatch"
            type="text"
            defaultValue={charity.isWatch ? "Watch" : "GiveWell"}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
          />
          {errors.isWatch === "" ? null : <p id="error">{errors.isWatch}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Link</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="URL"
            defaultValue={charity.URL}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.URL === "" ? null : <p id="error">{errors.URL}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Grade</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Grade"
            defaultValue={charity.Grade}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.Grade === "" ? null : <p id="error">{errors.Grade}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Years operating</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Years"
            defaultValue={charity.Years}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.Years === "" ? null : <p id="error">{errors.Years}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Impact Area</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Impact"
            defaultValue={charity.Impact}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.Impact === "" ? null : <p id="error">{errors.Impact}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Added By</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="addedBy"
            defaultValue={charity.addedBy}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.addedBy === "" ? null : <p id="error">{errors.addedBy}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Mission</label>
          <textarea
            id="form-group-input"
            name="projectDetails"
            onChange={(e) => {
              handleEditTextAreaChange(e);
            }}
            defaultValue={charity.projectDetails}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
          />
          {errors.projectDetails === "" ? null : (
            <p id="error">{errors.projectDetails}</p>
          )}
        </span>
        <span id="form-group">
          <label id="form-group-label">Use Of Funds</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="fundUse"
            defaultValue={charity.fundUse}
            onBlur={(e) => {
              if (e.target.value === "") {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "This field is mandatory",
                });
              } else {
                setErrors({
                  ...errors,
                  [e.currentTarget.name]: "",
                });
              }
            }}
            type="text"
          />
          {errors.fundUse === "" ? null : <p id="error">{errors.fundUse}</p>}
        </span>
      </form>
      <div className="form-button-group">
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="submit-button" onClick={(e) => handleSubmitEdit(e)}>
            Submit
          </button>
        </span>
        <span className="gradientBg3 gradientBorder">
          {" "}
          <button id="cancel-button" onClick={() => handleCancelEdit()}>
            Cancel
          </button>
        </span>
        <span id="loader-modal">
          {loading ? <CircularProgress size={20} /> : null}
        </span>
      </div>
    </div>
  );
}
