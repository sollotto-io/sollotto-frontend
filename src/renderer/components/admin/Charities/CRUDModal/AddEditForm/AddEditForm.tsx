import React, { useState } from "react";
import { useEffect } from "react";
import { ICharity } from "../../../../../api/types/globalData";
import useReduxState from "../../../../../hooks/useReduxState";
import { AppState } from "../../../../../redux/stores/store";
import EditForm from "./Forms/EditForm";
import AddForm from "./Forms/AddForm";
import { ToastContainer } from "react-toastify";
export default function AddEditForm({
  modalType,
  id,
  handleModalClose
}: {
  modalType: boolean;
  id: string;
  handleModalClose:()=>void
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
    return (<><EditForm charity={editCharity as ICharity} handleModalClose={handleModalClose} /><ToastContainer/> </>);
  } else {
    return (<><AddForm handleModalClose={handleModalClose} /><ToastContainer/></>);
  }
}

