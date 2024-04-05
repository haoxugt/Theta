import './FAQPage.css'

function FAQPage() {
    return (
        <div className="FAQPage-container">
            <div className="FAQ-wrapper">
                <h1>FAQ</h1>
                <ol>
                    <div className='FAQ-issue'>
                        <li>How to invest as a new user?</li>
                        <p>A default investing account is created when a new user is signed up. To start to invest, user needs to go to <a href='/transfer' target='_blank'>transfer</a> page to add funds. </p>

                    </div>

                    <div className='FAQ-issue'>
                        <li>How to purchase stocks?</li>
                        <p>As a new user, since the search for stock is not implemented yet (till 04/05/2024), you can go to <a href='/stocks' target='_blank'>stocks</a> page, and click the stock item in the list to navigate to the specific stock page.</p>

                        <p>For example, on <a href='/stockinfo/mcd' target="_blank">McDonald&apos;s stock</a>&apos;s page, you can submit your order </p>

                    </div>

                    <div className='FAQ-issue'>
                        <li>How to create a portfolio?</li>
                        <p>Now user can only create another retirement plan account. By going to <a href='/retirement' target="_blank">retirement</a> account page to click the <em>get started</em> button.</p>

                    </div>

                    <div className='FAQ-issue'>
                        <li>How to close portfolio account?</li>
                        <p>Now, only the retirement invest account can be close.</p>

                        <p>Before close your retirement invest account, please make sure your total assets is 0. Otherwise, you must cash out all your assets first, like sell your stocks, and transfer out your money, then go to  <a href='/portfolios/current'  target="_blank">portfolio</a> page to closet it.</p>

                    </div>




                </ol>
            </div>
        </div>
    )
}

export default FAQPage;
