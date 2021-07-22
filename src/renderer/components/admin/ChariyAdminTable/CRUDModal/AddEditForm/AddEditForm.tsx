import React, { useState } from "react";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import { ICharity } from "../../../../../api/types/globalData";
import useReduxState from "../../../../../hooks/useReduxState";
import { AppState } from "../../../../../redux/stores/store";
import axios from "axios";
export default function AddEditForm({
  modalType,
  id,
}: {
  modalType: boolean;
  id: string;
}): JSX.Element {
  const [editCharity, setEditCharity] = useState<ICharity>();
  const [globalData] = useReduxState((state: AppState) => state.globalData);

  useEffect(() => {
    let charity;
    const findcharity = async () => {
      charity = await globalData.charities.charities.find(
        (c: ICharity) => c.id === id
      );
      await setEditCharity(charity);
    };
    findcharity();
  }, []);
  if (modalType === false && editCharity) {
    return <EditForm charity={editCharity as ICharity} />;
  } else {
    return <AddForm />;
  }
}

function AddForm(): JSX.Element {
  return (
    <div className="form-div">
      <form className="form" noValidate autoComplete="off">
        <span id="form-group">
          <label id="form-group-label">Charity Name</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Wallet Address</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Source</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Link</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Grade</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Years operating</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Impact Area</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Added By</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Mission</label>
          <input id="form-group-input" type="text" />
        </span>
        <span id="form-group">
          <label id="form-group-label">Use Of Funds</label>
          <input id="form-group-input" type="text" />
        </span>
      </form>
      <div className="form-button-group">
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="submit-button">Submit</button>
        </span>
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="cancel-button">Cancel</button>
        </span>
      </div>
    </div>
  );
}

function EditForm(charity: { charity: ICharity }): JSX.Element {

  const [updateCharityState, setUpdatedCharity] = useState({
    charityName: charity.charity.charityName,
    projectDetails: charity.charity.projectDetails,
    ImageURL: charity.charity.ImageURL,
    fundUse: charity.charity.fundUse,
    currentVotes: charity.charity.currentVotes,
    addedBy: charity.charity.addedBy,
    Years: charity.charity.Years,
    URL: charity.charity.URL,
    isWatch: charity.charity.isWatch,
    Grade: charity.charity.Grade,
    Impact: charity.charity.Impact,
    webURL: charity.charity.webURL,
    socialMedia: charity.charity.socialMedia,
    publicKey: charity.charity.publicKey,
  });

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedCharity({
      ...updateCharityState,
      [e.currentTarget.name]: e.target.value,
    });
  };
  const handleEditTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdatedCharity({
      ...updateCharityState,
      [e.currentTarget.name]: e.target.value,
    });
  };
  const handleSubmitEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(updateCharityState)
  };

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
            defaultValue={charity.charity.charityName}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Wallet Address</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="publicKey"
            type="text"
            defaultValue={charity.charity.publicKey}
          />
        </span>
        <span id="form-group-image">
        <Dropzone onDrop={(acceptedFiles) => {
          const data = new FormData();
   
          data.append('file', acceptedFiles[0]);
          axios.post('http://localhost:5000/upload', data)
          .then((res) => {
            setUpdatedCharity({
              ...updateCharityState,
              ImageURL: res.data.originalname
            })
          });
        }}>
            {({ getRootProps, getInputProps }) => (
              <section id="image-upload-field">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag n drop some files here, or click to select files</p>
                </div>

              </section>

            )}
          </Dropzone>
          {console.log(process.env.REACT_APP_HOLDING_WALLET_SECRETKEY)}
          {updateCharityState.ImageURL === "" ? <p>Preview Image</p> : <img src={`${process.env.REACT_APP_IMAGE_LINK}/${updateCharityState.ImageURL}`} alt=""/>}

        </span>
        <span id="form-group">
          <label id="form-group-label">Website URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="webURL"
            type="text"
            defaultValue={charity.charity.webURL}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Twitter URL</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="socialMedia"
            defaultValue={charity.charity.socialMedia}
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
            defaultValue={charity.charity.isWatch ? "Watch" : "GiveWell"}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Link</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="URL"
            defaultValue={charity.charity.URL}
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Verification Grade</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Grade"
            defaultValue={charity.charity.Grade}
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Years operating</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Years"
            defaultValue={charity.charity.Years}
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Impact Area</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="Impact"
            defaultValue={charity.charity.Impact}
            type="text"
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Added By</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="AddedBy"
            defaultValue={charity.charity.addedBy}
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
            defaultValue={charity.charity.projectDetails}
          />
        </span>
        <span id="form-group">
          <label id="form-group-label">Use Of Funds</label>
          <input
            id="form-group-input"
            onChange={(e) => handleEditInputChange(e)}
            name="fundUse"
            defaultValue={charity.charity.fundUse}
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
        <span className="gradientBg gradientBorder">
          {" "}
          <button id="cancel-button">Cancel</button>
        </span>
      </div>
    </div>
  );
}
