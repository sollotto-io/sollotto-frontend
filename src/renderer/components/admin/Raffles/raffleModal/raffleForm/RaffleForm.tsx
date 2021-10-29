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
import { IRaffle } from "../../../../../api/types/globalData";
import useReduxState from "../../../../../hooks/useReduxState";
import { uploadToS3 } from "../../../../../../utils/api";

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
  id?: string;
}): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);
  const FinalRaffle = globalData.raffles.raffles.find(
    (t: IRaffle) => t.id === id
  );

  const [data] = useState<IRaffle>(FinalRaffle);

  const initialState: IRaffleForm = {
    raffleName: data !== undefined ? data.raffleName : "",
    urlSlug: data !== undefined ? data.urlSlug : "",
    raffleImage: data !== undefined ? data.raffleImage : "",
    sollotoBranding: data !== undefined ? data.sollotoBranding : true,
    testingWA: data !== undefined ? data.testingWA : "",
    liveWA: data !== undefined ? data.liveWA : "",
    operatorWa: data !== undefined ? data.operatorWa : "",
    vanityUrl: data !== undefined ? data.vanityUrl : "",
    raffleStatus: data !== undefined ? data.raffleStatus : "",
  };

  const [raffleForm, setRaffleForm] = useState<IRaffleForm>(initialState);
  const [raffleImageFile, setRaffleImageFile] = useState<File | null>(null);

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
      onCompleted: async () => {
        await globalData.raffles.refetch();
        closeModal();
      },
    }
  );
  const [editRaffle /* { data: editRes, loading: editloading } */] =
    useMutation(EDIT_RAFFLE, {
      onCompleted: async () => {
        await globalData.raffles.refetch();
        closeModal();
      },
    });

  const validateFields = (): boolean => {
    if (
      raffleName === "" ||
      urlSlug === "" ||
      testingWA === "" ||
      liveWA === "" ||
      operatorWa === "" ||
      raffleStatus === null ||
      raffleStatus === "" ||
      vanityUrl === "" ||
      raffleImage === ""
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
          const raffleValues = { ...raffleForm };
          if (raffleImageFile) {
            const uploadedImage = await uploadToS3(
              raffleImageFile,
              "raffleImages"
            );
            if (uploadedImage.key) {
              raffleValues.raffleImage = uploadedImage.key;
            }
          }
          if (edit) {
            await editRaffle({
              variables: { ...raffleValues, raffleId: data?.id },
            });
          } else {
            await addRaffle({
              variables: raffleValues,
            });
          }

          closeModal();
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
        onDrop={(img) => {
          handleFormChange({ raffleImage: img.path });
          setRaffleImageFile(img.image);
        }}
        error={error && raffleImage == ""}
        initialImage={data?.raffleImage ?? ""}
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
