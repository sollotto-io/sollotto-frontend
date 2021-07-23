import { useMutation } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { UPDATE_CHARITY } from "../../../../../../../graphql/mutations";
import { ICharity } from "../../../../../../api/types/globalData";

export default function EditForm({charity,handleModalClose}: { charity: ICharity,handleModalClose:()=>void }): JSX.Element {
    const [updateCharity] = useMutation(UPDATE_CHARITY, {
      onCompleted: (data) => console.log(data),
    });
    const [loading, setLoading] = useState(false)
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
     setLoading(true)
      await updateCharity({
        variables: {
          charityId: charity.id,
          charityName: updateCharityState.charityName,
          projectDetails: updateCharityState.projectDetails,
          ImageURL: updateCharityState.ImageURL,
          fundUse: updateCharityState.fundUse,
          addedBy: updateCharityState.addedBy,
          Status: updateCharityState.Status,
          Years: updateCharityState.Years,
          isWatch: updateCharityState.isWatch,
          URL: updateCharityState.URL,
          Grade: updateCharityState.Grade,
          Impact: updateCharityState.Impact,
          webURL: updateCharityState.webURL,
          socialMedia: updateCharityState.socialMedia,
          publicKey: updateCharityState.publicKey,
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
      setLoading(false)
      setTimeout(()=>handleModalClose(), 2500)
  
      
    };
    const handleCancelEdit = ()=>{
      toast.error("Charity Updated Cancelled", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false)
      setTimeout(()=>handleModalClose(), 1500)
    }
  
    return (
      <div className="form-div">
        <form className="form" noValidate autoComplete="off">
          <span id="form-group">
            <label id="form-group-label">Charity Name</label>
            <input
              id="form-group-input"
              name="charityName"
              type="text"
              onChange={(e) => handleEditInputChange(e)}
              defaultValue={charity.charityName}
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Wallet Address</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="publicKey"
              type="text"
              defaultValue={charity.publicKey}
            />
          </span>
          <span id="form-group-image">
            <Dropzone
              onDrop={(acceptedFiles) => {
                const data = new FormData();
  
                data.append("file", acceptedFiles[0]);
                axios.post("http://localhost:5000/uploadCharity", data).then((res) => {
                  setUpdatedCharity({
                    ...updateCharityState,
                    ImageURL: `/static/charityImages/${res.data.originalname}`,
                  });
                });
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section id="image-upload-field">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag n drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
            {updateCharityState.ImageURL === "" ? (
              <p>Preview Image</p>
            ) : (
              <img
                src={`${process.env.REACT_APP_IMAGE_LINK}${updateCharityState.ImageURL}`}
                alt=""
              />
            )}
          </span>
          <span id="form-group">
            <label id="form-group-label">Website URL</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="webURL"
              type="text"
              defaultValue={charity.webURL}
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Twitter URL</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="socialMedia"
              defaultValue={charity.socialMedia}
              type="text"
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Verification Source</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="isWatch"
              type="text"
              defaultValue={charity.isWatch ? "Watch" : "GiveWell"}
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Verification Link</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="URL"
              defaultValue={charity.URL}
              type="text"
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Verification Grade</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="Grade"
              defaultValue={charity.Grade}
              type="text"
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Years operating</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="Years"
              defaultValue={charity.Years}
              type="text"
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Impact Area</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="Impact"
              defaultValue={charity.Impact}
              type="text"
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Added By</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="AddedBy"
              defaultValue={charity.addedBy}
              type="text"
            />
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
            />
          </span>
          <span id="form-group">
            <label id="form-group-label">Use Of Funds</label>
            <input
              id="form-group-input"
              onChange={(e) => handleEditInputChange(e)}
              name="fundUse"
              defaultValue={charity.fundUse}
              type="text"
            />
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
            <button id="cancel-button" onClick={() => handleCancelEdit()}>Cancel</button>
          </span>
          <span id="loader-modal">
            {loading?<CircularProgress size={20} /> : null }
            
          </span>
        </div>
      </div>
    );
  }