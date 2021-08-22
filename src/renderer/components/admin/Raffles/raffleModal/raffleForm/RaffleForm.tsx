import "./index.scss";
import { useMutation } from "@apollo//react-hooks";

import { ADD_RAFFLE, EDIT_RAFFLE } from "../../../../../../graphql/mutations";
import {
  AdminButton,
  AdminButtonArea,
  AdminDropZone,
  AdminRadioButton,
  AdminInput,
  AdminSelect,
} from "../../../forms/AdminFormCore";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import useDidUpdateEffect from "../../../../../hooks/useDidUpdateEffect";
import useReduxState from "../../../../../hooks/useReduxState";
import { IRaffle } from "../../../../../api/types/globalData";


interface IRaffleForm {
  raffleName: string;
  urlSlug: string;
  raffleImage: string;
  sollotoBranding: boolean;
  testingWA: string;
  liveWA: string;
  operatorWa: string;
  vanityUrl: string;
  raffleStatus: string;
}

export default function RaffleForm({
  closeModal,
  edit,
  id,
}: {
  closeModal: () => void;
  edit?: boolean;
  id: string;
}): JSX.Element {
  const [globalData] = useReduxState(
    (state) => state.globalData
  );
  let editInitialState: IRaffleForm = {
    raffleName: "",
    urlSlug: "",
    raffleImage: "",
    sollotoBranding: true,
    testingWA: "",
    liveWA: "",
    operatorWa: "",
    vanityUrl: "",
    raffleStatus: "",
  };
 

  const initialState: IRaffleForm = {
    raffleName: "",
    urlSlug: "",
    raffleImage: "",
    sollotoBranding: true,
    testingWA: "",
    liveWA: "",
    operatorWa: "",
    vanityUrl: "",
    raffleStatus: "",
  };

  const [raffleForm, setRaffleForm] = useState<IRaffleForm>(initialState);
  useEffect(() => {
    if (edit) {
      const FindRaffle = globalData.raffles.raffles.find(
        (t: IRaffle) => t.id === id
      );
      editInitialState = {
        raffleName: FindRaffle.raffleName,
        urlSlug: FindRaffle.urlSlug,
        raffleImage: FindRaffle.raffleImage,
        sollotoBranding: FindRaffle.sollotoBranding,
        testingWA: FindRaffle.testingWA,
        liveWA: FindRaffle.liveWA,
        operatorWa: FindRaffle.operatorWa,
        vanityUrl: FindRaffle.vanityUrl,
        raffleStatus: FindRaffle.raffleStatus,
      };
    }
  }, [])
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const {
    raffleName,
    urlSlug,
    sollotoBranding,
    testingWA,
    liveWA,
    operatorWa,
    raffleStatus,
    vanityUrl,
    raffleImage,
  } = raffleForm;

  const [addRaffle /* { data: addRes, loading: addloading } */] = useMutation(
    ADD_RAFFLE,
    {
      onCompleted: () => {
      
        closeModal();
      },
    }
  );
  const [editRaffle /* { data: editRes, loading: editloading } */] =
    useMutation(EDIT_RAFFLE, {
      onCompleted: () => {
      
        closeModal();
      },
    });

  const validateFields = (): boolean => {
    if (
      (raffleName === "" ||
        urlSlug === "" ||
        testingWA === "" ||
        liveWA === "" ||
        operatorWa === "" ||
        raffleStatus === "" ||
        vanityUrl === "") &&
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
            console.log(id, raffleForm);
            await editRaffle({
              variables: {
                raffleId: id,
                raffleName: raffleForm.raffleName,
                urlSlug: raffleForm.urlSlug,
                raffleImage: raffleForm.raffleImage,
                sollotoBranding: raffleForm.sollotoBranding,
                testingWA: raffleForm.testingWA,
                liveWA: raffleForm.liveWA,
                operatorWa: raffleForm.operatorWa,
                vanityUrl: raffleForm.vanityUrl,
                raffleStatus: raffleForm.raffleStatus,
              },
            });
          } else {
            await addRaffle({ variables: raffleForm });
          }
        })();
      }
      setSubmiting(false);
    }
  }, [submiting]);

  useDidUpdateEffect(() => validateFields(), [raffleForm]);
  const handleFormChange = useCallback(
    (item: Partial<IRaffleForm>) => {
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
        value={edit ? editInitialState.raffleName : raffleName}
        onChange={(e) => handleFormChange({ raffleName: e })}
        error={error && raffleName === ""}
        label="Raffle Name"
        inputStyle={{ width: "400px" }}
      />
      <AdminInput
        value={edit ? editInitialState.urlSlug : initialState.urlSlug}
        onChange={(e) => handleFormChange({ urlSlug: e })}
        error={error && urlSlug === ""}
        label="URL slug"
        inputStyle={{ width: "400px" }}
      />

      <AdminDropZone
        endpoint="uploadRaffle"
        onDrop={(img) => handleFormChange({ raffleImage: img })}
        dirName="raffleImages"
        error={error && raffleImage == ""}
      />
      <AdminInput
        label="Verification Vanity URL"
        value={edit ? editInitialState.vanityUrl : vanityUrl}
        onChange={(e) => handleFormChange({ vanityUrl: e })}
        error={error && vanityUrl === ""}
        inputStyle={{ width: "400px" }}
      />

      <AdminRadioButton
        label="Include Solloto Branding"
        checked={sollotoBranding}
        onChange={() => handleFormChange({ sollotoBranding: !sollotoBranding })}
      />
      <AdminInput
        value={edit ? editInitialState.testingWA : testingWA}
        onChange={(e) => handleFormChange({ testingWA: e })}
        error={error && testingWA === ""}
        label="Testing Wallet Address"
        inputStyle={{ width: "400px" }}
      />
      <AdminInput
        value={edit ? editInitialState.liveWA : liveWA}
        onChange={(e) => handleFormChange({ liveWA: e })}
        error={error && liveWA === ""}
        label="Live Raffle Wallet Address"
        inputStyle={{ width: "400px" }}
      />
      {/* <AdminInput
        value={raffleStatus}
        onChange={(e) => handleFormChange({ raffleStatus: e })}
        error={error && raffleStatus === ""}
        label="Raffle Status"
        inputStyle={{ width: "400px" }}
      /> */}
      <AdminSelect
        value={edit ? editInitialState.raffleStatus : raffleStatus}
        onChange={(e) => handleFormChange({ raffleStatus: e as string })}
        itemList={[
          {
            name: "Testing",
            value: "Testing",
          },
          {
            name: "Live",
            value: "Live",
          },
          {
            name: "Completed",
            value: "Completed",
          },
        ]}
        placeholder="Select Raffle Status"
        label="Raffle Status"
        error={error && raffleStatus === ""}
      />
      <AdminInput
        value={edit ? editInitialState.operatorWa : operatorWa}
        onChange={(e) => handleFormChange({ operatorWa: e })}
        error={error && operatorWa === ""}
        label="Operator Wallet Addresses"
        inputStyle={{ width: "400px" }}
      />
      <AdminButtonArea className="btn-area">
        <AdminButton
          disable={submiting}
          type="submit"
          onClick={() => setSubmiting(true)}
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
