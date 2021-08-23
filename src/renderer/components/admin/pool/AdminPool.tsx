import "./index.scss";

import AdminPoolTable from "./adminPoolTable/AdminPoolTable";
import { IPool } from "../../../api/types/globalData";

export default function AdminPool({ data }: { data: IPool[] }): JSX.Element {
  return (
    <>
      <AdminPoolTable data={data} />
    </>
  );
}
