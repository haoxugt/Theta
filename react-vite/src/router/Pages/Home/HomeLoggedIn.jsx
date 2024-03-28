import Chart from "../../../components/Chart/Chart";

function HomeLoggedIn() {
  let amount = 123456.78;
  const open_amount = 123000;
  let change = amount - open_amount;
  change = change.toFixed(2);
  let change2 = -change;

  const positiveOrNegativeClassName = (num) => {
    if (num >= 0) return " positive-num";
    else return " negative-num"
  }
  return (
    <div className="homepage-container">
      <div className="homepage-left-col">
        <div className="portfolio-info-container">
          <h1>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}
          </h1>

          <p className={positiveOrNegativeClassName(change)}>
            {change >= 0 ? (<>+{change}</>) : (<>{change}</>)}

            ({(change / amount * 100).toFixed(2) + "%"})
          </p>

          <p className={positiveOrNegativeClassName(change2)}>
            {change2 >= 0 ? (<>+{change2}</>) : (<>{change2}</>)}

            ({(change2 / amount * 100).toFixed(2) + "%"})
          </p>
        </div>
        <div className="portfolio-chart-container">
          <Chart />

        </div>

      </div>
      <div className="homepage-right-col"></div>
    </div>
  )
}

export default HomeLoggedIn;
