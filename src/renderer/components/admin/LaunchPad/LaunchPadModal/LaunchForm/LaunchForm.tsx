import "./index.scss";
import { useMutation } from "@apollo//react-hooks";
import {
  AdminButton,
  AdminButtonArea,
  AdminDropZone,
  AdminInput,
  AdminInputNumber,
} from "../../../forms/AdminFormCore";
import {
  ADD_LAUNCHPAD,
  EDIT_LAUNCH,
} from "../../../../../../graphql/mutations";
import { useState } from "react";
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
  id?: string;
}): JSX.Element {
  const [addLaunchPadLottery] = useMutation(ADD_LAUNCHPAD, {
    onCompleted: async () => {
      await globalData.launchPad.refetch();
      closeModal();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [updateLaunch] = useMutation(EDIT_LAUNCH, {
    onCompleted: async () => {
      await globalData.launchPad.refetch();
      closeModal();
    },
    onError: (e) => {
      console.log(e.stack);
    },
  });
  const [globalData] = useReduxState((state) => state.globalData);
  const FindLaunch = globalData.launchPad.launchPad.find(
    (t: ILaunch) => t.id === id
  );

  const [data] = useState<ILaunch>(FindLaunch);

  const initialState: ILaunchForm = {
    PoolName: data !== undefined ? data.PoolName : "",
    PoolImage: data !== undefined ? data.PoolImage : "",
    TimeRemaining: data !== undefined ? data.TimeRemaining : "",
    MaxDeposit: data !== undefined ? data.MaxDeposit : 0,
    TotalWinners: data !== undefined ? data.TotalWinners : 0,
  };
  const [raffleForm, setRaffleForm] = useState<ILaunchForm>(initialState);

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { PoolName, PoolImage, TimeRemaining, MaxDeposit, TotalWinners } =
    raffleForm;

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
            updateLaunch({
              variables: {
                Id: data.id,
                PoolName: raffleForm.PoolName,
                PoolImage: raffleForm.PoolImage,
                TimeRemaining: raffleForm.TimeRemaining,
                TotalWinners: raffleForm.TotalWinners,
                MaxDeposit: raffleForm.MaxDeposit,
              },
            });
          } else {
            console.log(raffleForm);
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
        value={PoolName}
        onChange={(e) => handleFormChange({ PoolName: e })}
        error={error && PoolName === ""}
        label="Pool Name"
        inputStyle={{ width: "400px" }}
      />

      <AdminDropZone
        endpoint="uploadLaunchPad"
        onDrop={(img) => handleFormChange({ PoolImage: img })}
        dirName="launchImages"
        error={error && PoolImage == ""}
      />
      <span className="datepicker-toggle gradientBg">
        <input
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
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
        value={TotalWinners}
        onChange={(e: number) => handleFormChange({ TotalWinners: e })}
        error={error && PoolName === ""}
        label="Total Winners"
        type="number"
        inputStyle={{ width: "400px" }}
      />

      <AdminInputNumber
        value={MaxDeposit}
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
