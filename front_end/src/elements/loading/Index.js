import "./loading.css"

function sdfsdfsdfsdf() {
    return (
        <>
            <div className="box-freind main-box d-flex">
                <div className="img-box-freind po-rel">
                    <div className="square circle w80p h80"></div>
                </div>
                <div className="box">
                    <div className="line w25"></div>
                    <span className="line w50"></span>
                </div>
                <div className="follow-box-freind d-flex gap-10px">
                    <div className="first-follow bor-dash bo-rad flex-center">
                        <span className="line h10 w50"></span>
                        <span className="line h8 w50"></span>
                    </div>
                    <div className="first-follow bor-dash bo-rad flex-center">
                        <span className="line h10 w50"></span>
                        <span className="line h8 w50"></span>
                    </div>
                </div>
                <div className="button-box-freind flex-between w-full">
                    <div className="line h25 w50"></div>
                    <div className="line h25 w50"></div>
                </div>
            </div>
        </>
    )
}
export function CollectionItemLoading() {
    return (
        <section className="line collection-item">
            <div>
                <p className="line w100p h35 collection-link">
                </p>
            </div>
        </section>
    )
}

export function BookItemDetailsHeaderLoading() {
    return (
        <>
            <div className="product-container" id="product-container">

                <div className="product-image">
                    <section className="main-img-container">

                        <p id="main-img" className="line main-img" ></p>

                    </section>
                    <section className="sub-images-container">
                        <p className="sub-image-item line w80 h80" ></p>
                        <p className="sub-image-item line w80 h80" ></p>
                        <p className="sub-image-item line w80 h80" ></p>
                        <p className="sub-image-item line w80 h80" ></p>
                    </section>
                </div>
                <div className="product-info">

                    <h1 className="product-title line h25 w100" id="product-title"></h1>
                    <h1 className="product-title line h25 w90" id="product-title"></h1>
                    <div className="product-price-container">



                        <span className="old-price mb20" id="old-price">
                            <span className="line w80p h30" ></span>
                        </span>

                        <span className="old-price" id="old-price">
                            <span className="line w80p h30" ></span>
                        </span>

                    </div>
                    <section className="product-description" id="product-description">
                        <p className="sub-image-item line w90 h15 mt15" ></p>
                        <p className="sub-image-item line w80 h15 mt15" ></p>
                        <p className="sub-image-item line w50 h15 mt15" ></p>
                        <p className="sub-image-item line w100 h15 mt15" ></p>
                        <p className="sub-image-item line w80 h15 mt15" ></p>
                        <p className="sub-image-item line w100p h15 mt15" ></p>
                    </section>
                    <section className="product-quantity">
                        <p></p>
                        <div className='quantity-container'>
                            <span className="icon line w50p h30"></span>
                            <p className="quantity">
                                <span className="line w50p h30"></span>
                            </p>
                            <span className="icon line w50p h30"></span>
                        </div>
                    </section>
                    <p className="line h60"></p>
                    <p className="line h60 mt15"></p>
                </div>
            </div>
        </>
    )
}