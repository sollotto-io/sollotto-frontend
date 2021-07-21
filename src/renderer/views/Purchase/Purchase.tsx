import TicketPrice from "../../components/purchase/ticketPrice/TicketPrice";
import PurchaseCard from "../../components/purchase";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import HeaderInfo from "../../components/purchase/headerInfo/HeadeInfo";
function Purchase(): JSX.Element {
  return (
    <div className="pageWrapper">
      <div id="purchaseSection">
        <div className="pageHeader">
          <PageTitle title="Purchase" />
          <TicketPrice />
          <HeaderInfo />
        </div>
        <PurchaseCard />
      </div>
    </div>
  );
}

export default Purchase;
