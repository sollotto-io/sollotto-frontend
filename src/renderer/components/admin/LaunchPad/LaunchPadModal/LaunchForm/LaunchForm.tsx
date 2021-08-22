import "./index.scss";
import { useMutation } from "@apollo//react-hooks";
import {
  AdminButton,
  AdminButtonArea,
  AdminDropZone,
  AdminInput,
  AdminInputNumber,
} from "../../../forms/AdminFormCore";
import { ADD_LAUNCHPAD } from "../../../../../../graphql/mutations";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import useDidUpdateEffect from "../../../../../hooks/useDidUpdateEffect";
import useReduxState from "../../../../../hooks/useReduxState";
import { ILaunch } from "../../../../../api/types/globalData";

interface ILaunchForm {
  PoolName: string;
  PoolImage: string;
  TimeRemaining: string;
  MaxDeposit: number;
  TotalWinners: number;
}

export default function LaunchForm({
  closeModal,
  edit,
  id,
}: {
  closeModal: () => void;
  edit?: boolean;
  id: string;
}): JSX.Element {
  const [addLaunchPadLottery /* { data: addRes, loading: addloading } */] =
    useMutation(ADD_LAUNCHPAD, {
      onCompleted: () => {
        closeModal();
      },
    });
  const [globalData] = useReduxState((state) => state.globalData);
  let editInitialState: ILaunchForm = {
    PoolName: "",
    PoolImage: "",
    TimeRemaining: "",
    MaxDeposit: 0,
    TotalWinners: 0,
  };
  if (edit) {
    const FindLaunch: ILaunchForm = globalData.launchPad.launchPad.find(
      (t: ILaunch) => t.id === id
    );
    editInitialState = {
      PoolName: FindLaunch.PoolName,
      PoolImage: FindLaunch.PoolImage,
      TimeRemaining: FindLaunch.TimeRemaining,
      MaxDeposit: FindLaunch.MaxDeposit,
      TotalWinners: FindLaunch.TotalWinners,
    };
  }

  const initialState: ILaunchForm = {
    PoolName: "",
    PoolImage: "",
    TimeRemaining: "",
    MaxDeposit: 0,
    TotalWinners: 0,
  };

  const [raffleForm, setRaffleForm] = useState<ILaunchForm>(initialState);
useEffect(() => {
  if(edit){
    const FindLaunch: ILaunchForm = globalData.launchPad.launchPad.find(
      (t: ILaunch) => t.id === id
    );
    editInitialState = {
      PoolName: FindLaunch.PoolName,
      PoolImage: FindLaunch.PoolImage,
      TimeRemaining: FindLaunch.TimeRemaining,
      MaxDeposit: FindLaunch.MaxDeposit,
      TotalWinners: FindLaunch.TotalWinners,
    };
    setRaffleForm(editInitialState)
  }
}, [])
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { PoolName, PoolImage, TimeRemaining } = raffleForm;
  // const [editRaffle /* { data: editRes, loading: editloading } */] =
  //   useMutation(EDIT_RAFFLE, {
  //     onCompleted: () => {

  //       closeModal();
  //     },
  //   });

  const validateFields = (): boolean => {
    if (
      (PoolName === "" || PoolImage === "" || TimeRemaining === "") &&
      !edit
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  useDidUpdateEffect(() => {
    if (submiting) {
      if (validateFields()) {
        (async () => {
          if (edit) {
           console.log(raffleForm)
          } else {
            addLaunchPadLottery({ variables: raffleForm });
          }
        })();
        setSubmiting(false);
      }
    }
  }, [submiting]);

  useDidUpdateEffect(() => validateFields(), [raffleForm]);
  const handleFormChange = useCallback(
    (item: Partial<ILaunchForm>) => {
      setRaffleForm({
        ...raffleForm,
        ...item,
      });
    },
    [raffleForm]
  );

  return (
    <form className="r-form">
      <AdminInput
        value={edit ? editInitialState.PoolName : PoolName}
        onChange={(e) => handleFormChange({ PoolName: e })}
        error={error && PoolName === ""}
        label="Pool Name"
        inputStyle={{ width: "400px" }}
      />

      <AdminDropZone
        endpoint="uploadLaunchPad"
        onDrop={(img) => handleFormChange({PoolImage: img })}
        dirName="launchImages"
        error={error && PoolImage == ""}
      />
      <span className="datepicker-toggle gradientBg">
        <input
          type="date"
          defaultValue={edit ? new Date(editInitialState.TimeRemaining).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
          className="datepicker-input"
          onChange={(e) =>
            setRaffleForm({
              ...raffleForm,
              TimeRemaining: new Date(e.target.value).toISOString(),
            })
          }
        />
      </span>
      <AdminInputNumber
        value={edit ? editInitialState.TotalWinners : initialState.TotalWinners}
        onChange={(e: number) => handleFormChange({ TotalWinners: e })}
        error={error && PoolName === ""}
        label="Total Winners"
        type="number"
        inputStyle={{ width: "400px" }}
      />

      <AdminInputNumber
        value={edit ? editInitialState.MaxDeposit : initialState.MaxDeposit}
        onChange={(e: number) => handleFormChange({ MaxDeposit: e })}
        error={error && PoolName === ""}
        label="Max Deposit"
        type="number"
        inputStyle={{ width: "400px" }}
      />

      <AdminButtonArea className="btn-area">
        <AdminButton
          disable={submiting}
          type="submit"
          onClick={(e: any) => {
            e.preventDefault();
            setSubmiting(true);
          }}
        >
          Submit
        </AdminButton>
        <AdminButton disable={submiting} onClick={closeModal}>
          Cancel
        </AdminButton>
      </AdminButtonArea>
    </form>
  );
}
