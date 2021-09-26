import "./index.scss";

import { useState, useCallback, useEffect } from "react";
import {
  AdminInput,
  AdminDropZone,
  AdminDatePicker,
  AdminButtonArea,
  AdminButton,
  AdminInputNumber,
} from "../../../../forms/AdminFormCore";

import useDidUpdateEffect from "../../../../../../hooks/useDidUpdateEffect";
import useReduxState from "../../../../../../hooks/useReduxState";

import { useMutation } from "@apollo//react-hooks";

import { ADD_POOL, UPDATE_POOL } from "../../../../../../../graphql/mutations";
import { IPoolForm as IPool } from "../../../../../../api/types/globalData";
import { uploadToS3 } from "../../../../../../../utils/api";

interface IPoolForm {
  tokenName: string;
  tokenLogo: string;
  dueDate: string;
  tokenAddress: string;
  frequency: number;
}

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
export default function PoolForm({
  closeModal,
  edit,
  data,
  index,
}: {
  closeModal: () => void;
  edit?: boolean;
  data?: IPool;
  index?: number;
}): JSX.Element {
  const initialState: IPoolForm = {
    tokenName: data?.tokenName ?? "",
    tokenLogo: data?.tokenLogo ?? "",
    tokenAddress: data?.tokenAddress ?? "",
    dueDate: data?.dueDate
      ? new Date(data.dueDate).toDateString()
      : new Date(Date.now()).toDateString(),
    frequency: data?.frequency ?? 1,
  };
  const [poolForm, setPoolForm] = useState<IPoolForm>(initialState);

  const [tokenLogoFile, setTokenLogoFile] = useState<File | null>(null);

  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [{ pools }, setGlobalState] = useReduxState(
    (state) => state.globalData
  );

  const [addPool] = useMutation(ADD_POOL);

  const [updatePool] = useMutation(UPDATE_POOL);

  const { tokenName, tokenLogo, tokenAddress, dueDate, frequency } = poolForm;

  const verifyData = () => {
    if (
      tokenName === "" ||
      tokenLogo === "" ||
      tokenAddress === "" ||
      dueDate === new Date(Date.now()).toDateString() ||
      frequency < 1
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const handleFormChange = useCallback(
    (item: Partial<IPoolForm>) => {
      setPoolForm({
        ...poolForm,
        ...item,
      });
    },
    [poolForm]
  );

  useDidUpdateEffect(() => verifyData(), [poolForm]);

  useEffect(() => {
    if (submiting) {
      (async () => {
        const formValues = { ...poolForm };
        if (tokenLogoFile) {
          const uploadedLogo = await uploadToS3(tokenLogoFile, "poolImages");
          if (uploadedLogo.key) {
            formValues.tokenLogo = uploadedLogo.key;
          }
        }

        if (!edit) {
          const newPool = await addPool({ variables: formValues });
          console.log(newPool);
          if (newPool && newPool.data && newPool.data.addPool) {
            setGlobalState({
              type: "SET_GLOBAL_DATA",
              arg: {
                pools: {
                  ...pools,
                  pools: [...pools.pools, newPool.data.addPool],
                },
              },
            });
          }
        } else {
          const updatedPool = await updatePool({
            variables: { id: data?.id, ...formValues },
          });
          if (updatedPool && updatedPool.data && updatedPool.data.updatePool) {
            const poolArr = [...pools.pools];
            poolArr[index!] = updatedPool.data.updatePool;
            setGlobalState({
              type: "SET_GLOBAL_DATA",
              arg: {
                pools: {
                  ...pools,
                  pools: [...poolArr],
                },
              },
            });
          }
        }
      })();
      closeModal();
      setSubmiting(false);
    }
  }, [submiting]);

  return (
    <form className="p-form">
      <AdminInput
        label="Token Name"
        value={tokenName}
        onChange={(e) => handleFormChange({ tokenName: e })}
        inputStyle={{ width: "100%" }}
        error={error && tokenName === ""}
      />
      <AdminDropZone
        onDrop={(e) => {
          setTokenLogoFile(e.image), handleFormChange({ tokenLogo: e.path });
        }}
        style={{ margin: 0 }}
        initialImage={tokenLogo}
        error={error && tokenLogo === ""}
      />
      <AdminInput
        label="Token Address"
        value={tokenAddress}
        onChange={(e) => handleFormChange({ tokenAddress: e })}
        inputStyle={{ width: "100%" }}
        error={error && tokenAddress === ""}
      />
      <AdminDatePicker
        value={dueDate}
        onChange={(e) => handleFormChange({ dueDate: e })}
        style={{ width: "100%" }}
        error={error && dueDate === new Date(Date.now()).toDateString()}
      />
      <AdminInputNumber
        label="Pick frequency (in Days)"
        inputStyle={{ width: "100%" }}
        value={frequency}
        onChange={(e) => handleFormChange({ frequency: e })}
      />
      <AdminButtonArea>
        <AdminButton
          disable={submiting || error || poolForm === initialState}
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
