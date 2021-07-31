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
import { useState } from "react";
import { useCallback } from "react";
import useDidUpdateEffect from "../../../../../hooks/useDidUpdateEffect";

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
}: {
  closeModal: () => void;
  edit?: boolean;
}): JSX.Element {
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

  const [addRaffle /* { data: addRes, loading: addloading } */] =
    useMutation(ADD_RAFFLE);
  const [editRaffle /* { data: editRes, loading: editloading } */] =
    useMutation(EDIT_RAFFLE);

  const validateFields = (): boolean => {
    if (
      raffleName === "" ||
      urlSlug === "" ||
      testingWA === "" ||
      liveWA === "" ||
      operatorWa === "" ||
      raffleStatus === "" ||
      vanityUrl === ""
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
        console.log(JSON.stringify(raffleForm));
        (async () => {
          if (edit) {
            await editRaffle({ variables: raffleForm });
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
        value={raffleName}
        onChange={(e) => handleFormChange({ raffleName: e })}
        error={error && raffleName === ""}
        label="Raffle Name"
        inputStyle={{ width: "400px" }}
      />
      <AdminInput
        value={urlSlug}
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
        value={vanityUrl}
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
        value={testingWA}
        onChange={(e) => handleFormChange({ testingWA: e })}
        error={error && testingWA === ""}
        label="Testing Wallet Address"
        inputStyle={{ width: "400px" }}
      />
      <AdminInput
        value={liveWA}
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
        value={raffleStatus}
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
        value={operatorWa}
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
