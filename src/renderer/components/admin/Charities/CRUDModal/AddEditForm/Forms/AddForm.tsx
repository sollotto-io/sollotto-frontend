import { useMutation } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { ADD_CHARITY } from "../../../../../../../graphql/mutations";
import { AdminDropZone } from "../../../../forms/AdminFormCore";
import { uploadToS3 } from "../../../../../../../utils/api";
export default function AddForm({
  handleModalClose,
}: {
  handleModalClose: () => void;
}): JSX.Element {
  const [addCharity] = useMutation(ADD_CHARITY);

  const [loading, setLoading] = useState(false);

  const [AddCharityState, setAddCharity] = useState({
    charityName: "",
    projectDetails: "",
    ImageURL: "",
    fundUse: "",
    Status: true,
    addedBy: "",
    Years: "",
    URL: "",
    isWatch: true,
    Grade: "",
    Impact: "",
    webURL: "",
    socialMedia: "",
    publicKey: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "isWatch") {
      if (e.target.value.substring(0, 3).toLowerCase() == "wat") {
        setAddCharity({
          ...AddCharityState,
          [e.currentTarget.name]: true,
        });
      } else if (e.target.value.substring(0, 3).toLowerCase() == "giv") {
        setAddCharity({
          ...AddCharityState,
          [e.currentTarget.name]: false,
        });
      }
    } else {
      setAddCharity({
        ...AddCharityState,
        [e.currentTarget.name]: e.target.value,
      });
    }
  };
  const handleAddTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddCharity({
      ...AddCharityState,
      [e.currentTarget.name]: e.target.value,
    });
  };
  const handleSubmitAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const charityValues = { ...AddCharityState };
    if (imageFile) {
      const imageUploaded = await uploadToS3(imageFile, "charityImages");
      if (imageUploaded.key) {
        charityValues.ImageURL = imageUploaded.key;
      }
    }
    await addCharity({
      variables: {
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

  const handleCancelAdd = () => {
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
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="charityName"
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
          {errors.charityName === "" ? null : (
            <p id="error">{errors.charityName}</p>
          )}
        </span>
        <span id="form-group">
          <label id="form-group-label">Wallet Address</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="publicKey"
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
          {errors.publicKey === "" ? null : (
            <p id="error">{errors.publicKey}</p>
          )}
        </span>
        <span id="form-group-image">
          <AdminDropZone
            onDrop={(e) => {
              setImageFile(e.image);
              setAddCharity({ ...AddCharityState, ImageURL: e.path });
            }}
            style={{ margin: 0 }}
            initialImage={AddCharityState.ImageURL}
            error={errors.ImageURL === ""}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Website URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="webURL"
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
          {errors.webURL === "" ? null : <p id="error">{errors.webURL}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="socialMedia"
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
            onChange={(e) => handleAddInputChange(e)}
            name="isWatch"
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
          {errors.isWatch === "" ? null : <p id="error">{errors.isWatch}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Link</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="URL"
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
          {errors.URL === "" ? null : <p id="error">{errors.URL}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Grade</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Grade"
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
          {errors.Grade === "" ? null : <p id="error">{errors.Grade}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Years operating</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Years"
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
          {errors.Years === "" ? null : <p id="error">{errors.Years}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Impact Area</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Impact"
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
          {errors.Impact === "" ? null : <p id="error">{errors.Impact}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Added By</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="addedBy"
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
          {errors.addedBy === "" ? null : <p id="error">{errors.addedBy}</p>}
        </span>
        <span id="form-group">
          <label id="form-group-label">Mission</label>
          <textarea
            id="form-group-input"
            onChange={(e) => handleAddTextAreaChange(e)}
            name="projectDetails"
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
            onChange={(e) => handleAddInputChange(e)}
            name="fundUse"
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
          {errors.fundUse === "" ? null : <p id="error">{errors.fundUse}</p>}
        </span>
      </form>
      <div className="form-button-group">
        <span className="gradientBg gradientBorder">
          {" "}
          <button
            id="submit-button"
            onClick={(e) => {
              handleSubmitAdd(e);
            }}
          >
            Submit
          </button>
        </span>
        <span className="gradientBg3 gradientBorder">
          {" "}
          <button id="cancel-button" onClick={() => handleCancelAdd()}>
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
