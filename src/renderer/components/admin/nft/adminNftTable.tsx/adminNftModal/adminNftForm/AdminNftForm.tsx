import "./index.scss";
import {
  INftPrize,
  TNftStatus,
  INftForm,
  INftFormAdd,
} from "../../../../../../api/types/globalData";
import useDidUpdateEffect from "../../../../../../hooks/useDidUpdateEffect";
import { useState, useCallback, useEffect } from "react";
import useReduxState from "../../../../../../hooks/useTypedReduxState";
import {
  AdminDropZone,
  AdminInput,
  AdminInputNumber,
  AdminDatePicker,
  AdminSelect,
  AdminButtonArea,
  AdminButton,
} from "../../../../forms/AdminFormCore";
import { uploadToS3 } from "../../../../../../../utils/api";
import {
  ADD_NFT_LOTTERY,
  UPDATE_NFT_LOTTERRY,
} from "../../../../../../../graphql/mutations";
import { useMutation } from "@apollo//react-hooks";

interface IAdminNftForm {
  firstPrize: INftPrize;
  secondPrize: INftPrize;
  thirdPrize: INftPrize;
  endDate: string;
  ticketPrice: number;
  status: TNftStatus;
}

export default function AdminNftForm({
  closeModal,
  edit,
  data,
  index,
}: {
  closeModal: () => void;
  edit?: boolean;
  data?: INftForm;
  index?: number;
}): JSX.Element {
  const initialState: IAdminNftForm = {
    firstPrize: data?.prizes[0] ?? {
      image: "",
      address: "",
      collectionName: "",
      name: "",
    },
    secondPrize: data?.prizes[1] ?? {
      image: "",
      address: "",
      collectionName: "",
      name: "",
    },
    thirdPrize: data?.prizes[2] ?? {
      image: "",
      address: "",
      collectionName: "",
      name: "",
    },
    endDate: data?.endDate ?? new Date(Date.now()).toString(),
    ticketPrice: data?.ticketPrice ?? 1,
    status: data?.status ?? "draft",
  };

  console.log(edit);
  const [nftForm, setNftForm] = useState<IAdminNftForm>(initialState);

  const [prizeImages, setPrizeImages] = useState<
    {
      file: File;
      order: number;
    }[]
  >([]);

  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const [{ nfts }, setGlobalState] = useReduxState((state) => state.globalData);

  const { endDate, thirdPrize, ticketPrice, secondPrize, status, firstPrize } =
    nftForm;

  const [addNftLottery] = useMutation(ADD_NFT_LOTTERY, {
    onCompleted: (e) => {
      setGlobalState({
        type: "SET_GLOBAL_DATA",
        arg: {
          nfts: {
            ...nfts,
            nfts: [...nfts.nfts, e.addNFT],
          },
        },
      });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [updatNftLottery] = useMutation(UPDATE_NFT_LOTTERRY, {
    onCompleted: (e) => {
      const newNfts = [...nfts.nfts];
      if (index) {
        newNfts[index] = e.updateNFt;
        setGlobalState({
          type: "SET_GLOBAL_DATA",
          arg: {
            nfts: {
              ...nfts,
              nfts: newNfts,
            },
          },
        });
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const verifyData = () => {
    if (
      ticketPrice <= 0 ||
      endDate <= new Date(Date.now()).toDateString() ||
      firstPrize.address === "" ||
      firstPrize.collectionName === "" ||
      firstPrize.image === "" ||
      firstPrize.name === "" ||
      secondPrize.address === "" ||
      secondPrize.collectionName === "" ||
      secondPrize.image === "" ||
      secondPrize.name === "" ||
      thirdPrize.address === "" ||
      thirdPrize.collectionName === "" ||
      thirdPrize.image === "" ||
      thirdPrize.name === ""
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  useDidUpdateEffect(verifyData, [nftForm]);

  useEffect(() => {
    if (submiting) {
      (async () => {
        const formValues = { ...nftForm };
        if (prizeImages.length > 0) {
          if (!edit) {
            const image1 = await uploadToS3(prizeImages[0].file, "nftImages");
            const image2 = await uploadToS3(prizeImages[1].file, "nftImages");
            const image3 = await uploadToS3(prizeImages[2].file, "nftImages");

            if (image1.key && image2.key && image3.key) {
              formValues.firstPrize.image = image1.key;
              formValues.secondPrize.image = image2.key;
              formValues.thirdPrize.image = image3.key;
            }
          } else {
            if (nftForm.firstPrize.image !== initialState.firstPrize.image) {
              const image = prizeImages.filter((pi) => pi.order === 0)[0];
              const uploaded = await uploadToS3(image.file, "nftImages");
              if (uploaded.key) formValues.firstPrize.image = uploaded.key;
            }
            if (nftForm.secondPrize.image !== initialState.secondPrize.image) {
              const image = prizeImages.filter((pi) => pi.order === 1)[0];
              const uploaded = await uploadToS3(image.file, "nftImages");
              if (uploaded.key) formValues.secondPrize.image = uploaded.key;
            }
            if (nftForm.thirdPrize.image !== initialState.thirdPrize.image) {
              const image = prizeImages.filter((pi) => pi.order === 2)[0];
              const uploaded = await uploadToS3(image.file, "nftImages");
              if (uploaded.key) formValues.thirdPrize.image = uploaded.key;
            }
          }
        }
        const convertedFormValues: INftFormAdd = {
          prizes: [
            {
              image: firstPrize.image,
              collectionName: firstPrize.address,
              name: firstPrize.name,
              address: firstPrize.address,
            },
            {
              image: secondPrize.image,
              collectionName: secondPrize.address,
              name: secondPrize.name,
              address: secondPrize.address,
            },
            {
              image: thirdPrize.image,
              collectionName: thirdPrize.address,
              name: thirdPrize.name,
              address: thirdPrize.address,
            },
          ],
          endDate: formValues.endDate,
          ticketPrice: formValues.ticketPrice,
          status: formValues.status,
        };
        if (!edit) {
          await addNftLottery({ variables: { ...convertedFormValues } });
        } else {
          console.log({
            id: data?.id,
            ...convertedFormValues,
          });
          console.log(
            JSON.stringify({
              id: data?.id,
              ...convertedFormValues,
            })
          );
          await updatNftLottery({
            variables: {
              id: data?.id,
              ...convertedFormValues,
            },
          });
        }
        setSubmiting(false);
        closeModal();
      })();
    }
  }, [submiting]);

  const handleFormChange = useCallback(
    (item: Partial<IAdminNftForm>) => {
      setNftForm({
        ...nftForm,
        ...item,
      });
    },
    [nftForm]
  );

  return (
    <form className="nft-form">
      <AdminInput
        label="First prize name"
        value={firstPrize.name}
        onChange={(e) =>
          handleFormChange({ firstPrize: { ...firstPrize, name: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && firstPrize.name === ""}
      />
      <AdminInput
        label="Second prize name"
        value={secondPrize.name}
        onChange={(e) =>
          handleFormChange({ secondPrize: { ...secondPrize, name: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && secondPrize.name === ""}
      />
      <AdminInput
        label="Third prize name"
        value={thirdPrize.name}
        onChange={(e) =>
          handleFormChange({ thirdPrize: { ...thirdPrize, name: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && thirdPrize.name === ""}
      />
      <AdminInput
        label="First prize address"
        value={firstPrize.address}
        onChange={(e) =>
          handleFormChange({ firstPrize: { ...firstPrize, address: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && firstPrize.address === ""}
      />
      <AdminInput
        label="Second prize address"
        value={secondPrize.address}
        onChange={(e) =>
          handleFormChange({ secondPrize: { ...secondPrize, address: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && secondPrize.address === ""}
      />
      <AdminInput
        label="Third prize address"
        value={thirdPrize.address}
        onChange={(e) =>
          handleFormChange({ thirdPrize: { ...thirdPrize, address: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && thirdPrize.address === ""}
      />
      <AdminInput
        label="First prize collection Name"
        value={firstPrize.collectionName}
        onChange={(e) =>
          handleFormChange({ firstPrize: { ...firstPrize, collectionName: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && firstPrize.collectionName === ""}
      />
      <AdminInput
        label="Second prize collection Name"
        value={secondPrize.collectionName}
        onChange={(e) =>
          handleFormChange({
            secondPrize: { ...secondPrize, collectionName: e },
          })
        }
        inputStyle={{ width: "100%" }}
        error={error && secondPrize.collectionName === ""}
      />
      <AdminInput
        label="Third prize collection Name"
        value={thirdPrize.collectionName}
        onChange={(e) =>
          handleFormChange({ thirdPrize: { ...thirdPrize, collectionName: e } })
        }
        inputStyle={{ width: "100%" }}
        error={error && thirdPrize.collectionName === ""}
      />

      <AdminDropZone
        onDrop={(e) => {
          const images = [...prizeImages];
          if (e.image) {
            images[0] = { file: e.image, order: 0 };
            setPrizeImages(images);
          }
          handleFormChange({ firstPrize: { ...firstPrize, image: e.path } });
        }}
        style={{ margin: 0 }}
        initialImage={firstPrize.image}
        error={error && firstPrize.image === ""}
      />
      <AdminDropZone
        onDrop={(e) => {
          const images = [...prizeImages];
          if (e.image) {
            images[1] = { file: e.image, order: 1 };
            setPrizeImages(images);
          }
          handleFormChange({ secondPrize: { ...secondPrize, image: e.path } });
        }}
        style={{ margin: 0 }}
        initialImage={secondPrize.image}
        error={error && secondPrize.image === ""}
      />
      <AdminDropZone
        onDrop={(e) => {
          const images = [...prizeImages];
          if (e.image) {
            images[2] = { file: e.image, order: 2 };
            setPrizeImages(images);
          }
          handleFormChange({ thirdPrize: { ...thirdPrize, image: e.path } });
        }}
        style={{ margin: 0 }}
        initialImage={thirdPrize.image}
        error={error && thirdPrize.image === ""}
      />

      <AdminInputNumber
        label="Ticket Price"
        inputStyle={{ width: "100%" }}
        value={ticketPrice}
        onChange={(e) => handleFormChange({ ticketPrice: e })}
      />
      <AdminDatePicker
        value={endDate}
        onChange={(e) => handleFormChange({ endDate: e })}
        style={{ width: "100%" }}
        error={error && endDate <= new Date(Date.now()).toDateString()}
      />

      <AdminSelect
        value={status}
        onChange={(e) => handleFormChange({ status: e as TNftStatus })}
        itemList={
          nfts.nfts.filter((n) => n.status === "live").length > 0
            ? [
                {
                  name: "Draft",
                  value: "draft",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
              ]
            : [
                {
                  name: "Draft",
                  value: "draft",
                },
                {
                  name: "Live",
                  value: "live",
                },
                {
                  name: "Completed",
                  value: "completed",
                },
              ]
        }
        placeholder="Select Nft Status"
        label="Nft Status"
        error={error}
      />

      <div></div>
      <AdminButtonArea className="btn-area">
        <AdminButton
          disable={submiting || error || nftForm === initialState}
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
