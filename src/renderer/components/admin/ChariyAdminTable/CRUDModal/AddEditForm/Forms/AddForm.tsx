import { useMutation } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { ADD_CHARITY } from "../../../../../../../graphql/mutations";

export default function AddForm({handleModalClose}:{handleModalClose:()=>void}): JSX.Element {

const [addCharity] = useMutation(ADD_CHARITY)

  const [loading, setLoading] = useState(false)

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
   setLoading(true)
   console.log(AddCharityState)
    await addCharity({
      variables: {
        charityName: AddCharityState.charityName,
        projectDetails: AddCharityState.projectDetails,
        ImageURL: AddCharityState.ImageURL,
        fundUse: AddCharityState.fundUse,
        addedBy: AddCharityState.addedBy,
        Status: AddCharityState.Status,
        Years: AddCharityState.Years,
        isWatch: AddCharityState.isWatch,
        URL: AddCharityState.URL,
        Grade: AddCharityState.Grade,
        Impact: AddCharityState.Impact,
        webURL: AddCharityState.webURL,
        socialMedia: AddCharityState.socialMedia,
        publicKey: AddCharityState.publicKey,
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




  const handleCancelAdd = ()=>{
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
            onChange={(e) => handleAddInputChange(e)}
            name="charityName"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Wallet Address</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="publicKey"
            type="text"
          />
        </span>
        <span id="form-group-image">
          <Dropzone
            onDrop={(acceptedFiles) => {
              const data = new FormData();

              data.append("file", acceptedFiles[0]);
              axios
                .post("http://localhost:5000/uploadCharity", data)
                .then((res) => {
                  setAddCharity({
                    ...AddCharityState,
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
        </span>
        <span id="form-group">
          <label id="form-group-label">Website URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="webURL"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="socialMedia"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Source</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="isWatch"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Link</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="URL"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Grade</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Grade"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Years operating</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Years"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Impact Area</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="Impact"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Added By</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="AddedBy"
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Mission</label>
          <textarea
            id="form-group-input"
            onChange={(e) => handleAddTextAreaChange(e)}
            name="ProjectDetails"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Use Of Funds</label>
          <input
            id="form-group-input"
            onChange={(e) => handleAddInputChange(e)}
            name="fundUse"
            type="text"
          />
        </span>
      </form>
      <div className="form-button-group">
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="submit-button" onClick={(e)=>{handleSubmitAdd(e)}}>Submit</button>
        </span>
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="cancel-button" onClick={()=>handleCancelAdd()}>Cancel</button>
        </span>
        <span id="loader-modal">
            {loading?<CircularProgress size={20} /> : null }
            
          </span>
      </div>
    </div>
  );
}
