import { IoEllipsisHorizontal } from "react-icons/io5";
import StockHoldItem from "../../Items/StockHoldItem/StockHoldItem";

import './StockHoldList.css'

function StockHoldList({stockholdlist}) {

  return (
    <div className="stockhold-container">
    <div className="stockhold-header">
    Stocks <IoEllipsisHorizontal />
    </div>
    {stockholdlist?.map(el => {
        return (
            <StockHoldItem key={el.stock_info_code} stock={el} />
        )
    })}
</div>
  )
}

export default StockHoldList;
