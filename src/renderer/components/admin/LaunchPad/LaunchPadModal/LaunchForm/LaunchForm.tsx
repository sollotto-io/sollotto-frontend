import "./index.scss";
import { useMutation } from "@apollo//react-hooks";
import {
  AdminButton,
  AdminButtonArea,
  AdminDropZone,
  AdminInput,
  AdminInputNumber,
  AdminDatePicker,
} from "../../../forms/AdminFormCore";
import {
  ADD_LAUNCHPAD,
  EDIT_LAUNCH,
} from "../../../../../../graphql/mutations";
import { useState } from "react";
import { useCallback } from "react";
import useDidUpdateEffect from "../../../../../hooks/useDidUpdateEffect";
import useReduxState from "../../../../../hooks/useTypedReduxState";
import { ILaunch } from "../../../../../api/types/globalData";
import { uploadToS3 } from "../../../../../../utils/api";

interface ILaunchForm {
  tokenName: string;
  tokenLogo: string;
  totalWinners: number;
  dueDate: string;
  maxDeposit: number;
  tokenAddress: string;
  frequency: number;
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
  const [{ launchPad }, setGlobalState] = useReduxState(
    (state) => state.globalData
  );
  const FindLaunch = launchPad.launchPad.find((t: ILaunch) => t.id === id);
  console.log(FindLaunch);

  const [data] = useState<ILaunch | undefined>(FindLaunch);

  const [addLaunchPadLottery] = useMutation(ADD_LAUNCHPAD, {
    onCompleted: async (e) => {
      setGlobalState({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            ...launchPad,
            launchPad: [...launchPad.launchPad, e.AddLaunchPad],
          },
        },
      });

      closeModal();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [updateLaunch] = useMutation(EDIT_LAUNCH, {
    onCompleted: async (e) => {
      const launches = [...launchPad.launchPad];
      const index = launches.findIndex((launch) => launch.id == id);
      if (index !== -1) {
        launches[index] = e.EditLaunchPad;
      }
      setGlobalState({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            ...launchPad,
            launchPad: [...launches],
          },
        },
      });
      closeModal();
    },
    onError: (e) => {
      console.log(e.stack);
    },
  });

  const initialState: ILaunchForm = {
    tokenName: data !== undefined && edit ? data.tokenName : "",
    tokenLogo: data !== undefined && edit ? data.tokenLogo : "",
    dueDate:
      data !== undefined && edit
        ? data.dueDate
        : new Date(Date.now()).toDateString(),
    maxDeposit: data !== undefined && edit ? data.maxDeposit : 0,
    totalWinners: data !== undefined && edit ? data.totalWinners : 0,
    frequency: data !== undefined && edit ? data.frequency : 1,
    tokenAddress: data !== undefined && edit ? data.tokenAddress : "",
  };
  const [raffleForm, setRaffleForm] = useState<ILaunchForm>(initialState);
  const [poolImageFile, settokenLogoFile] = useState<File | null>(null);

  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const {
    tokenName,
    tokenLogo,
    dueDate,
    maxDeposit,
    totalWinners,
    frequency,
    tokenAddress,
  } = raffleForm;

  const validateFields = (): boolean => {
    if (
      (tokenName === "" ||
        tokenLogo === "" ||
        dueDate === "" ||
        totalWinners === 0 ||
        frequency === 0 ||
        tokenAddress === "" ||
        maxDeposit === 0) &&
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
          const launchValues = { ...raffleForm };
          if (poolImageFile) {
            const poolImageUploaded = await uploadToS3(
              poolImageFile,
              "launchImages"
            );
            if (poolImageUploaded.key) {
              launchValues.tokenLogo = poolImageUploaded.key;
            }
          }
          if (edit && data) {
            console.log(
              JSON.stringify({
                Id: data.id,
                ...launchValues,
              })
            );
            updateLaunch({
              variables: {
                Id: data.id,
                ...launchValues,
              },
            });
          } else {
            addLaunchPadLottery({ variables: launchValues });
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
    <>
      <form className="r-form">
        <AdminInput
          value={tokenName}
          onChange={(e) => handleFormChange({ tokenName: e })}
          error={error && tokenName === ""}
          label="Pool Name"
          inputStyle={{ width: "400px" }}
        />

        <AdminDropZone
          onDrop={(img) => {
            handleFormChange({ tokenLogo: img.path });
            settokenLogoFile(img.image);
          }}
          initialImage={tokenLogo}
          error={error && tokenLogo == ""}
        />
        <AdminInput
          label="Token Address"
          value={tokenAddress}
          onChange={(e) => handleFormChange({ tokenAddress: e })}
          inputStyle={{ width: "400px" }}
          error={error && tokenAddress === ""}
        />
        <AdminDatePicker
          value={dueDate}
          onChange={(e) => handleFormChange({ dueDate: e })}
          style={{ width: "400px" }}
          error={error && dueDate === new Date(Date.now()).toDateString()}
        />
        <AdminInputNumber
          value={totalWinners}
          onChange={(e: number) => handleFormChange({ totalWinners: e })}
          label="Total Winners"
          inputStyle={{ width: "400px" }}
          error={error && totalWinners === 0}
        />

        <AdminInputNumber
          value={maxDeposit}
          onChange={(e: number) => handleFormChange({ maxDeposit: e })}
          label="Max Deposit"
          inputStyle={{ width: "400px" }}
          error={error && maxDeposit === 0}
        />

        <AdminInputNumber
          label="Pick frequency (in Days)"
          inputStyle={{ width: "400px" }}
          value={frequency}
          onChange={(e) => handleFormChange({ frequency: e })}
          error={error && frequency === 0}
        />
      </form>
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
    </>
  );
}
